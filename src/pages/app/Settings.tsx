import { StubPage } from '@/components/StubPage'

export function Settings() {
  return (
    <StubPage
      embedded
      label="Settings"
      title="Account settings"
      intro="Your details and notification preferences."
      emptyTitle="Settings arrive with your account"
      emptyBody="Sign in to manage your profile and notifications."
      planned={[
        { title: 'Profile', body: 'Name and contact details.' },
        { title: 'Children', body: 'Add each child so records stay organized.' },
        { title: 'Notifications', body: 'Choose email reminders for meetings and deadlines.' },
        { title: 'Privacy', body: 'Export or delete your data.' },
      ]}
    />
  )
}
