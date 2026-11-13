import { useState, type FormEvent } from 'react'
import { Mail, MapPin, MessageSquare, Phone } from '@/lib/icons'
import { PageHeader } from '@/components/PageHeader'
import { IconTile } from '@/components/ui/IconTile'
import { Button } from '@/components/ui/Button'
import { CONTACT } from '@/lib/content'

export function Contact() {
  const [notice, setNotice] = useState(false)
  function onSubmit(e: FormEvent) {
    e.preventDefault()
    // STUB: no backend yet. Be honest rather than pretend it was sent.
    setNotice(true)
  }
  const info = [
    { icon: Mail, label: 'Email', value: CONTACT.email },
    { icon: Phone, label: 'Phone', value: CONTACT.phone },
    { icon: MapPin, label: 'Location', value: CONTACT.location },
  ]
  return (
    <main>
      <PageHeader badge="Contact" icon={MessageSquare} title={<>We’re here to <span className="text-gold">help</span></>} intro="Send us a note and we will respond within one business day." />
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-[1fr_1.4fr]">
        <ul className="space-y-8">
          {info.map((i) => (
            <li key={i.label} className="flex items-center gap-5">
              <IconTile icon={i.icon} tone="gold" />
              <span><span className="eyebrow block text-gold-deep">{i.label}</span>{i.value}</span>
            </li>
          ))}
        </ul>
        <form onSubmit={onSubmit} className="space-y-8 border border-gold/40 bg-paper-warm p-8">
          <label className="block"><span className="eyebrow text-ink-soft">Name</span><input name="name" autoComplete="name" className="field mt-1" /></label>
          <label className="block"><span className="eyebrow text-ink-soft">Email</span><input name="email" type="email" autoComplete="email" className="field mt-1" /></label>
          <label className="block"><span className="eyebrow text-ink-soft">Message</span><textarea name="message" rows={5} className="field mt-1 resize-y" /></label>
          <Button type="submit">Send message</Button>
          {notice && <p role="status" className="text-ink-soft">The contact form is not connected yet, so nothing was sent. Please email or call us directly.</p>}
        </form>
      </div>
    </main>
  )
}
