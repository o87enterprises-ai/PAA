import { NavLink } from 'react-router-dom'
import { CalendarCheck, Home, Briefcase, User } from '@/lib/icons'
import { cn } from '@/lib/cn'

const TABS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/services', label: 'Services', icon: Briefcase },
  { to: '/book', label: 'Book', icon: CalendarCheck },
  { to: '/app', label: 'Portal', icon: User },
]

/** Bottom tab bar on phones, like the original site's mobile layout. */
export function MobileTabBar() {
  return (
    <nav aria-label="Quick navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-forest-deep text-paper md:hidden">
      <ul className="grid grid-cols-4">
        {TABS.map((t) => (
          <li key={t.to}>
            <NavLink
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                cn('flex flex-col items-center gap-1 py-3 transition-colors duration-300', isActive ? 'text-gold' : 'text-paper/80 hover:text-gold')
              }
            >
              <t.icon size={20} strokeWidth={1.6} aria-hidden />
              <span className="caption uppercase">{t.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
