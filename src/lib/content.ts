import {
  Brain,
  CalendarDays,
  FileText,
  MessageSquare,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from '@/lib/icons'
import type { Tone } from '@/components/ui/IconTile'

/**
 * All site copy lives here so it can be edited without touching layout code.
 *
 * Copy comes from the original TRM design mock, with "TRM Advocacy" replaced by
 * "Parent Advocacy Alliance" and Sacramento-specific wording made general.
 * PLACEHOLDER marks anything that must be confirmed as true before launch.
 */

export const BRAND = {
  name: 'Parent Advocacy Alliance',
  tagline: 'Empowering Special Education Families',
  blurb:
    'A premier special education advocacy alliance, combining expert knowledge with cutting-edge technology to champion your child’s educational rights.',
}

// PLACEHOLDER: replace with real contact details.
export const CONTACT = {
  email: 'contact@parentadvocacyalliance.org',
  phone: '(916) 555-1234',
  location: 'Serving families nationwide',
}

// PLACEHOLDER: add real URLs and social links render in the footer automatically.
export const SOCIAL: { label: string; href: string }[] = []

// PLACEHOLDER: figures from the mock. Confirm each is accurate and defensible
// (especially any "success rate" claim) before publishing.
export const STATS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: '500+', label: 'Families Served', icon: Users },
  { value: '100%', label: 'Success Rate', icon: TrendingUp },
  { value: '<24h', label: 'Avg. Response Time', icon: Zap },
  { value: '15+', label: 'Years Experience', icon: ShieldCheck },
]

export const HERO_TAGS: { label: string; icon: LucideIcon }[] = [
  { label: '100% Success Rate', icon: ShieldCheck },
  { label: 'Data-Driven Strategy', icon: Target },
  { label: '24hr Response Time', icon: Zap },
]

export interface Feature {
  title: string
  body: string
  icon: LucideIcon
  tone: Tone
  to: string
}

export const FEATURES: Feature[] = [
  {
    title: 'Data-Driven Strategy',
    body: 'Advanced analytics review thousands of successful IEP cases to craft your optimal advocacy approach.',
    icon: Brain,
    tone: 'gold',
    to: '/app',
  },
  {
    title: 'Smart Document Management',
    body: 'Auto-categorize, analyze, and track all special education paperwork with intelligent tagging and instant retrieval.',
    icon: FileText,
    tone: 'sage',
    to: '/app/documents',
  },
  {
    title: 'Intelligent Scheduling',
    body: 'Smart calendar optimization finds the perfect meeting times and sends automated reminders to all stakeholders.',
    icon: CalendarDays,
    tone: 'forest',
    to: '/app/schedule',
  },
  {
    title: 'Real-Time Communication Hub',
    body: 'Secure messaging platform with read receipts, reactions, and transcript generation for all advocacy conversations.',
    icon: MessageSquare,
    tone: 'sage',
    to: '/app/messages',
  },
  {
    title: 'Progress Visualization',
    body: 'Holographic data displays show your child’s developmental trajectory and advocacy milestone achievements.',
    icon: TrendingUp,
    tone: 'gold',
    to: '/app/progress',
  },
  {
    title: 'Rights Protection System',
    body: 'Automated compliance monitoring ensures school districts meet all IDEA requirements and legal obligations.',
    icon: ShieldCheck,
    tone: 'forest',
    to: '/rights',
  },
]

export interface Service {
  id: string
  name: string
  blurb: string
  price: number
  duration: string
  ribbon?: 'Popular' | 'Best Value'
  includes: string[]
  /** Shown in the compare table */
  bestFor?: string
}

