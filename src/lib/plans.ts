import { Crown, Sparkles, Star, type LucideIcon } from '@/lib/icons'
import type { Tone } from '@/components/ui/IconTile'

export interface Plan {
  id: 'essential' | 'professional' | 'elite'
  name: string
  tagline: string
  /** Monthly price in USD. Annual billing is shown at ANNUAL_DISCOUNT off. */
  monthly: number
  icon: LucideIcon
  tone: Tone
  features: string[]
  featured?: boolean
}

export const ANNUAL_DISCOUNT = 0.2

// Prices and features are from the original design mock.
// Backend note: checkout is intentionally not wired yet (design review first).
export const PLANS: Plan[] = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Perfect for families starting their advocacy journey',
    monthly: 297,
    icon: Star,
    tone: 'sage',
    features: [
      'IEP Meeting Preparation (up to 2/year)',
      'Document Review & Analysis',
      'Email Support (48hr response)',
      'Resource Library Access',
      'Monthly Progress Reports',
      'Parent Training Webinars',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Comprehensive support for ongoing advocacy needs',
    monthly: 597,
    icon: Sparkles,
    tone: 'gold',
    featured: true,
    features: [
      'IEP Meeting Preparation (up to 4/year)',
      'IEP Meeting Attendance (virtual/in-person)',
      'Data-Driven Case Strategy',
      'Priority Email & Phone Support (24hr)',
      'Document Management Portal',
      'Bi-weekly Progress Updates',
      'School Communication Templates',
      'Assessment Interpretation',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'White-glove advocacy for complex cases',
    monthly: 1297,
    icon: Crown,
    tone: 'forest',
    features: [
      'Unlimited IEP Meeting Support',
      'Dedicated Advocate Team',
      'Expert Legal Consultation',
      '24/7 Concierge Support',
      'Advanced Analytics Dashboard',
      'Weekly Strategy Sessions',
      'School District Liaison',
      'Due Process Support',
      'Expert Witness Coordination',
      'Custom Advocacy Plan',
    ],
  },
]

export const money = (n: number) => `$${n.toLocaleString('en-US')}`
