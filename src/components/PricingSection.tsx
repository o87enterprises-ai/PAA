import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check } from '@/lib/icons'
import { ANNUAL_DISCOUNT, PLANS, money } from '@/lib/plans'
import { SectionHeading } from '@/components/SectionHeading'
import { IconTile } from '@/components/ui/IconTile'
import { buttonClass } from '@/components/ui/Button'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/cn'

/** Dark pricing band: Monthly/Annual toggle, three plans, Professional raised and marked "Most Popular". */
export function PricingSection({ showHeading = true }: { showHeading?: boolean }) {
  const [annual, setAnnual] = useState(false)
  const discountPct = Math.round(ANNUAL_DISCOUNT * 100)

  return (
    <section className="relative bg-forest-deep py-28 text-paper" aria-labelledby={showHeading ? 'pricing-title' : undefined}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(193,159,115,0.14),transparent_70%)]" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        {showHeading && (
          <Reveal>
            <SectionHeading
              center
              onDark
              badge="Transparent Pricing"
              title={
                <span id="pricing-title">
                  Investment in Your <span className="text-gold">Child’s Success</span>
                </span>
              }
              intro="Choose the perfect package for your family’s unique advocacy needs. All plans include our advanced technology platform access."
            />
          </Reveal>
        )}

        {/* Monthly / Annual toggle */}
        <div className={cn('flex justify-center', showHeading ? 'mt-12' : 'mt-0')}>
          <div role="group" aria-label="Billing period" className="inline-flex border border-gold/40 p-1">
            {[
              { v: false, label: 'Monthly' },
              { v: true, label: 'Annual' },
            ].map((o) => (
              <button
                key={o.label}
                onClick={() => setAnnual(o.v)}
                aria-pressed={annual === o.v}
                className={cn(
                  'eyebrow relative px-7 py-3 transition-colors duration-300',
                  annual === o.v ? 'bg-gold text-forest-night' : 'text-paper hover:text-gold',
                )}
              >
                {o.label}
                {o.v && (
                  <span className="caption absolute -right-2 -top-3 bg-sage px-2 py-0.5 font-medium normal-case tracking-normal text-forest-night">
                    Save {discountPct}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-3 lg:gap-6">
          {PLANS.map((plan) => {
            const price = annual ? Math.round(plan.monthly * (1 - ANNUAL_DISCOUNT)) : plan.monthly
            return (
              <Reveal key={plan.id}>
                <article
                  className={cn(
                    'relative flex flex-col border bg-forest-night/60 p-8',
                    plan.featured
                      ? 'border-gold shadow-[0_0_60px_rgba(193,159,115,0.18)] lg:-my-6 lg:py-14'
                      : 'border-paper/15',
                  )}
                >
                  {plan.featured && (
                    <span className="eyebrow absolute -top-3 left-8 bg-gold px-4 py-1 text-forest-night">Most Popular</span>
                  )}
                  <IconTile icon={plan.icon} tone={plan.tone} />
                  <h3 className="mt-6 font-serif text-3xl text-paper">{plan.name}</h3>
                  <p className="mt-2 min-h-12 text-base text-paper/70">{plan.tagline}</p>
                  <p className="mt-6 font-serif text-5xl text-paper">
                    {money(price)}
                    <span className="caption ml-2 uppercase text-paper/60">/month</span>
                  </p>
                  <p className="caption mt-1 h-4 uppercase text-sage">{annual ? 'Billed annually' : ''}</p>

                  <Link to={`/assessment?plan=${plan.id}`} className={buttonClass(plan.featured ? 'goldSolid' : 'onDark', 'mt-6 w-full')}>
                    Get Started
                  </Link>

                  <p className="eyebrow mb-4 mt-9 text-gold">What’s included</p>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-base text-paper/85">
                        <Check size={16} className="mt-1.5 shrink-0 text-sage" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-16 text-center text-base text-paper/70">All plans include a 30-day satisfaction guarantee • No long-term contracts</p>
        <p className="mt-3 text-center">
          <Link to="/contact" className="eyebrow text-link text-gold">
            Need a custom solution? Contact us →
          </Link>
        </p>
      </div>
    </section>
  )
}
