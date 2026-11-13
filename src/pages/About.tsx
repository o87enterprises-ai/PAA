import { Link } from 'react-router-dom'
import { Heart, ShieldCheck, Target, Users } from '@/lib/icons'
import { PageHeader } from '@/components/PageHeader'
import { SectionHeading } from '@/components/SectionHeading'
import { IconTile, type Tone } from '@/components/ui/IconTile'
import { buttonClass } from '@/components/ui/Button'
import { Reveal } from '@/components/Reveal'
import { STATS } from '@/lib/content'
import type { LucideIcon } from '@/lib/icons'

const VALUES: { title: string; body: string; icon: LucideIcon; tone: Tone }[] = [
  { title: 'Family First', body: 'Every decision starts with your child and the family around them.', icon: Heart, tone: 'gold' },
  { title: 'Rooted in Knowledge', body: 'We know the law, the process and the people, and we explain it plainly.', icon: ShieldCheck, tone: 'forest' },
  { title: 'Data-Driven', body: 'Records and progress data turn concerns into clear, winning arguments.', icon: Target, tone: 'sage' },
  { title: 'Alliance, Not Adversary', body: 'We aim for collaboration with schools first, and stand firm when it is needed.', icon: Users, tone: 'gold' },
]

export function About() {
  return (
    <main>
      <PageHeader
        badge="About Us"
        icon={Heart}
        title={<>Champions for <span className="text-gold">every child</span></>}
        intro="Parent Advocacy Alliance combines expert advocacy with modern technology so families never have to navigate special education alone."
      />
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionHeading badge="Our Mission" title={<>Level the field for <span className="text-gold-deep">families</span></>} intro="Schools have teams of professionals. Parents deserve one too. We give families the knowledge, documentation and representation to secure the services their children are entitled to." />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {VALUES.map((v) => (
            <Reveal key={v.title}>
              <div className="h-full border border-gold/40 bg-paper-warm p-8">
                <IconTile icon={v.icon} tone={v.tone} />
                <h3 className="mt-6 text-2xl">{v.title}</h3>
                <p className="mt-2 text-ink-soft">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-forest-deep py-20 text-paper">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <dd className="font-serif text-5xl text-gold">{s.value}</dd>
              <dt className="eyebrow mt-2 text-paper/75">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>
      <section className="px-6 py-24 text-center">
        <h2 className="text-4xl">Ready to start?</h2>
        <Link to="/assessment" className={buttonClass('solid', 'mt-8')}>Start Free Case Assessment</Link>
      </section>
    </main>
  )
}
