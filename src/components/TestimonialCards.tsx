import { BadgeCheck, Quote, Star } from '@/lib/icons'
import { RATING, TESTIMONIALS } from '@/lib/content'
import { Reveal } from '@/components/Reveal'

function Stars() {
  return (
    <div className="flex gap-1 text-gold" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={18} fill="currentColor" strokeWidth={0} aria-hidden />
      ))}
    </div>
  )
}

/** Three quote cards plus the overall rating pill, as on the original. */
export function TestimonialCards() {
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <Reveal key={t.name}>
            <figure className="relative flex h-full flex-col border border-gold/40 bg-paper p-8">
              <Quote size={40} className="absolute right-6 top-6 text-gold/30" strokeWidth={1.2} aria-hidden />
              <Stars />
              <blockquote className="mt-6 grow font-serif text-xl leading-relaxed text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold bg-forest font-sans text-sm tracking-wider text-gold" aria-hidden>
                  {t.initials}
                </span>
                <span className="grow">
                  <span className="block font-serif text-lg leading-tight">{t.name}</span>
                  <span className="caption block uppercase text-ink-soft">{t.place}</span>
                </span>
                {t.verified && (
                  <span className="caption inline-flex items-center gap-1 bg-sage-soft px-2 py-1 uppercase text-forest">
                    <BadgeCheck size={13} aria-hidden /> Verified Client
                  </span>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 flex justify-center">
        <div className="inline-flex items-center gap-5 border border-gold/50 bg-forest px-8 py-5 text-paper">
          <Stars />
          <span className="font-serif text-4xl leading-none">{RATING.score}</span>
          <span className="caption uppercase text-paper/70">{RATING.label}</span>
        </div>
      </Reveal>
    </div>
  )
}
