import { z } from 'zod'

export const CONCERNS = [
  { key: 'mental_health', label: 'Mental health' },
  { key: 'education', label: 'Education and school support' },
  { key: 'basic_needs', label: 'Housing, food or basic needs' },
  { key: 'substance_use', label: 'Substance use' },
  { key: 'legal_advocacy', label: 'Legal and advocacy' },
  { key: 'other', label: 'Something else' },
] as const

export const assessmentSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.email('Please enter a valid email address.'),
  concern: z.string().min(1, 'Please choose the area closest to your concern.'),
  details: z.string().trim().max(1500, 'Please keep this under 1,500 characters.').optional(),
  consent: z.literal(true, { error: 'Please confirm you are happy for us to contact you.' }),
})

export type AssessmentInput = z.infer<typeof assessmentSchema>

/**
 * STUB. Nothing is sent anywhere yet.
 *
 * To connect: create POST /api/assessment (validate with assessmentSchema again
 * server-side, store in a private table readable only with the service role,
 * and notify the team), flip ASSESSMENT_CONNECTED, and have this function
 * fetch that endpoint. Assessment answers can describe a child's health or
 * circumstances, so add a privacy notice before going live.
 */
export const ASSESSMENT_CONNECTED = false

export async function submitAssessment(_input: AssessmentInput): Promise<{ ok: boolean }> {
  if (!ASSESSMENT_CONNECTED) return { ok: false }
  throw new Error('Not implemented')
}
