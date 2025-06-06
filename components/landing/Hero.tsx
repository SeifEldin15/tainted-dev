import Image from 'next/image'

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-4 text-gray-800 dark:text-white">
        Eclipse Proxy
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
        Leading Residential and Datacenter Proxies
      </p>
      
      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <a href="/pricing" className="bg-brand text-black px-6 sm:px-8 py-2 rounded-full tracking-wide text-sm sm:text-base hover:bg-[#00bfc9] transition-all duration-200 transform hover:scale-105">
          View Pricing
        </a>
        <a href="/dashboard" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-6 sm:px-8 py-2 rounded-full tracking-wide text-sm sm:text-base hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 border border-gray-200 dark:border-transparent">
          Dashboard
        </a>
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,169,180,0.2),_0_0_100px_rgba(0,169,180,0.1),_0_0_150px_rgba(0,169,180,0.2)] mt-6">
        <div className="hidden dark:block">
          <Image
            src="/placerholder-dashboard - Copy.png"
            alt="Eclipse Proxy Dashboard Dark"
            width={2400}
            height={1500}
            className="w-full h-auto object-cover"
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        </div>
        <div className="block dark:hidden">
          <Image
            src="/placerholder-dashboard.png"
            alt="Eclipse Proxy Dashboard Light"
            width={2400}
            height={1500}
            className="w-full h-auto object-cover"
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        </div>
      </div>
    </div>
  )
}
