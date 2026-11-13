import type { ReactNode } from 'react'
import type { LucideIcon } from '@/lib/icons'
import { Badge } from '@/components/ui/Badge'

/** Deep-green band that opens every inner page, with the same gold glow as the home hero. */
export function PageHeader({ badge, icon, title, intro, children }: { badge: string; icon?: LucideIcon; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden bg-forest-deep text-paper">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_90%_at_85%_0%,rgba(193,159,115,0.18),transparent_70%)]" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Badge icon={icon} onDark>
          {badge}
        </Badge>
        <h1 className="mt-7 max-w-3xl text-4xl leading-[1.1] text-paper md:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-paper/75 md:text-xl">{intro}</p>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </header>
  )
}