export const SERVICES: Service[] = [
  {
    id: 'initial-consultation',
    name: 'Initial Consultation',
    blurb: 'Comprehensive case review and strategy planning session',
    price: 150,
    duration: '60 min',
    bestFor: 'First-time families',
    includes: ['Case file review', 'Parent interview', 'Initial strategy development', 'Resource recommendations'],
  },
  {
    id: 'iep-meeting-preparation',
    name: 'IEP Meeting Preparation',
    blurb: 'Full preparation package for upcoming IEP meetings',
    price: 450,
    duration: '3-5 hours',
    ribbon: 'Popular',
    bestFor: 'Upcoming IEP meetings',
    includes: ['Document analysis', 'Goal development', 'Parent training', 'Meeting script preparation', 'Technology-powered insights'],
  },
  {
    id: 'iep-meeting-attendance',
    name: 'IEP Meeting Attendance',
    blurb: 'Expert advocate attends and leads your IEP meeting',
    price: 750,
    duration: 'Full meeting',
    bestFor: 'Complex cases',
    includes: ['In-person or virtual attendance', 'Real-time advocacy', 'Professional documentation', 'Follow-up action plan', 'School communication support'],
  },
  {
    id: 'document-review',
    name: 'Document Review',
    blurb: 'Professional analysis of IEPs, evaluations, and reports',
    price: 200,
    duration: '2-3 hours',
    bestFor: 'Document concerns',
    includes: ['Detailed written analysis', 'Gap identification', 'Recommendation report', '30-min review call'],
  },
  {
    id: 'monthly-support-package',
    name: 'Monthly Support Package',
    blurb: 'Continuous advocacy support and guidance',
    price: 597,
    duration: 'Ongoing',
    ribbon: 'Best Value',
    includes: ['Unlimited email support', 'Monthly strategy calls', 'Document review included', 'Priority scheduling', 'Advanced dashboard access'],
  },
  {
    id: 'due-process-support',
    name: 'Due Process Support',
    blurb: 'Complete support for due process proceedings',
    price: 2500,
    duration: 'Full process',
    includes: ['Legal consultation', 'Evidence preparation', 'Expert witness coordination', 'Mediation support', 'Hearing attendance'],
  },
]

export interface Testimonial {
  quote: string
  name: string
  place: string
  initials: string
  verified: boolean
}

// PLACEHOLDER: these quotes, names, the "Verified Client" label and the 5.0 / 200+ rating come from
// the design mock. Replace with real, consented client quotes before launch. Publishing
// unverified reviews as verified can be a legal problem; set verified to false until confirmed.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Parent Advocacy Alliance transformed our IEP experience. Their detailed analysis identified gaps in services we never knew existed. My son now receives the specialized support he deserves.',
    name: 'Jennifer Martinez',
    place: 'Parent, Sacramento',
    initials: 'JM',
    verified: true,
  },
  {
    quote:
      'The 24-hour response time is incredible. When we faced last-minute IEP changes, the team provided expert guidance immediately. Worth every penny.',
    name: 'David Chen',
    place: 'Parent, Elk Grove',
    initials: 'DC',
    verified: true,
  },
  {
    quote:
      'Finally, advocacy services that match our standards. The tech platform is intuitive, and the expertise is unmatched. They secured services worth $40K/year for our daughter.',
    name: 'Sarah Thompson',
    place: 'Parent, Folsom',
    initials: 'ST',
    verified: true,
  },
]

export const RATING = { score: '5.0', label: 'from 200+ reviews' }

export const FOOTER_COLUMNS: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: 'Services',
    links: [
      { label: 'IEP Support', to: '/services#iep-meeting-preparation' },
      { label: 'Document Review', to: '/services#document-review' },
      { label: 'Meeting Attendance', to: '/services#iep-meeting-attendance' },
      { label: 'Legal Consultation', to: '/services#due-process-support' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Knowledge Base', to: '/learn/knowledge-base' },
      { label: 'Parent Guide', to: '/learn/parent-guide' },
      { label: 'Blog', to: '/learn/blog' },
      { label: 'Webinars', to: '/learn/webinars' },
      { label: 'Resource Directory', to: '/resources' },
      { label: 'Know Your Rights', to: '/rights' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
      { label: 'Marketplace', to: '/marketplace' },
      { label: 'Privacy Policy', to: '/privacy' },
    ],
  },
]
