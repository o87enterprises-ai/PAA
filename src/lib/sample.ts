/** SAMPLE DATA shown in the dashboard preview. Replaced by real records once the backend is connected. */
export const SAMPLE = {
  family: 'The Martinez Family',
  stats: [
    { label: 'Active Cases', value: '2' },
    { label: 'Documents', value: '18' },
    { label: 'Upcoming Meetings', value: '3' },
    { label: 'Goals Met', value: '7/10' },
  ],
  meetings: [
    { title: 'Annual IEP Review', when: 'Nov 21 · 10:00 AM', with: 'Advocate review call' },
    { title: 'Document Review Session', when: 'Nov 28 · 2:00 PM', with: 'Virtual' },
    { title: 'Progress Check-in', when: 'Dec 05 · 11:30 AM', with: 'Phone' },
  ],
  documents: [
    { name: 'Psychoeducational Evaluation.pdf', added: 'Nov 08', tag: 'Evaluation' },
    { name: 'IEP Draft v2.pdf', added: 'Nov 04', tag: 'IEP' },
    { name: 'Email to School Team.docx', added: 'Oct 29', tag: 'Letter' },
  ],
  goals: [
    { name: 'Reading fluency', pct: 80 },
    { name: 'Speech services minutes', pct: 55 },
    { name: 'Classroom accommodations', pct: 90 },
  ],
}
