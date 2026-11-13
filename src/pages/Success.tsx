import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase, authHeaders } from '@/lib/supabase'
import { Button, buttonClass } from '@/components/ui/Button'

interface OrderRow {
  id: string
  status: string
  products: { name: string; product_type: string | null } | null
}

export function Success() {
  const [params] = useSearchParams()
  const sessionId = params.get('session_id')
  const [dlError, setDlError] = useState<string | null>(null)

  // Orders are written by the Stripe webhook, so poll briefly until it lands.
  const { data: order } = useQuery({
    queryKey: ['order', sessionId],
    enabled: !!sessionId,
    refetchInterval: (q) => (q.state.data ? false : 2000),
    queryFn: async (): Promise<OrderRow | null> => {
      const { data } = await supabase
        .from('orders')
        .select('id,status,products(name,product_type)')
        .eq('stripe_session_id', sessionId!)
        .maybeSingle()
      return (data as unknown as OrderRow | null) ?? null
    },
  })

  async function download(orderId: string) {
    setDlError(null)
    const res = await fetch('/api/download-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
      body: JSON.stringify({ orderId }),
    })
    const { url, error } = await res.json()
    if (!res.ok || !url) return setDlError(error ?? 'Download unavailable')
    window.location.href = url
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-32 text-center">
      <div className="mx-auto mb-6 h-px w-12 bg-gold" aria-hidden />
      <p className="eyebrow mb-4 text-gold-deep">Payment received</p>
      <h1 className="text-5xl">Thank you</h1>
      <p className="mt-6 text-ink-soft">It can take a few seconds for your account to update.</p>
      {order?.products?.product_type === 'digital' && order.status === 'paid' && (
        <Button onClick={() => download(order.id)} className="mt-10">
          Download {order.products.name}
        </Button>
      )}
      {dlError && (
        <p role="alert" className="mt-6 text-ink-soft">
          {dlError}
        </p>
      )}
      <div className="mt-12">
        <Link to="/app" className={buttonClass('gold')}>
          Go to dashboard
        </Link>
      </div>
    </main>
  )
}
