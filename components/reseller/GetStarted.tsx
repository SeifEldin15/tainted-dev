import Link from 'next/link'
import { MdMail, MdChat } from 'react-icons/md'
import { FaTelegramPlane, FaDiscord } from 'react-icons/fa'

const GetStarted = () => {
  return (
    <div className="relative w-full bg-gradient-to-br from-brand to-blue-600 py-6 sm:py-8 px-3 sm:px-4 rounded-2xl max-w-[320px] sm:max-w-[400px] md:max-w-[1200px] lg:max-w-[1200px] mx-auto mb-8">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4  mx-auto">
          Get Started with LightningProxies
          <br className="block sm:hidden" />
          Reseller Program
        </h1>
        
        <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 px-2">
          The most cost-effective and risk-free way to start a proxy business,
          <br className="hidden sm:block" />
          don't miss out on this opportunity.
        </p>

        <Link 
          href="/register" 
          className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
        >
          Get Started →
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 px-2">
          <Link href="mailto:support@lightningproxies.com" className="flex items-center gap-2 opacity-90 hover:opacity-100">
            <MdMail className="text-lg sm:text-xl" />
            <span className="text-sm sm:text-base">Mail to Us</span>
          </Link>
          <span className="opacity-50 hidden sm:block">•</span>
          <Link href="/telegram" className="flex items-center gap-2 opacity-90 hover:opacity-100">
            <FaTelegramPlane className="text-lg sm:text-xl" />
            <span className="text-sm sm:text-base">Telegram</span>
          </Link>
          <span className="opacity-50 hidden sm:block">•</span>
          <Link href="/discord" className="flex items-center gap-2 opacity-90 hover:opacity-100">
            <FaDiscord className="text-lg sm:text-xl" />
            <span className="text-sm sm:text-base">Discord</span>
          </Link>
          <span className="opacity-50 hidden sm:block">•</span>
          <Link href="/support" className="flex items-center gap-2 opacity-90 hover:opacity-100">
            <MdChat className="text-lg sm:text-xl" />
            <span className="text-sm sm:text-base">Live Chat</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
