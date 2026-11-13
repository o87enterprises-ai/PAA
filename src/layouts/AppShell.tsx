import { Link, NavLink, Outlet } from 'react-router-dom'
import { BarChart3, Calendar, CreditCard, FileText, LayoutDashboard, MessageSquare, Settings } from '@/lib/icons'
import { useSubscription } from '@/hooks/useSubscription'
import { buttonClass } from '@/components/ui/Button'
import { Logo } from '@/components/Logo'
import { cn } from '@/lib/cn'

const SECTIONS = [
  { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/app/documents', label: 'Documents', icon: FileText },
  { to: '/app/schedule', label: 'Schedule', icon: Calendar },
  { to: '/app/messages', label: 'Messages', icon: MessageSquare },
  { to: '/app/progress', label: 'Progress', icon: BarChart3 },
  { to: '/app/billing', label: 'Billing', icon: CreditCard },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

/** Client portal. Visitors who are not signed in see a clearly-labelled preview with sample data. */
export function AppShell() {
  const { signedIn, loading, tier } = useSubscription()
  if (loading) return <div className="min-h-[60vh]" aria-busy="true" />

  return (
    <div className="bg-paper-warm">
      {!signedIn && (
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 bg-gold px-6 py-3 text-center text-forest-night">
          <p className="eyebrow">Preview mode · sample data</p>
          <Link to="/login?next=/app" className="eyebrow text-link">
            Sign in to see your own
          </Link>
        </div>
      )}
      <div className="mx-auto max-w-6xl px-6 pb-16 md:grid md:grid-cols-[14rem_1fr] md:gap-10 md:pt-10">
        <aside className="-mx-6 bg-forest-deep px-6 py-4 md:mx-0 md:self-start md:px-5 md:py-6">
          <div className="hidden md:block">
            <Logo onDark />
            <p className="eyebrow mt-6 text-gold">{signedIn ? 'Your plan' : 'Preview'}</p>
            <p className="mb-6 mt-1 capitalize text-paper">{signedIn ? tier.replace(/_/g, ' ') : 'Sample family'}</p>
          </div>
          <nav aria-label="Dashboard" className="flex gap-2 overflow-x-auto md:flex-col">
            {SECTIONS.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'eyebrow flex items-center gap-3 whitespace-nowrap px-4 py-3 text-paper/75 transition-colors hover:text-gold',
                    isActive && 'bg-gold/15 text-gold',
                  )
                }
              >
                <Icon size={16} aria-hidden />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <Outlet context={{ signedIn }} />
      </div>
    </div>
  )
}

export const dashboardButton = (v: Parameters<typeof buttonClass>[0] = 'solid') => buttonClass(v)
