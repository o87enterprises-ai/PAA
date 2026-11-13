import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Bell, User } from '@/lib/icons'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { supabase } from '@/lib/supabase'
import { useSubscription } from '@/hooks/useSubscription'
import { Logo } from '@/components/Logo'
import { buttonClass } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

const PRIMARY = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/resources', label: 'Resources' },
  { to: '/app', label: 'Dashboard' },
  { to: '/about', label: 'About' },
]

const MORE = [
  { to: '/pricing', label: 'Pricing' },
  { to: '/rights', label: 'Know Your Rights' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { signedIn } = useSubscription()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  // Hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(!open && y > prev && y > 120)
  })

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn('eyebrow border-b pb-1 transition-colors duration-300 hover:text-gold', isActive ? 'border-gold text-gold' : 'border-transparent text-paper')

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-gold/25 bg-forest-deep/95 text-paper backdrop-blur"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3" aria-label="Primary">
        <Logo onDark />

        <div className="hidden items-center gap-8 lg:flex">
          {PRIMARY.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {signedIn && (
            <Link to="/app/messages" aria-label="Notifications" className="relative text-paper transition-colors duration-300 hover:text-gold">
              <Bell size={20} strokeWidth={1.6} aria-hidden />
            </Link>
          )}
          <Link to="/app" className="eyebrow hidden items-center gap-2 text-paper transition-colors duration-300 hover:text-gold sm:inline-flex">
            <User size={16} aria-hidden /> Portal
          </Link>
          <Link to="/assessment" className={buttonClass('goldSolid', 'px-5 py-2.5')}>
            Get Started
          </Link>
          <button className="eyebrow lg:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-gold/25 bg-forest-deep px-6 pb-8 pt-4 lg:hidden">
          <ul className="space-y-5">
            {[...PRIMARY, ...MORE].map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className="font-serif text-2xl text-paper transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              {signedIn ? (
                <button onClick={() => supabase.auth.signOut()} className="eyebrow text-gold">
                  Sign out
                </button>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="eyebrow text-gold">
                  Sign in
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  )
}
