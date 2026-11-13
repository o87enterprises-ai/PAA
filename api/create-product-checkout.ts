import type { VercelRequest, VercelResponse } from '@vercel/node'
import { stripe, admin, getUser } from './_lib.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const user = await getUser(req)
  if (!user) return res.status(401).json({ error: 'Please sign in first.' })

  const { productId } = req.body ?? {}
  if (typeof productId !== 'string') return res.status(400).json({ error: 'Missing productId' })

  // Price comes from the database, never from the client
  const { data: product } = await admin
    .from('products')
    .select('id,name,description,price_cents,product_type,stripe_price_id,is_active')
    .eq('id', productId)
    .single()

  if (!product || !product.is_active) return res.status(404).json({ error: 'Product not found' })
  if (product.product_type === 'affiliate') return res.status(400).json({ error: 'Not purchasable here' })

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      product.stripe_price_id
        ? { price: product.stripe_price_id, quantity: 1 }
        : {
            quantity: 1,
            price_data: {
              currency: 'usd',
              unit_amount: product.price_cents,
              product_data: { name: product.name, description: product.description ?? undefined },
            },
          },
    ],
    client_reference_id: user.id,
    customer_email: user.email ?? undefined,
    metadata: { product_id: product.id, user_id: user.id },
    ...(product.product_type === 'pod' ? { shipping_address_collection: { allowed_countries: ['US'] } } : {}),
    success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/marketplace`,
  })

  res.json({ url: session.url })
}
