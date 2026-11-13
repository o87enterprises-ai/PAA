import { FileText, ShieldCheck } from '@/lib/icons'
import { PageHeader } from '@/components/PageHeader'
import { Prose } from '@/components/Prose'
import { CONTACT } from '@/lib/content'

function Draft() {
  return <p className="border border-gold bg-gold/10 p-4 text-base text-ink">Draft placeholder text. This must be reviewed by a qualified lawyer before launch.</p>
}

export function Privacy() {
  return (
    <main>
      <PageHeader badge="Legal" icon={ShieldCheck} title="Privacy Policy" />
      <Prose>
        <Draft />
        <h2>What we collect</h2>
        <p>Details you give us when you request an assessment, book a service, contact us, or use your client portal, such as name, email and case documents.</p>
        <h2>How we use it</h2>
        <p>To provide advocacy services, communicate with you, and run the site. We do not sell your personal information.</p>
        <h2>Your choices</h2>
        <p>You may ask to access, correct or delete your information at any time by contacting {CONTACT.email}.</p>
      </Prose>
    </main>
  )
}

export function Terms() {
  return (
    <main>
      <PageHeader badge="Legal" icon={FileText} title="Terms of Service" />
      <Prose>
        <Draft />
        <h2>Our services</h2>
        <p>Parent Advocacy Alliance provides special education advocacy and information. We are not a law firm, and nothing on this site is legal advice.</p>
        <h2>No guarantee</h2>
        <p>Outcomes depend on individual circumstances; we cannot guarantee a particular result.</p>
        <h2>Contact</h2>
        <p>Questions about these terms: {CONTACT.email}.</p>
      </Prose>
    </main>
  )
}
