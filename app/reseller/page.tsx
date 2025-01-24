'use client'
import Hero from '@/components/reseller/Hero'
import Features from '@/components/reseller/Features'
import Join from '@/components/reseller/Join'
import Features2 from '@/components/reseller/Features2'
import GetStarted from '@/components/reseller/GetStarted'
import Header from '@/components/Header'
import Footer from '@/components/landing/footer'

export default function ResellerPage() {
  return (
    <main className="bg-white dark:bg-gray-900">
      <Header />
      <Hero />
      <Features />
      <Join />
      <Features2 />
      <GetStarted />
      <Footer />
    </main>
  )
}
