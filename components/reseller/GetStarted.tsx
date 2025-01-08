import Link from 'next/link'
import { MdMail, MdChat } from 'react-icons/md'
import { FaTelegramPlane, FaDiscord } from 'react-icons/fa'

const GetStarted = () => {
  return (
    <div className="relative w-full bg-gradient-to-br from-[#00D4E1] to-blue-600 py-8 px-4 rounded-2xl max-w-[1200px] mx-auto mb-8">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get Started with LightningProxies
          <br />
          Reseller Program
        </h1>
        
        <p className="text-lg mb-8 opacity-90">
          The most cost-effective and risk-free way to start a proxy business,
          <br />
          don't miss out on this opportunity.
        </p>

        <Link 
          href="/register" 
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
        >
          Get Started →
        </Link>

        <div className="flex items-center justify-center gap-8 mt-12">
          <Link href="mailto:support@lightningproxies.com" className="flex items-center gap-2 opacity-90 hover:opacity-100">
            <MdMail className="text-xl" />
            Mail to Us
          </Link>
          <span className="opacity-50">•</span>
          <Link href="/telegram" className="flex items-center gap-2 opacity-90 hover:opacity-100">
            <FaTelegramPlane className="text-xl" />
            Telegram
          </Link>
          <span className="opacity-50">•</span>
          <Link href="/discord" className="flex items-center gap-2 opacity-90 hover:opacity-100">
            <FaDiscord className="text-xl" />
            Discord
          </Link>
          <span className="opacity-50">•</span>
          <Link href="/support" className="flex items-center gap-2 opacity-90 hover:opacity-100">
            <MdChat className="text-xl" />
            Live Chat
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
