import type { LucideIcon } from '@/lib/icons'
import { cn } from '@/lib/cn'

export type Tone = 'gold' | 'sage' | 'forest'

const TONES: Record<Tone, string> = {
  gold: 'bg-gradient-to-br from-gold to-[#dcc297] text-forest-night',
  sage: 'bg-gradient-to-br from-sage to-[#6f9578] text-forest-night',
  forest: 'bg-gradient-to-br from-forest to-forest-deep text-gold',
}

/** Gradient icon square, the original site's signature feature-card motif. */
export function IconTile({ icon: Icon, tone = 'gold', size = 'md', className }: { icon: LucideIcon; tone?: Tone; size?: 'md' | 'lg'; className?: string }) {
  return (
    <span className={cn('inline-grid place-items-center', size === 'lg' ? 'size-16' : 'size-12', TONES[tone], className)}>
      <Icon size={size === 'lg' ? 28 : 22} strokeWidth={1.6} aria-hidden />
    </span>
  )
}
