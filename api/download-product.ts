import type { VercelRequest, VercelResponse } from '@vercel/node'
import { admin, getUser } from './_lib.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const user = await getUser(req)
  if (!user) return res.status(401).json({ error: 'Please sign in first.' })

  const { orderId } = req.body ?? {}
  if (typeof orderId !== 'string') return res.status(400).json({ error: 'Missing orderId' })

  const { data: order } = await admin
    .from('orders')
    .select('status,user_id,products(product_type,file_url)')
    .eq('id', orderId)
    .single()

  const product = Array.isArray(order?.products) ? order?.products[0] : order?.products
  if (!order || order.user_id !== user.id || order.status !== 'paid' || !product?.file_url) {
    return res.status(403).json({ error: 'No paid download found for this order.' })
  }

  // file_url is a path inside the PRIVATE "products" bucket; link is valid for 5 minutes
  const { data, error } = await admin.storage.from('products').createSignedUrl(product.file_url, 300)
  if (error || !data) return res.status(500).json({ error: 'Could not create download link.' })

  res.json({ url: data.signedUrl })
}
