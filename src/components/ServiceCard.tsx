import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Clock, RotateCcw } from '@/lib/icons'
import type { Service } from '@/lib/content'
import { money } from '@/lib/plans'
import { buttonClass } from '@/components/ui/Button'

/** Front shows price and a "Book Now"; "details" flips the card to show what is included. */
export function ServiceCard({ service: s }: { service: Service }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <article id={s.id} className="flip scroll-mt-32" data-flipped={flipped}>
      <div className="flip-inner">
        {/* Front */}
        <div className="flip-face flex flex-col border border-gold/40 bg-paper-warm p-8" inert={flipped}>
          {s.ribbon && <span className="eyebrow absolute -top-3 right-6 bg-gold px-4 py-1 text-forest-night">{s.ribbon}</span>}
          <h3 className="text-2xl">{s.name}</h3>
          <p className="mt-3 text-ink-soft">{s.blurb}</p>
          <p className="mt-8 font-serif text-5xl text-forest">{money(s.price)}</p>
          <p className="caption mt-2 inline-flex items-center gap-2 uppercase text-ink-soft">
            <Clock size={14} aria-hidden /> {s.duration}
          </p>
          <div className="mt-auto flex flex-col gap-4 pt-8">
            <Link to={`/book?service=${s.id}`} className={buttonClass('solid', 'w-full')}>
              Book Now
            </Link>
            <button onClick={() => setFlipped(true)} className="eyebrow text-link self-center text-gold-deep">
              Click for details →
            </button>
          </div>
        </div>

        {/* Back */}
        <div className="flip-face flip-back flex flex-col border border-gold bg-forest p-8 text-paper" inert={!flipped} aria-hidden={!flipped}>
          <h3 className="text-2xl text-gold">What’s Included</h3>
          <ul className="mt-6 space-y-3">
            {s.includes.map((i) => (
              <li key={i} className="flex items-start gap-3 text-base text-paper/90">
                <Check size={16} className="mt-1.5 shrink-0 text-sage" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-4 pt-8">
            <Link to={`/book?service=${s.id}`} className={buttonClass('goldSolid', 'w-full')}>
              Book This Service
            </Link>
            <button onClick={() => setFlipped(false)} className="eyebrow inline-flex items-center justify-center gap-2 text-paper/80 hover:text-gold">
              <RotateCcw size={14} aria-hidden /> Click to flip back
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
