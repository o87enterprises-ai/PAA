import { Outlet } from 'react-router-dom'
import { CrisisBar } from '@/components/CrisisBar'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { MobileTabBar } from '@/components/MobileTabBar'
import { AccessibilityMenu } from '@/components/AccessibilityMenu'
import { ScrollToTop } from '@/components/ScrollToTop'

export function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <CrisisBar />
      <Navbar />
      <Outlet />
      <Footer />
      <MobileTabBar />
      <AccessibilityMenu />
    </>
  )
}
