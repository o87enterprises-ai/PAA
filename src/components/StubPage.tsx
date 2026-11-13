import type { ReactNode } from 'react'
import type { LucideIcon } from '@/lib/icons'
import { SectionHeading } from '@/components/SectionHeading'
import { PageHeader } from '@/components/PageHeader'

interface Props {
  label: string
  title: string
  intro: string
  icon?: LucideIcon
  /** Inside the dashboard (no dark header band). */
  embedded?: boolean
  planned: { title: string; body: string }[]
  children?: ReactNode
  emptyTitle: string
  emptyBody: string
}

/** Designed-but-not-yet-wired feature page: real chrome, empty state, and a list of what it will do. */
export function StubPage({ label, title, intro, icon, embedded, planned, children, emptyTitle, emptyBody }: Props) {
  const body = (
    <>
      <section className="border border-gold/40 bg-paper-warm px-8 py-16 text-center" aria-label={emptyTitle}>
        {children ?? (
          <>
            <h3 className="text-2xl">{emptyTitle}</h3>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">{emptyBody}</p>
          </>
        )}
      </section>
      <section className="mt-16" aria-label="Planned capabilities">
        <p className="eyebrow mb-6 text-gold-deep">Planned capabilities</p>
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {planned.map((p) => (
            <li key={p.title} className="bg-paper p-6">
              <h3 className="text-xl">{p.title}</h3>
              <p className="mt-2 text-ink-soft">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )

  if (embedded)
    return (
      <div className="py-10">
        <SectionHeading badge={label} icon={icon} title={title} intro={intro} className="mb-10" />
        {body}
      </div>
    )

  return (
    <main>
      <PageHeader badge={label} icon={icon} title={title} intro={intro} />
      <div className="mx-auto max-w-4xl px-6 py-20">{body}</div>
    </main>
  )
}
