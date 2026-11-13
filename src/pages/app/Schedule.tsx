import { StubPage } from '@/components/StubPage'
import { Button } from '@/components/ui/Button'

export function Schedule() {
  return (
    <StubPage
      embedded
      label="Scheduling"
      title="Schedule"
      intro="Meetings and deadlines, never missed."
      emptyTitle="Nothing scheduled"
      emptyBody="Add meetings, review dates and follow-ups, and we will remind you ahead of time."
      planned={[
        { title: 'Calendar', body: 'Month and list views of every appointment and deadline.' },
        { title: 'Reminders', body: 'Email and push reminders before each date.' },
        { title: 'Calendar sync', body: 'Add events to Google or Apple Calendar.' },
        { title: 'Meeting notes', body: 'Attach notes and documents to each appointment.' },
      ]}
    >
      <h3 className="text-2xl">Nothing scheduled</h3>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">Add meetings, review dates and follow-ups, and we will remind you ahead of time.</p>
      <Button disabled className="mt-8">
        Add an appointment
      </Button>
    </StubPage>
  )
}
