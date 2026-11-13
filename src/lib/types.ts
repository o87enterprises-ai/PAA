export type Tier = 'free' | 'toolkit' | 'pro' | 'done_for_you'

export interface Resource {
  id: string
  name: string
  description: string | null
  category: string
  subcategory: string | null
  state: string | null
  city: string | null
  address: string | null
  phone: string | null
  website: string | null
  email: string | null
  hours: string | null
  languages: string[] | null
  is_verified: boolean
  listing_tier: 'free' | 'verified' | 'premier' | 'sponsor'
}

export interface Product {
  id: string
  name: string
  description: string | null
  price_cents: number
  product_type: 'digital' | 'pod' | 'affiliate' | null
  image_url: string | null
}
