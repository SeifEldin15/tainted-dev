import { CalendarDays, Network, Wallet, ShoppingCart } from 'lucide-react'

export default function Join() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center">
          <p className="text-base font-semibold text-brand uppercase">
            GETTING STARTED
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How to join LightningProxies Reseller Program?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Follow these simple steps to start your reselling journey with us
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 relative">
          {steps.map((step, index) => (
            <div key={step.name} className="relative flex flex-col items-center text-center">
              {/* Arrow between cards (except for last card) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                    <path d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.39339C28.9289 0.807609 27.9792 0.807609 27.3934 1.39339C26.8076 1.97917 26.8076 2.92892 27.3934 3.51471L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z" fill="#00D4E1"/>
                  </svg>
                </div>
              )}
              
              {/* Card content */}
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-brand/10 mb-4">
                  <step.icon className="w-8 h-8 text-brand" aria-hidden="true" />
                </div>
                <div className="text-brand font-semibold mb-2">
                  {step.number}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {step.name}
                </h3>
                <p className="text-base text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const steps = [
  {
    number: '01',
    name: 'Contact our support team',
    description: 'Contact our support team for details.',
    icon: CalendarDays,
  },
  {
    number: '02',
    name: 'Get API Access',
    description: 'Get access to our fully Dedicated Reselling API.',
    icon: Network,
  },
  {
    number: '03',
    name: 'Recharge Balance',
    description: 'Recharge balance on the Reseller Panel provided.',
    icon: Wallet,
  },
  {
    number: '04',
    name: 'Start Reselling',
    description: 'Start reselling our proxies and earn stress-free.',
    icon: ShoppingCart,
  },
]
