import { StubPage } from '@/components/StubPage'
import { Button } from '@/components/ui/Button'

export function Documents() {
  return (
    <StubPage
      embedded
      label="Document management"
      title="Documents"
      intro="Every record in one private place."
      emptyTitle="No documents yet"
      emptyBody="Upload reports, evaluations and correspondence to keep them organized and searchable."
      planned={[
        { title: 'Secure upload', body: 'PDF, image and Word files stored privately in your account (Supabase Storage, per-user folders).' },
        { title: 'Folders and tags', body: 'Group records by child, school, provider or year.' },
        { title: 'Search', body: 'Find any page by keyword across everything you have stored.' },
        { title: 'Storage limits', body: 'Free plan has a storage allowance; paid plans are unlimited.' },
      ]}
    >
      <h3 className="text-2xl">No documents yet</h3>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">Upload reports, evaluations and correspondence to keep them organized and searchable.</p>
      <Button disabled className="mt-8">
        Upload a document
      </Button>
    </StubPage>
  )
}
