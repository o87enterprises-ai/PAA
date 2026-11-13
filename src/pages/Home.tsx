import { Link } from 'react-router-dom'
import { ArrowRight, Rocket, Sparkles } from '@/lib/icons'
import { Reveal } from '@/components/Reveal'
import { AssessmentOrb } from '@/components/AssessmentOrb'
import { PricingSection } from '@/components/PricingSection'
import { TestimonialCards } from '@/components/TestimonialCards'
import { SectionHeading } from '@/components/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { IconTile } from '@/components/ui/IconTile'
import { buttonClass } from '@/components/ui/Button'
import { FEATURES, HERO_TAGS, STATS } from '@/lib/content'

export function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-deep text-paper">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_78%_45%,rgba(193,159,115,0.2),transparent_70%)]" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 py-24 md:py-32 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Badge icon={Sparkles} onDark>
              Advanced Technology Platform
            </Badge>
            <h1 className="mt-8 text-5xl leading-[1.05] text-paper md:text-7xl">
              Champion Your
              <br />
              <span className="text-gold">Child’s Future</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-paper/80 md:text-xl">
              Expert special education advocacy for discerning families. Navigate IEPs, secure services, and unlock your child’s full potential with Parent
              Advocacy Alliance’s cutting-edge support system.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {HERO_TAGS.map((t) => (
                <li key={t.label} className="caption inline-flex items-center gap-2 uppercase text-sage">
                  <t.icon size={15} aria-hidden /> {t.label}
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link to="/assessment" className={buttonClass('goldSolid')}>
                Start Free Screening <Rocket size={16} aria-hidden />
              </Link>
              <Link to="/pricing" className={buttonClass('onDark')}>
                Explore Packages <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <AssessmentOrb />
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" aria-hidden />
      </section>

      {/* Features */}
      <section className="mx-auto mt-32 max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            center
            badge="Cutting-Edge Platform"
            title={
              <>
                Technology Meets <span className="text-gold-deep">Advocacy Excellence</span>
              </>
            }
            intro="Experience a revolutionary approach to special education advocacy powered by technology, real-time collaboration, and data-driven insights."
          />
        </Reveal>
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Reveal key={f.title}>
              <Link
                to={f.to}
                className="group flex h-full flex-col border border-gold/40 bg-paper-warm p-8 transition-colors duration-300 hover:border-forest hover:bg-sage-soft"
              >
                <IconTile icon={f.icon} tone={f.tone} />
                <h3 className="mt-6 text-2xl">{f.title}</h3>
                <p className="mt-3 grow text-ink-soft">{f.body}</p>
                <span className="eyebrow mt-6 inline-flex items-center gap-2 text-gold-deep transition-colors group-hover:text-forest">
                  Explore <ArrowRight size={14} aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <Reveal>
        <section aria-label="At a glance" className="mx-auto mt-24 max-w-6xl px-6">
          <dl className="grid grid-cols-2 gap-y-10 border border-gold/50 bg-forest px-6 py-12 text-paper md:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className={`flex flex-col items-center text-center ${i > 0 ? 'md:border-l md:border-gold/25' : ''}`}>
                <s.icon size={22} strokeWidth={1.5} className="mb-4 text-gold" aria-hidden />
                <dd className="font-serif text-5xl leading-none text-gold md:text-6xl">{s.value}</dd>
                <dt className="caption mt-3 uppercase text-paper/75">{s.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      {/* Mid-page invitation */}
      <Reveal>
        <section className="mx-auto mt-24 max-w-2xl px-6 text-center">
          <p className="font-serif text-2xl text-ink-soft md:text-3xl">Ready to experience the future of special education advocacy?</p>
          <Link to="/assessment" className={buttonClass('solid', 'mt-10')}>
            Get Started Today
          </Link>
        </section>
      </Reveal>

      {/* Pricing */}
      <div className="mt-32">
        <PricingSection />
      </div>

      {/* Testimonials */}
      <section className="bg-paper-warm py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeading
              center
              badge="Client Success Stories"
              title={
                <>
                  Trusted by <span className="text-gold-deep">Leading Families</span>
                </>
              }
              intro="Hear from parents who’ve experienced the Parent Advocacy Alliance difference."
            />
          </Reveal>
          <div className="mt-16">
            <TestimonialCards />
          </div>
        </div>
      </section>
    </main>
  )
}
