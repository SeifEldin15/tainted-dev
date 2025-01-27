"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BottomBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-gray-800 p-4">
      <div className="mx-auto max-w-screen-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-brand rounded-full p-3 w-10 h-10 flex items-center justify-center">
            <span className="text-gray-100 text-xl">✷</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="font-semibold">Experience 10GB of Residential Proxies for $1</span>
            <span className="text-sm text-gray-400">
              Start with 10GB for $1. Plan renews at $50/month after the trial.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="default" className="text-black bg-brand hover:bg-brand/90 dark:bg-brand  dark:hover:bg-brand/90">
            Claim my $1 trial
          </Button>
          <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setIsVisible(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only ">Close banner</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

