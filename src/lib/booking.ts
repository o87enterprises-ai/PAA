import { z } from 'zod'

export const bookingSchema = z.object({
  service: z.string().min(1, 'Please choose a service.'),
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.email('Please enter a valid email address.'),
  phone: z.string().trim().max(30).optional(),
  date: z.string().optional(),
  notes: z.string().trim().max(1500, 'Please keep this under 1,500 characters.').optional(),
  consent: z.literal(true, { error: 'Please confirm you are happy for us to contact you.' }),
})

export type BookingInput = z.infer<typeof bookingSchema>

/**
 * STUB. Nothing is sent anywhere yet (frontend design review comes first).
 * To connect: add POST /api/booking that re-validates with bookingSchema, stores the
 * request in a private table, notifies the team, and optionally creates a Stripe checkout.
 */
export const BOOKING_CONNECTED = false

export async function submitBooking(_input: BookingInput): Promise<{ ok: boolean }> {
  if (!BOOKING_CONNECTED) return { ok: false }
  throw new Error('Not implemented')
}
