import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Tier } from '@/lib/types'

export function useSubscription() {
  const [tier, setTier] = useState<Tier>('free')
  const [signedIn, setSignedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (cancelled) return
      setSignedIn(!!user)
      if (!user) {
        setTier('free')
        setLoading(false)
        return
      }
      const { data } = await supabase
        .from('profiles')
        .select('subscription_tier')
        .eq('id', user.id)
        .single()
      if (cancelled) return
      setTier((data?.subscription_tier as Tier) ?? 'free')
      setLoading(false)
    }

    load()
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      load()
    })
    return () => {
      cancelled = true
      sub.subscription.unsubscribe()
    }
  }, [])

  const isPaid = tier === 'toolkit' || tier === 'pro' || tier === 'done_for_you'
  return { tier, isPaid, signedIn, loading }
}
