import { useEffect, useState } from 'react'
import { Accessibility, X } from '@/lib/icons'
import { useA11y } from '@/lib/a11y'
import { cn } from '@/lib/cn'

const SIZES = [
  { v: 0 as const, label: 'A', aria: 'Default text size' },
  { v: 1 as const, label: 'A+', aria: 'Larger text' },
  { v: 2 as const, label: 'A++', aria: 'Largest text' },
]

/** Floating tab on the left edge, as on the original site, with real controls behind it. */
export function AccessibilityMenu() {
  const [open, setOpen] = useState(false)
  const { settings, update, reset } = useA11y()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const toggles = [
    { key: 'highContrast' as const, label: 'High contrast' },
    { key: 'underlineLinks' as const, label: 'Underline links' },
    { key: 'reduceMotion' as const, label: 'Reduce motion' },
  ]

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="Accessibility options"
        className="fixed left-0 top-1/3 z-40 border border-l-0 border-gold bg-gold p-3 text-forest-night transition-colors duration-300 hover:bg-paper"
      >
        <Accessibility size={22} aria-hidden />
      </button>

      {open && (
        <div
          id="a11y-panel"
          role="dialog"
          aria-label="Accessibility options"
          className="fixed left-0 top-1/3 z-50 ml-0 w-72 max-w-[85vw] border border-gold bg-paper p-6 text-ink"
        >
          <div className="mb-5 flex items-center justify-between">
            <p className="eyebrow text-gold-deep">Accessibility</p>
            <button onClick={() => setOpen(false)} aria-label="Close accessibility options" className="transition-opacity hover:opacity-60">
              <X size={18} aria-hidden />
            </button>
          </div>

          <p className="eyebrow mb-3 text-ink-soft">Text size</p>
          <div className="mb-6 grid grid-cols-3 gap-2">
            {SIZES.map((s) => (
              <button
                key={s.v}
                onClick={() => update({ textScale: s.v })}
                aria-label={s.aria}
                aria-pressed={settings.textScale === s.v}
                className={cn(
                  'border py-2 font-serif text-lg transition-colors duration-300',
                  settings.textScale === s.v ? 'border-forest bg-forest text-paper' : 'border-line hover:border-ink',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          <ul className="space-y-4">
            {toggles.map((t) => (
              <li key={t.key}>
                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <span className="text-base">{t.label}</span>
                  <input
                    type="checkbox"
                    checked={settings[t.key]}
                    onChange={(e) => update({ [t.key]: e.target.checked })}
                    className="size-5 accent-[var(--color-forest)]"
                  />
                </label>
              </li>
            ))}
          </ul>

          <button onClick={reset} className="eyebrow text-link mt-7 text-ink-soft">
            Reset
          </button>
        </div>
      )}
    </>
  )
}
