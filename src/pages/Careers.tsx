import { Briefcase } from '@/lib/icons'
import { PageHeader } from '@/components/PageHeader'
import { Prose } from '@/components/Prose'
import { CONTACT } from '@/lib/content'

export function Careers() {
  return (
    <main>
      <PageHeader badge="Careers" icon={Briefcase} title={<>Join the <span className="text-gold">alliance</span></>} intro="Help us make special education advocacy accessible to every family." />
      <Prose>
        <p>We are always glad to meet experienced special education advocates, paralegals, and family support specialists who share our commitment to children and their parents.</p>
        <h2>Open positions</h2>
        <p>There are no listed openings right now. Send your CV and a few lines about your experience to <a className="text-link text-ink" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we will be in touch when a role opens.</p>
      </Prose>
    </main>
  )
}
