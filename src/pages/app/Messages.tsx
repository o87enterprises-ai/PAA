import { StubPage } from '@/components/StubPage'
import { Button } from '@/components/ui/Button'

export function Messages() {
  return (
    <StubPage
      embedded
      label="Communication"
      title="Messages"
      intro="A calm, documented line to your advocate."
      emptyTitle="No messages yet"
      emptyBody="Conversations with your advocate will appear here, with a written record of every exchange."
      planned={[
        { title: 'Secure threads', body: 'Private conversations with your advocate, with attachments.' },
        { title: 'Notifications', body: 'Know when a reply arrives, without exposing details in the notification.' },
        { title: 'Export', body: 'Download a complete, dated record of any conversation.' },
      ]}
    >
      <h3 className="text-2xl">No messages yet</h3>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">Conversations with your advocate will appear here, with a written record of every exchange.</p>
      <Button disabled className="mt-8">
        New message
      </Button>
    </StubPage>
  )
}
