import { useState, type FormEvent } from 'react'
import { Brain } from '@/lib/icons'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/Button'
import { assessmentSchema, submitAssessment, CONCERNS } from '@/lib/assessment'

type Errors = Partial<Record<'name' | 'email' | 'concern' | 'details' | 'consent', string>>

export function Assessment() {
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'unavailable'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const parsed = assessmentSchema.safeParse({
      name: f.get('name'),
      email: f.get('email'),
      concern: f.get('concern'),
      details: (f.get('details') as string) || undefined,
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
    const { ok } = await submitAssessment(parsed.data)
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
        badge="Free Case Assessment"
        icon={Brain}
        title={
          <>
            Tell us where <span className="text-gold">to begin</span>
          </>
        }
        intro="Share only what you are comfortable with. A member of our team reads every request personally."
      />
      <div className="mx-auto max-w-2xl px-6 py-20">

      {state === 'sent' ? (
        <p role="status" className="border-t border-line pt-8">
          Thank you. We have received your request.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-10">
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
            <span className="eyebrow text-ink-soft">Area of concern</span>
            <select name="concern" defaultValue="" className="field mt-1">
              <option value="" disabled>
                Select one
              </option>
              {CONCERNS.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
            {err('concern')}
          </label>
          <label className="block">
            <span className="eyebrow text-ink-soft">Anything you would like us to know (optional)</span>
            <textarea name="details" rows={4} className="field mt-1 resize-y" />
            {err('details')}
          </label>
          <label className="flex items-start gap-4">
            <input name="consent" type="checkbox" className="mt-2 size-4 accent-[var(--color-forest)]" />
            <span className="text-base text-ink-soft">I am happy for Parent Advocacy Alliance to contact me about this request.</span>
          </label>
          {err('consent')}

          {state === 'unavailable' && (
            <p role="status" className="border-t border-line pt-6 text-ink-soft">
              Online assessments are not open yet, so nothing was sent. If you need help now, please call or text{' '}
              <a href="tel:988" className="text-link text-ink">
                988
              </a>{' '}
              or browse our{' '}
              <a href="/resources" className="text-link text-ink">
                resource directory
              </a>
              .
            </p>
          )}

          <Button type="submit" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending…' : 'Request assessment'}
          </Button>
        </form>
      )}
      </div>
    </main>
  )
}
