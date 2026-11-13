import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'solid' | 'gold' | 'outline' | 'goldSolid' | 'onDark'

/**
 * Square-cornered buttons shared by <button> and router <Link>.
 *  solid     forest green fill (primary on light sections)
 *  gold      gold hairline outline (secondary on light)
 *  outline   quiet grey hairline
 *  goldSolid gold fill (primary on dark sections)
 *  onDark    paper hairline outline (secondary on dark)
 */
export function buttonClass(variant: ButtonVariant = 'solid', className?: string) {
  return cn(
    'eyebrow inline-flex items-center justify-center gap-2 border px-8 py-4',
    'transition-colors duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-40',
    variant === 'solid' && 'border-forest bg-forest text-paper hover:border-gold hover:bg-forest-deep',
    variant === 'gold' && 'border-gold bg-transparent text-gold-deep hover:border-ink hover:text-ink',
    variant === 'outline' && 'border-line bg-transparent text-ink hover:border-ink',
    variant === 'goldSolid' && 'border-gold bg-gold text-forest-night hover:border-paper hover:bg-paper',
    variant === 'onDark' && 'border-paper/40 bg-transparent text-paper hover:border-gold hover:text-gold',
    className,
  )
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({ variant = 'solid', className, ...rest }: Props) {
  return <button {...rest} className={buttonClass(variant, className)} />
}
