import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          {/* Left Column */}
          <div className="max-w-xl lg:max-w-lg">
            <p className="text-base font-semibold leading-7 text-brand">
              LIGHTNINGPROXIES RESELLER PROGRAM
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
              Your <span className="text-brand">Proxy Partnership:</span>
              <br />
              LightningProxies
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Optimized and Secure Proxy Network, LightningProxies offers a White
              Label Reselling Program, allowing anyone to effortlessly start or
              expand their proxy business with minimal investments and zero risk
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/get-started"
                className="rounded-md bg-brand px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#00bfc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Get Started →
              </Link>
              <Link
                href="/learn-more"
                className="text-sm font-semibold leading-6 text-black dark:text-white"
              >
                Learn More
              </Link>
            </div>
            
            {/* Features List */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                'No investments',
                'Zero risk',
                'Stress-free',
                'Passive Income',
                'Whitelabel Solutions',
                'Popular Products',
              ].map((feature) => (
                <div key={feature} className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-none text-brand"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <img
              src="/server2.jpg"
              alt="Team collaboration illustration"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
