import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { MotionConfig } from 'motion/react'

export interface A11ySettings {
  textScale: 0 | 1 | 2
  highContrast: boolean
  underlineLinks: boolean
  reduceMotion: boolean
}

const DEFAULTS: A11ySettings = { textScale: 0, highContrast: false, underlineLinks: false, reduceMotion: false }
const KEY = 'paa-a11y'

interface Ctx {
  settings: A11ySettings
  update: (patch: Partial<A11ySettings>) => void
  reset: () => void
}

const A11yContext = createContext<Ctx>({ settings: DEFAULTS, update: () => {}, reset: () => {} })

function load(): A11ySettings {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS
  } catch {
    return DEFAULTS
  }
}

/** Stores the visitor's accessibility choices, applies them to <html>, and drives Motion's reduced-motion mode. */
export function A11yProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(load)

  useEffect(() => {
    const el = document.documentElement
    el.dataset.text = String(settings.textScale)
    el.dataset.contrast = settings.highContrast ? 'high' : 'normal'
    el.dataset.links = settings.underlineLinks ? 'underline' : 'normal'
    el.dataset.motion = settings.reduceMotion ? 'reduce' : 'normal'
    try {
      localStorage.setItem(KEY, JSON.stringify(settings))
    } catch {
      /* storage can be unavailable (private mode); the setting still applies for this visit */
    }
  }, [settings])

  return (
    <A11yContext.Provider
      value={{ settings, update: (patch) => setSettings((s) => ({ ...s, ...patch })), reset: () => setSettings(DEFAULTS) }}
    >
      <MotionConfig reducedMotion={settings.reduceMotion ? 'always' : 'user'}>{children}</MotionConfig>
    </A11yContext.Provider>
  )
}

export const useA11y = () => useContext(A11yContext)
