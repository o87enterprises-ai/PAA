/** Always-visible safety line, kept calm: night-green strip, gold link. */
export function CrisisBar() {
  return (
    <div role="note" className="bg-forest-night text-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-2">
        <span className="caption uppercase text-paper/70">In crisis?</span>
        <a href="tel:988" className="eyebrow border-b border-gold/60 text-gold transition-opacity duration-300 hover:opacity-60">
          Call or text 988
        </a>
        <span className="caption hidden text-paper/60 sm:inline">Free, confidential, 24/7</span>
      </div>
    </div>
  )
}
