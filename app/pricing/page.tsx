"use client"

import IPV4 from '@/components/pricing/IPV4'
import IPV6 from '@/components/pricing/IPV6'
import IPV4Plan from '@/components/pricing/IPV4Plan'

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#00D4E1]">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="text-[#00D4E1]">Affordable Prices</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Pricing Plans</h1>
      </div>
      
      <IPV4 />
      <IPV6 />
      <IPV4Plan />
    </div>
  )
}
