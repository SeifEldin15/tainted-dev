import Image from 'next/image'

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-4 text-gray-800">
        Eclipse Proxy
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        Leading Residential and Datacenter Proxies
      </p>
      
      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <button className="bg-[#00D4E1] text-white px-6 sm:px-8 py-2 rounded-full tracking-wide text-sm sm:text-base hover:bg-[#00bfc9] transition-all duration-200 transform hover:scale-105">
          View Pricing
        </button>
        <button className="bg-white text-gray-800 px-6 sm:px-8 py-2 rounded-full tracking-wide text-sm sm:text-base hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 border border-gray-200">
          Dashboard
        </button>
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-xl shadow-[0_0_40px_rgba(96,165,250,0.5)] mt-6">
        <Image
          src="/placerholder-dashboard.png"
          alt="Eclipse Proxy Dashboard"
          width={1600}
          height={1000}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 800px"
          priority
        />
      </div>
    </div>
  )
}
