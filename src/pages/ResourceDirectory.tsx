import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { ResourceCard } from '@/components/ResourceCard'
import { Library } from '@/lib/icons'
import { PageHeader } from '@/components/PageHeader'
import type { Resource } from '@/lib/types'

const CATEGORIES = [
  { key: 'mental_health', label: 'Mental Health' },
  { key: 'basic_needs', label: 'Basic Needs' },
  { key: 'substance_use', label: 'Substance Use' },
  { key: 'legal_advocacy', label: 'Legal & Advocacy' },
  { key: 'education', label: 'Education' },
  { key: 'crisis', label: 'Crisis' },
]

const STATES = ['CA', 'TX', 'NY', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI']

export function ResourceDirectory() {
  const [state, setState] = useState('')
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')

  const { data: resources = [], isLoading, error } = useQuery({
    queryKey: ['resources', state, category, search],
    queryFn: async (): Promise<Resource[]> => {
      let q = supabase.from('resources').select('*').limit(100)
      if (state) q = q.eq('state', state)
      if (category) q = q.eq('category', category)
      if (search) q = q.textSearch('name', search, { type: 'websearch' })
      const { data, error } = await q.order('is_verified', { ascending: false })
      if (error) throw error
      return (data ?? []) as Resource[]
    },
  })

  return (
    <main>
      <PageHeader
        badge="Resource Directory"
        icon={Library}
        title={
          <>
            Find resources <span className="text-gold">near you</span>
          </>
        }
        intro="Verified organizations are listed first."
      />
      <div className="mx-auto max-w-4xl px-6 py-20">

      <div className="grid gap-8 sm:grid-cols-[1fr_1fr_2fr]">
        <label className="block">
          <span className="eyebrow text-ink-soft">State</span>
          <select value={state} onChange={(e) => setState(e.target.value)} className="field mt-1">
            <option value="">All states</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="eyebrow text-ink-soft">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="field mt-1">
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="eyebrow text-ink-soft">Search by name</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="field mt-1 placeholder:text-disabled" />
        </label>
      </div>

      <div className="mt-16">
        {isLoading ? (
          <p className="text-ink-soft">Loading…</p>
        ) : error ? (
          <p role="alert" className="text-ink-soft">
            We couldn’t load resources. If you’re offline, previously viewed results may still appear.
          </p>
        ) : resources.length === 0 ? (
          <p className="border-t border-line pt-8 text-ink-soft">No resources match your filters yet.</p>
        ) : (
          resources.map((r) => <ResourceCard key={r.id} resource={r} />)
        )}
      </div>
      </div>
    </main>
  )
}
