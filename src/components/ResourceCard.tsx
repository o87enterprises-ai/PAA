import type { Resource } from '@/lib/types'

function safeHref(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

export function ResourceCard({ resource: r }: { resource: Resource }) {
  const location = [r.city, r.state].filter(Boolean).join(', ')
  return (
    <article className="border-t border-line py-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl">{r.name}</h2>
        {r.is_verified && <span className="caption shrink-0 uppercase text-gold-deep">Verified</span>}
      </div>
      {location && <p className="caption mt-1 uppercase text-ink-soft">{location}</p>}
      {r.description && <p className="mt-4 max-w-prose text-ink-soft">{r.description}</p>}
      <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2">
        {r.phone && (
          <a className="eyebrow text-link text-ink" href={`tel:${r.phone.replace(/[^\d+]/g, '')}`}>
            {r.phone}
          </a>
        )}
        {r.website && (
          <a className="eyebrow text-link text-ink-soft" href={safeHref(r.website)} target="_blank" rel="noopener noreferrer">
            Visit website
          </a>
        )}
        {r.hours && <span className="caption uppercase text-ink-soft">{r.hours}</span>}
      </div>
    </article>
  )
}
