import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from '@/lib/icons'
import { Logo } from '@/components/Logo'
import { BRAND, CONTACT, FOOTER_COLUMNS, SOCIAL } from '@/lib/content'

export function Footer() {
  return (
    <footer className="bg-forest-night text-paper">
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo layout="stacked" onDark className="items-start" />
          <p className="eyebrow mt-5 text-gold">{BRAND.tagline}</p>
          <p className="mt-5 max-w-sm text-base text-paper/70">{BRAND.blurb}</p>
          <ul className="mt-7 space-y-3 text-base text-paper/80">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-3 transition-colors hover:text-gold">
                <Mail size={16} className="text-gold" aria-hidden /> {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={`tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-3 transition-colors hover:text-gold">
                <Phone size={16} className="text-gold" aria-hidden /> {CONTACT.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-3">
              <MapPin size={16} className="text-gold" aria-hidden /> {CONTACT.location}
            </li>
          </ul>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="eyebrow mb-6 font-sans text-gold">{col.heading}</h2>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-base text-paper/75 transition-colors duration-300 hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 pb-28 text-center md:flex-row md:pb-8 md:text-left">
          <p className="caption text-paper/60">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. We provide advocacy support, not legal or medical advice. In crisis? Call or text{' '}
            <a href="tel:988" className="text-gold underline underline-offset-4">
              988
            </a>
            .
          </p>
          <div className="flex items-center gap-6">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="eyebrow text-paper/70 hover:text-gold">
                {s.label}
              </a>
            ))}
            <Link to="/terms" className="caption uppercase text-paper/60 hover:text-gold">
              Terms of Service
            </Link>
            <Link to="/privacy" className="caption uppercase text-paper/60 hover:text-gold">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
