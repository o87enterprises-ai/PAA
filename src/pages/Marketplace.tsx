import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase, authHeaders } from '@/lib/supabase'
import { useSubscription } from '@/hooks/useSubscription'
import { Store } from '@/lib/icons'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/lib/types'

export function Marketplace() {
  const { signedIn } = useSubscription()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const { data } = await supabase
        .from('products')
        .select('id,name,description,price_cents,product_type,image_url')
        .eq('is_active', true)
      return (data ?? []) as Product[]
    },
  })

  async function buy(productId: string) {
    setError(null)
    if (!signedIn) return navigate('/login?next=/marketplace')
    try {
      const res = await fetch('/api/create-product-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
        body: JSON.stringify({ productId }),
      })
      const { url, error } = await res.json()
      if (!res.ok || !url) throw new Error(error ?? 'Checkout failed')
      window.location.href = url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed')
    }
  }

  return (
    <main>
      <PageHeader
        badge="Marketplace"
        icon={Store}
        title={
          <>
            Guides, templates <span className="text-gold">and keepsakes</span>
          </>
        }
        intro="Considered tools to support your advocacy, available one at a time."
      />
      <div className="mx-auto max-w-6xl px-6 py-20">
      {error && (
        <p role="alert" className="mb-8 text-ink-soft">
          {error}
        </p>
      )}
      {products.length === 0 ? (
        <p className="border-t border-line pt-8 text-ink-soft">New products are coming soon.</p>
      ) : (
        <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article key={p.id} className="border border-gold/40 bg-paper-warm p-6">
              {p.image_url && <img src={p.image_url} alt={p.name} className="mb-6 aspect-[4/3] w-full object-cover" />}
              <h2 className="text-2xl">{p.name}</h2>
              <p className="mt-2 text-ink-soft">{p.description}</p>
              <p className="mt-4 font-serif text-2xl">${(p.price_cents / 100).toFixed(2)}</p>
              <Button onClick={() => buy(p.id)} className="mt-6">
                Purchase
              </Button>
            </article>
          ))}
        </div>
      )}
      </div>
    </main>
  )
}
