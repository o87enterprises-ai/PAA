import { Link } from 'react-router-dom'
import { Briefcase } from '@/lib/icons'
import { PageHeader } from '@/components/PageHeader'
import { ServiceCard } from '@/components/ServiceCard'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { SERVICES } from '@/lib/content'
import { money } from '@/lib/plans'
import { buttonClass } from '@/components/ui/Button'

export function Services() {
  const compare = SERVICES.filter((s) => s.bestFor)
  return (
    <main>
      <PageHeader
        badge="Professional Services"
        icon={Briefcase}
        title={
          <>
            Choose Your <span className="text-gold">Advocacy Service</span>
          </>
        }
        intro="Select from our comprehensive range of special education advocacy services, each designed to empower your family with expert support."
      />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6" aria-labelledby="compare-title">
          <SectionHeading badge="Compare" title={<span id="compare-title">Not Sure Which Service?</span>} intro="Compare our most requested options at a glance." />
          <div className="mt-12 overflow-x-auto border border-gold/40">
            <table className="w-full min-w-[40rem] text-left">
              <thead className="bg-forest text-paper">
                <tr>
                  {['Service', 'Duration', 'Price', 'Best for', ''].map((h) => (
                    <th key={h} scope="col" className="eyebrow px-6 py-4 font-normal text-gold">
                      {h || <span className="sr-only">Book</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {compare.map((s) => (
                  <tr key={s.id} className="transition-colors hover:bg-sage-soft">
                    <th scope="row" className="px-6 py-5 font-serif text-lg font-normal">
                      {s.name}
                    </th>
                    <td className="px-6 py-5 text-ink-soft">{s.duration}</td>
                    <td className="px-6 py-5 font-serif text-xl">{money(s.price)}</td>
                    <td className="px-6 py-5 text-ink-soft">{s.bestFor}</td>
                    <td className="px-6 py-5 text-right">
                      <Link to={`/book?service=${s.id}`} className="eyebrow text-link text-gold-deep">
                        Book
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12 text-center">
            <Link to="/pricing" className={buttonClass('gold')}>
              Or explore monthly packages
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  )
}
