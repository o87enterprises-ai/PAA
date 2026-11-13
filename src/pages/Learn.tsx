import { Link, Navigate, useParams } from 'react-router-dom'
import { BookOpen, FileText, GraduationCap, Library, Video, type LucideIcon } from '@/lib/icons'
import { PageHeader } from '@/components/PageHeader'
import { IconTile } from '@/components/ui/IconTile'
import { buttonClass } from '@/components/ui/Button'

const TOPICS: Record<string, { badge: string; title: string; intro: string; icon: LucideIcon; items: string[]; empty: string }> = {
  'knowledge-base': {
    badge: 'Knowledge Base', icon: Library, title: 'Answers to common questions', intro: 'Plain-language articles on evaluations, IEPs, timelines and your rights.',
    items: ['Understanding your child’s evaluation', 'What belongs in an IEP', 'Timelines every parent should know', 'How to request an IEP meeting'],
    empty: 'Articles are being reviewed before publication.',
  },
  'parent-guide': {
    badge: 'Parent Guide', icon: BookOpen, title: 'Your step-by-step guide', intro: 'From first concern to a signed plan, a clear path through the process.',
    items: ['Step 1 · Recognise the need', 'Step 2 · Request an evaluation', 'Step 3 · Prepare for the meeting', 'Step 4 · Follow up in writing'],
    empty: 'The full guide is being prepared.',
  },
  blog: {
    badge: 'Blog', icon: FileText, title: 'Insights for families', intro: 'Updates and practical advice from our advocacy team.',
    items: ['Preparing for the new school year', 'Five questions to ask at every IEP meeting', 'Keeping records that win'],
    empty: 'Our first posts are coming soon.',
  },
  webinars: {
    badge: 'Webinars', icon: Video, title: 'Learn live with our team', intro: 'Short sessions on the topics parents ask about most.',
    items: ['IEP basics for new parents', 'Reading an evaluation report', 'Transition planning'],
    empty: 'Dates will be announced soon.',
  },
}

export function Learn() {
  const { topic = '' } = useParams()
  const t = TOPICS[topic]
  if (!t) return <Navigate to="/resources" replace />
  return (
    <main>
      <PageHeader badge={t.badge} icon={t.icon} title={t.title} intro={t.intro} />
      <div className="mx-auto max-w-4xl px-6 py-20">
        <p className="eyebrow mb-6 text-gold-deep">Planned topics</p>
        <ul className="grid gap-6 sm:grid-cols-2">
          {t.items.map((i) => (
            <li key={i} className="flex items-center gap-4 border border-gold/40 bg-paper-warm p-6 opacity-90">
              <IconTile icon={GraduationCap} tone="sage" />
              <span className="font-serif text-xl">{i}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-ink-soft">{t.empty}</p>
        <Link to="/assessment" className={buttonClass('gold', 'mt-8')}>Start a free case assessment</Link>
      </div>
    </main>
  )
}
