import { Link, useOutletContext } from 'react-router-dom'
import { CalendarDays, FileText, Target } from '@/lib/icons'
import { SectionHeading } from '@/components/SectionHeading'
import { IconTile } from '@/components/ui/IconTile'
import { SAMPLE } from '@/lib/sample'

export function Overview() {
  const { signedIn } = useOutletContext<{ signedIn: boolean }>()
  // Real records arrive with the backend; until then everyone sees the sample preview.
  const d = SAMPLE
  return (
    <div className="py-10">
      <SectionHeading badge="Client Portal" title={signedIn ? 'Welcome back' : <>Welcome, <span className="text-gold-deep">{d.family}</span></>} intro="Everything for your family’s advocacy, in one private place." />

      <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
        {d.stats.map((s) => (
          <div key={s.label} className="bg-paper p-6">
            <dd className="font-serif text-4xl text-forest">{s.value}</dd>
            <dt className="eyebrow mt-2 text-ink-soft">{s.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="border border-line bg-paper p-6">
          <div className="mb-5 flex items-center gap-3">
            <IconTile icon={CalendarDays} tone="gold" />
            <h2 className="text-2xl">Upcoming meetings</h2>
          </div>
          <ul className="divide-y divide-line">
            {d.meetings.map((m) => (
              <li key={m.title} className="py-4">
                <p className="font-serif text-lg">{m.title}</p>
                <p className="caption text-ink-soft">{m.when} · {m.with}</p>
              </li>
            ))}
          </ul>
          <Link to="/app/schedule" className="eyebrow text-link mt-4 inline-block text-gold-deep">View schedule →</Link>
        </section>

        <section className="border border-line bg-paper p-6">
          <div className="mb-5 flex items-center gap-3">
            <IconTile icon={FileText} tone="sage" />
            <h2 className="text-2xl">Recent documents</h2>
          </div>
          <ul className="divide-y divide-line">
            {d.documents.map((x) => (
              <li key={x.name} className="flex items-center justify-between gap-4 py-4">
                <span>
                  <span className="block">{x.name}</span>
                  <span className="caption text-ink-soft">Added {x.added}</span>
                </span>
                <span className="eyebrow border border-gold/50 px-3 py-1 text-gold-deep">{x.tag}</span>
              </li>
            ))}
          </ul>
          <Link to="/app/documents" className="eyebrow text-link mt-4 inline-block text-gold-deep">All documents →</Link>
        </section>

        <section className="border border-line bg-paper p-6 lg:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <IconTile icon={Target} tone="forest" />
            <h2 className="text-2xl">Goal progress</h2>
          </div>
          <ul className="space-y-5">
            {d.goals.map((g) => (
              <li key={g.name}>
                <div className="flex justify-between"><span>{g.name}</span><span className="caption text-ink-soft">{g.pct}%</span></div>
                <div className="mt-2 h-2 bg-sage-soft" role="progressbar" aria-valuenow={g.pct} aria-valuemin={0} aria-valuemax={100} aria-label={g.name}>
                  <div className="h-full bg-gradient-to-r from-sage to-gold" style={{ width: `${g.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      {!signedIn && <p className="caption mt-6 text-ink-soft">All figures above are sample data for design review.</p>}
    </div>
  )
}
