import type { ReactNode } from 'react'

export function Prose({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl space-y-6 px-6 py-20 text-lg text-ink-soft [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-ink">{children}</div>
}
