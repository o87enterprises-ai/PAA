import { StubPage } from '@/components/StubPage'

export function Progress() {
  return (
    <StubPage
      embedded
      label="Progress visualization"
      title="Progress"
      intro="See change over time."
      emptyTitle="No goals yet"
      emptyBody="Set goals and record milestones, and progress will be drawn here so it is easy to see and to explain."
      planned={[
        { title: 'Goals', body: 'Define what matters and break it into measurable steps.' },
        { title: 'Timeline', body: 'A dated record of milestones, meetings and outcomes.' },
        { title: 'Charts', body: 'Simple charts that show direction at a glance, ready to share with a school or provider.' },
      ]}
    />
  )
}
