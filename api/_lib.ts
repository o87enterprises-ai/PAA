import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import type { VercelRequest } from '@vercel/node'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '')

/** Service-role client: server only, bypasses RLS. Never import this from /src. */
export const admin = createClient(
  process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } },
)

/** Resolve the signed-in user from the "Authorization: Bearer <jwt>" header. */
export async function getUser(req: VercelRequest) {
  const header = req.headers.authorization ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return null
  const { data, error } = await admin.auth.getUser(token)
  return error ? null : data.user
}

export const TIER_BY_PRICE: Record<string, 'toolkit' | 'pro'> = {
  ...(process.env.STRIPE_PRICE_TOOLKIT ? { [process.env.STRIPE_PRICE_TOOLKIT]: 'toolkit' as const } : {}),
  ...(process.env.STRIPE_PRICE_PRO ? { [process.env.STRIPE_PRICE_PRO]: 'pro' as const } : {}),
}
