import Image from 'next/image'

interface LocationData {
  country: string
  ips: string
  flag: string
}

const locations: LocationData[] = [
  {
    country: 'US',
    ips: '9,967,104 IPs',
    flag: '/countries/us.svg'
  },
  {
    country: 'UK',
    ips: '3,260,554 IPs',
    flag: '/countries/gb.svg'
  },
  {
    country: 'Germany',
    ips: '3,221,909 IPs',
    flag: '/countries/de.svg'
  },
  {
    country: 'France',
    ips: '2,661,413 IPs',
    flag: '/countries/fr.svg'
  },
  {
    country: 'Australia',
    ips: '1,018,618 IPs',
    flag: '/countries/au.svg'
  },
  {
    country: 'China',
    ips: '4,757,236 IPs',
    flag: '/countries/cn.svg'
  },
  {
    country: 'Brazil',
    ips: '3,746,440 IPs',
    flag: '/countries/br.svg'
  },
  {
    country: 'Finland',
    ips: '31,354 IPs',
    flag: '/countries/fi.svg'
  }
]

export default function Popular() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Most Popular <span className="text-brand">Proxy Locations</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Choose genuine and exclusive residential proxies, ethically sourced and compliant IPs,
            across more than 120 locations worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {locations.map((location) => (
            <div 
              key={location.country} 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_0_22px_rgba(0,0,0,0.14)] dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] p-6
                       transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,0,0,0.12)]
                       flex items-center space-x-4 group"
            >
              <div className="w-12 h-12 relative transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={location.flag}
                  alt={`${location.country} flag`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <div className="font-semibold text-lg text-gray-900 dark:text-white">{location.country}</div>
                <div className="text-brand font-medium">{location.ips}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
