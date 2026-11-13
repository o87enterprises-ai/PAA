import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge'
import type { LucideIcon } from '@/lib/icons'

/**
 * Pill badge + serif heading + intro. Pass part of the title in
 * <span className="text-gold-deep"> (or text-gold on dark) for the original's two-tone headings.
 */
export function SectionHeading({
  badge,
  icon,
  title,
  intro,
  onDark,
  center,
  className,
}: {
  badge: string
  icon?: LucideIcon
  title: ReactNode
  intro?: ReactNode
  onDark?: boolean
  center?: boolean
  className?: string
}) {
  return (
    <header className={cn('max-w-2xl', center && 'mx-auto text-center', className)}>
      <Badge icon={icon} onDark={onDark}>
        {badge}
      </Badge>
      <h2 className={cn('mt-6 text-4xl leading-tight md:text-5xl', onDark && 'text-paper')}>{title}</h2>
      {intro && <p className={cn('mt-5 text-lg', onDark ? 'text-paper/75' : 'text-ink-soft')}>{intro}</p>}
    </header>
  )
}
