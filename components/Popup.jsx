"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BottomBanner() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(() => {
    // Check localStorage on initial render
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bottomBannerClosed') !== 'true'
    }
    return true
  })

  useEffect(() => {
    setMounted(true)
    const bannerClosed = localStorage.getItem('bottomBannerClosed') === 'true'
    setIsVisible(!bannerClosed)
  }, [])

  if (!mounted) return null
  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    // Save the user's choice to localStorage
    localStorage.setItem('bottomBannerClosed', 'true')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-gray-800 p-4">
      <div className="mx-auto max-w-screen-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto text-center sm:text-left">
          <div className="bg-brand rounded-full p-3 w-10 h-10 flex items-center justify-center shrink-0">
            <span className="text-gray-100 text-xl">✷</span>
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <span className="font-semibold">Experience 10GB of Residential Proxies for $1</span>
            <span className="text-sm text-gray-400">
              Start with 10GB for $1. Plan renews at $50/month after the trial.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 w-full sm:w-auto justify-center sm:justify-end">
          <Button variant="default" className="text-black bg-brand hover:bg-brand/90 dark:bg-brand dark:text-black dark:hover:bg-brand/90">
            Claim my $1 trial
          </Button>
          <Button variant="ghost" size="icon" className="shrink-0" onClick={handleClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close banner</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

