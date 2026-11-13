import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CalendarCheck } from '@/lib/icons'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/Button'
import { bookingSchema, submitBooking } from '@/lib/booking'
import { SERVICES } from '@/lib/content'
import { money } from '@/lib/plans'

type Errors = Partial<Record<'service' | 'name' | 'email' | 'notes' | 'consent', string>>

export function Book() {
  const [params] = useSearchParams()
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'unavailable'>('idle')
  const preselected = SERVICES.some((s) => s.id === params.get('service')) ? params.get('service')! : ''

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const parsed = bookingSchema.safeParse({
      service: f.get('service'),
      name: f.get('name'),
      email: f.get('email'),
      phone: (f.get('phone') as string) || undefined,
      date: (f.get('date') as string) || undefined,
      notes: (f.get('notes') as string) || undefined,
      consent: f.get('consent') === 'on',
    })
    if (!parsed.success) {
      const next: Errors = {}
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof Errors] ??= issue.message
      setErrors(next)
      return
    }
    setErrors({})
    setState('sending')
    const { ok } = await submitBooking(parsed.data)
    setState(ok ? 'sent' : 'unavailable')
  }

  const err = (k: keyof Errors) =>
    errors[k] && (
      <span role="alert" className="mt-1 block text-sm text-gold-deep">
        {errors[k]}
      </span>
    )

  return (
    <main>
      <PageHeader
        badge="Book a Service"
        icon={CalendarCheck}
        title={
          <>
            Reserve your <span className="text-gold">session</span>
          </>
        }
        intro="Tell us which service you need and when suits you. We will confirm a time personally."
      />
      <div className="mx-auto max-w-2xl px-6 py-20">
        {state === 'sent' ? (
          <p role="status" className="border-t border-line pt-8">
            Thank you. We have received your request.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-10">
            <label className="block">
              <span className="eyebrow text-ink-soft">Service</span>
              <select name="service" defaultValue={preselected} className="field mt-1">
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} · {money(s.price)}
                  </option>
                ))}
              </select>
              {err('service')}
            </label>
            <div className="grid gap-10 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow text-ink-soft">Your name</span>
                <input name="name" autoComplete="name" className="field mt-1" />
                {err('name')}
              </label>
              <label className="block">
                <span className="eyebrow text-ink-soft">Email</span>
                <input name="email" type="email" autoComplete="email" className="field mt-1" />
                {err('email')}
              </label>
              <label className="block">
                <span className="eyebrow text-ink-soft">Phone (optional)</span>
                <input name="phone" type="tel" autoComplete="tel" className="field mt-1" />
              </label>
              <label className="block">
                <span className="eyebrow text-ink-soft">Preferred date (optional)</span>
                <input name="date" type="date" className="field mt-1" />
              </label>
            </div>
            <label className="block">
              <span className="eyebrow text-ink-soft">Anything you would like us to know (optional)</span>
              <textarea name="notes" rows={4} className="field mt-1 resize-y" />
              {err('notes')}
            </label>
            <label className="flex items-start gap-4">
              <input name="consent" type="checkbox" className="mt-2 size-4 accent-[var(--color-forest)]" />
              <span className="text-base text-ink-soft">I am happy for Parent Advocacy Alliance to contact me about this request.</span>
            </label>
            {err('consent')}

            {state === 'unavailable' && (
              <p role="status" className="border-t border-line pt-6 text-ink-soft">
                Online booking is not open yet, so nothing was sent. Please{' '}
                <Link to="/contact" className="text-link text-ink">
                  contact us
                </Link>{' '}
                to reserve a time.
              </p>
            )}
            <Button type="submit" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Request booking'}
            </Button>
          </form>
        )}
      </div>
    </main>
  )
}
