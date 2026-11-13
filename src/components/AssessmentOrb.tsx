import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

/** The original's floating "Start Free Case Assessment" circle, with our emblem inside. Gently floats; still when motion is reduced. */
export function AssessmentOrb() {
  return (
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="relative">
      <Link
        to="/assessment"
        aria-label="Start a free case assessment"
        className="group relative grid size-64 place-items-center rounded-full border border-gold/60 bg-gradient-to-b from-gold/15 to-transparent text-center shadow-[0_0_80px_rgba(193,159,115,0.25)] transition-shadow duration-500 hover:shadow-[0_0_110px_rgba(193,159,115,0.4)] md:size-80"
      >
        <span className="absolute -inset-4 rounded-full border border-gold/25" aria-hidden />
        <span className="absolute -inset-9 rounded-full border border-gold/10" aria-hidden />
        <span className="flex flex-col items-center">
          <img src="/logo-emblem.png" alt="" width={640} height={462} className="mb-5 h-16 w-auto md:h-20" />
          <span className="font-serif text-2xl text-paper md:text-3xl">Start Free</span>
          <span className="eyebrow mt-2 text-gold transition-colors duration-300 group-hover:text-paper">Case Assessment</span>
        </span>
      </Link>
    </motion.div>
  )
}
