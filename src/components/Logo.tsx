import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

interface Props {
  /** nav: emblem + wordmark side by side. stacked: emblem over wordmark. */
  layout?: 'nav' | 'stacked'
  /** Use on dark green/black backgrounds. */
  onDark?: boolean
  className?: string
}

/**
 * Official emblem (transparent PNG) plus the wordmark set as live serif text,
 * which stays crisp at every size. Never animated, never recolored.
 */
export function Logo({ layout = 'nav', onDark, className }: Props) {
  const stacked = layout === 'stacked'
  return (
    <Link
      to="/"
      aria-label="Parent Advocacy Alliance, home"
      className={cn('inline-flex items-center transition-opacity duration-300 hover:opacity-60', stacked ? 'flex-col gap-4' : 'gap-3', className)}
    >
      <img src="/logo-emblem.png" alt="" width={640} height={462} className={stacked ? 'h-24 w-auto md:h-28' : 'h-9 w-auto'} />
      <span
        className={cn(
          'font-serif uppercase',
          onDark ? 'text-gold' : 'text-gold-deep',
          stacked ? 'text-center text-sm tracking-[0.3em]' : 'hidden text-[0.8125rem] tracking-[0.22em] sm:inline',
        )}
      >
        Parent Advocacy Alliance
      </span>
    </Link>
  )
}
