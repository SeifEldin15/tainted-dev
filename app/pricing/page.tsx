"use client"

import IPV4 from '@/components/pricing/IPV4'
import IPV6 from '@/components/pricing/IPV6'
import IPV4Plan from '@/components/pricing/IPV4Plan'
import Contact from '@/components/pricing/Contact'
import Header from '@/components/Header'
import Footer from '@/components/landing/footer'

export default function PricingPage() {
  return (
    <>
      <Header />
      <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="text-brand">Affordable Prices</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Pricing Plans</h1>
        </div>
        
        <div id="ipv4">
          <IPV4 />
        </div>
        <div id="ipv6">
          <IPV6 />
        </div>
        <div id="ipv4-plans">
          <IPV4Plan />
        </div>
        <Contact />
      </div>
      <Footer />
      </div>
    </>
  )
}
