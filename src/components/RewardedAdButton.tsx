import { useState } from 'react'
import { Verse8Ads } from '@verse8/ads'
import { Button } from '@/components/ui/Button'

export type Reward = 'unlock_guide' | 'ad_free_day' | 'extra_storage'

interface Props {
  placementId: string
  reward: Reward
  onReward: (reward: Reward) => void
  label?: string
}

export function RewardedAdButton({ placementId, reward, onReward, label }: Props) {
  const [busy, setBusy] = useState(false)
  const [unsupported, setUnsupported] = useState(false)
  const [hint, setHint] = useState<string | null>(null)

  // Hide the ad UI for the rest of the session if the environment can't show ads
  if (unsupported) return null

  async function handleClick() {
    setBusy(true)
    setHint(null)
    try {
      const result = await Verse8Ads.showRewarded({ placementId })
      switch (result.status) {
        case 'rewarded':
          onReward(reward)
          break
        case 'dismissed':
          setHint('Watch the full ad to earn the reward.')
          break
        case 'failed':
          if (result.error.code === 'unsupported_env') setUnsupported(true)
          else setHint('No ad is available right now. Please try again later.')
          break
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <Button onClick={handleClick} disabled={busy} variant="gold">
        {busy ? 'Loading ad…' : (label ?? 'Watch a short ad to unlock')}
      </Button>
      {hint && (
        <p role="status" className="mt-2 text-sm text-ink-soft">
          {hint}
        </p>
      )}
    </div>
  )
}
