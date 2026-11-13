import { Routes, Route } from 'react-router-dom'
import { SiteLayout } from '@/layouts/SiteLayout'
import { AppShell } from '@/layouts/AppShell'
import { Home } from '@/pages/Home'
import { ResourceDirectory } from '@/pages/ResourceDirectory'
import { Pricing } from '@/pages/Pricing'
import { Marketplace } from '@/pages/Marketplace'
import { Login } from '@/pages/Login'
import { Success } from '@/pages/Success'
import { Assessment } from '@/pages/Assessment'
import { Rights } from '@/pages/Rights'
import { Overview } from '@/pages/app/Overview'
import { Documents } from '@/pages/app/Documents'
import { Schedule } from '@/pages/app/Schedule'
import { Messages } from '@/pages/app/Messages'
import { Progress } from '@/pages/app/Progress'
import { Billing } from '@/pages/app/Billing'
import { Settings } from '@/pages/app/Settings'
import { Services } from '@/pages/Services'
import { Book } from '@/pages/Book'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { Careers } from '@/pages/Careers'
import { Learn } from '@/pages/Learn'
import { Privacy, Terms } from '@/pages/Legal'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book" element={<Book />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/learn/:topic" element={<Learn />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/resources" element={<ResourceDirectory />} />
        <Route path="/rights" element={<Rights />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        {/* Signed-in area */}
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Overview />} />
          <Route path="documents" element={<Documents />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="messages" element={<Messages />} />
          <Route path="progress" element={<Progress />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  )
}
