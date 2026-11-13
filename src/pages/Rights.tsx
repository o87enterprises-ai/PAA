import { Scale } from '@/lib/icons'
import { Link } from 'react-router-dom'
import { StubPage } from '@/components/StubPage'
import { buttonClass } from '@/components/ui/Button'

export function Rights() {
  return (
    <StubPage
      icon={Scale}
      label="Rights protection"
      title="Know what you are entitled to"
      intro="Plain-language guides to the protections available to your child, and how to ask for them."
      emptyTitle="Guides are being prepared"
      emptyBody="Our rights guides are being reviewed before publication. In the meantime, our directory lists legal and advocacy organizations by state."
      planned={[
        { title: 'Education rights', body: 'Evaluations, support plans and meetings, explained step by step.' },
        { title: 'Health and mental health', body: 'Access to care, privacy, and how to challenge a denial.' },
        { title: 'Benefits and basic needs', body: 'What assistance exists and how to apply.' },
        { title: 'Letter templates', body: 'Ready-to-adapt requests and appeals, written in clear language.' },
      ]}
    >
      <h3 className="text-2xl">Guides are being prepared</h3>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">
        Our rights guides are being reviewed before publication. In the meantime, our directory lists legal and advocacy organizations by state.
      </p>
      <Link to="/resources" className={buttonClass('gold', 'mt-8')}>
        Browse the directory
      </Link>
    </StubPage>
  )
}
