import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'

export function Login() {
  const [params] = useSearchParams()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    // Only allow same-site relative redirects
    const next = params.get('next')
    const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : '/'
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}${safeNext}` },
    })
    if (error) {
      setStatus('error')
      setMessage(error.message)
    } else {
      setStatus('sent')
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-28">
      <div className="border border-gold/40 bg-paper-warm p-8 md:p-10">
      <div className="mb-6 h-px w-12 bg-gold" aria-hidden />
      <p className="eyebrow mb-4 text-gold-deep">Members</p>
      <h1 className="text-4xl">Sign in</h1>
      <p className="mt-4 text-ink-soft">We’ll email you a one-time link. No password needed.</p>
      {status === 'sent' ? (
        <p role="status" className="mt-12 border-t border-line pt-8">
          Please check your email for your sign-in link.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-12 space-y-8">
          <label className="block">
            <span className="eyebrow text-ink-soft">Email</span>
            <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field mt-1" />
          </label>
          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Email me a link'}
          </Button>
          {status === 'error' && (
            <p role="alert" className="text-ink-soft">
              {message}
            </p>
          )}
        </form>
      )}
      </div>
    </main>
  )
}
