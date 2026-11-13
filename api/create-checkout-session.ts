import type { VercelRequest, VercelResponse } from '@vercel/node'
import { stripe, getUser } from './_lib.js'

const PRICE_MAP: Record<string, string | undefined> = {
  toolkit: process.env.STRIPE_PRICE_TOOLKIT,
  pro: process.env.STRIPE_PRICE_PRO,
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const user = await getUser(req)
  if (!user) return res.status(401).json({ error: 'Please sign in first.' })

  const { tier } = req.body ?? {}
  const priceId = PRICE_MAP[tier]
  if (!priceId) return res.status(400).json({ error: 'Invalid tier' })

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    // The webhook uses these to know WHICH user paid for WHICH tier
    client_reference_id: user.id,
    customer_email: user.email ?? undefined,
    metadata: { tier, user_id: user.id },
    subscription_data: { metadata: { tier, user_id: user.id } },
    success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/pricing`,
    allow_promotion_codes: true,
  })

  res.json({ url: session.url })
}
