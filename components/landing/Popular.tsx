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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 text-center">Most popular <span className="text-[#00D4E1] font-bold">proxy locations</span></h2>
        <p className="text-gray-600 mb-8 max-w-2xl text-center mx-auto">
          Choose genuine and exclusive residential proxies, ethically sourced and compliant IPs,
          across more than 120 locations worldwide.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full place-items-center">
          {locations.map((location) => (
            <div key={location.country} className="flex items-center space-x-3">
              <div className="w-8 h-8 relative">
                <Image
                  src={location.flag}
                  alt={`${location.country} flag`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <div className="font-medium text-gray-900">{location.country}</div>
                <div className="text-sm text-gray-500">{location.ips}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
