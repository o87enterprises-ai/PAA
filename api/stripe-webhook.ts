import type { VercelRequest, VercelResponse } from '@vercel/node'
import type Stripe from 'stripe'
import { stripe, admin, TIER_BY_PRICE } from './_lib.js'

// Stripe signature verification needs the exact raw bytes, so disable body parsing.
export const config = { api: { bodyParser: false } }

async function readRaw(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  return Buffer.concat(chunks)
}

async function setTierByCustomer(customerId: string, tier: string) {
  await admin.from('profiles').update({ subscription_tier: tier }).eq('stripe_customer_id', customerId)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const sig = req.headers['stripe-signature']
  if (typeof sig !== 'string') return res.status(400).send('Missing signature')

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(await readRaw(req), sig, process.env.STRIPE_WEBHOOK_SECRET ?? '')
  } catch {
    return res.status(400).send('Invalid signature')
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object as Stripe.Checkout.Session
        const userId = s.client_reference_id
        if (!userId) break

        if (s.mode === 'subscription') {
          const tier = s.metadata?.tier
          if (tier === 'toolkit' || tier === 'pro') {
            await admin
              .from('profiles')
              .update({
                subscription_tier: tier,
                stripe_customer_id: typeof s.customer === 'string' ? s.customer : s.customer?.id,
              })
              .eq('id', userId)
          }
        } else if (s.mode === 'payment' && s.payment_status === 'paid') {
          // Unique stripe_session_id makes webhook retries idempotent
          await admin.from('orders').upsert(
            {
              user_id: userId,
              stripe_session_id: s.id,
              product_id: s.metadata?.product_id ?? null,
              amount_cents: s.amount_total,
              status: 'paid',
            },
            { onConflict: 'stripe_session_id' },
          )
          // TODO: for product_type = 'pod', submit the order to Printful/Printify here.
        }
        break
      }
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id
        const active = sub.status === 'active' || sub.status === 'trialing'
        const tier = TIER_BY_PRICE[sub.items.data[0]?.price.id ?? '']
        await setTierByCustomer(customerId, active && tier ? tier : 'free')
        break
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await setTierByCustomer(typeof sub.customer === 'string' ? sub.customer : sub.customer.id, 'free')
        break
      }
    }
  } catch {
    // Non-2xx makes Stripe retry, which is what we want for transient DB errors
    return res.status(500).send('Handler error')
  }

  res.json({ received: true })
}
