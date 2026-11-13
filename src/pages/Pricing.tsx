import { Gem } from '@/lib/icons'
import { PageHeader } from '@/components/PageHeader'
import { PricingSection } from '@/components/PricingSection'

export function Pricing() {
  return (
    <main>
      <PageHeader
        badge="Transparent Pricing"
        icon={Gem}
        title={
          <>
            Investment in Your <span className="text-gold">Child’s Success</span>
          </>
        }
        intro="Choose the perfect package for your family’s unique advocacy needs. All plans include our advanced technology platform access."
      />
      <PricingSection showHeading={false} />
    </main>
  )
}
