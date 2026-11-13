import type { ReactNode } from 'react'
import type { LucideIcon } from '@/lib/icons'
import { cn } from '@/lib/cn'

/** Small tracked pill used above section headings, as on the original site. */
export function Badge({ icon: Icon, children, onDark, className }: { icon?: LucideIcon; children: ReactNode; onDark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'eyebrow inline-flex items-center gap-2 border px-4 py-2',
        onDark ? 'border-gold/50 bg-gold/10 text-gold' : 'border-gold bg-gold/10 text-gold-deep',
        className,
      )}
    >
      {Icon && <Icon size={14} aria-hidden />}
      {children}
    </span>
  )
}
