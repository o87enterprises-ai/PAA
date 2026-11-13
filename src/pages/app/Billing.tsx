import { Link } from 'react-router-dom'
import { StubPage } from '@/components/StubPage'
import { buttonClass } from '@/components/ui/Button'

export function Billing() {
  return (
    <StubPage
      embedded
      label="Billing"
      title="Plan & billing"
      intro="Your plan, invoices and payment method."
      emptyTitle="No active plan"
      emptyBody="Choose a package to unlock your full toolkit. Checkout is not connected yet."
      planned={[
        { title: 'Current plan', body: 'See what is included and when it renews.' },
        { title: 'Invoices', body: 'Download receipts for every payment.' },
        { title: 'Change or cancel', body: 'Switch plans or stop at any time.' },
        { title: 'Payment method', body: 'Update your card securely through Stripe.' },
      ]}
    >
      <h3 className="text-2xl">No active plan</h3>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">Choose a package to unlock your full toolkit. Checkout is not connected yet.</p>
      <Link to="/pricing" className={buttonClass('gold', 'mt-8')}>View packages</Link>
    </StubPage>
  )
}
