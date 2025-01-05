import Image from 'next/image'

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-8xl font-bold mb-4 text-gray-800">
        Eclipse Proxy
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Leading Residential and Datacenter Proxies
      </p>
      
      {/* Call to Action Buttons */}
      <div className="flex gap-4 mb-12">
        <button className="bg-blue-600 text-white px-8 py-2 rounded-full tracking-wide text-base hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50">
          View Pricing
        </button>
        <button className="bg-white text-gray-800 px-8 py-2 rounded-full tracking-wide text-base hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 border border-gray-200 shadow-lg hover:shadow-gray-300/50">
          Dashboard
        </button>
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-xl shadow-[0_0_40px_rgba(96,165,250,0.5)]  mt-6">
        <Image
          src="/placerholder-dashboard.png"
          alt="Eclipse Proxy Dashboard"
          width={800}
          height={500}
          className="w-full"
          priority
        />
      </div>
    </div>
  )
}
