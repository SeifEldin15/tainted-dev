import Image from 'next/image'

interface Country {
  name: string;
  flag: string;
  ipCount: string;
}

const countries: Country[] = [
  { name: 'USA', flag: '/countries pngs/us2a.png', ipCount: '2,702,584 IPs' },
  { name: 'UK', flag: '/countries pngs/br.png', ipCount: '614,762 IPs' },
  { name: 'Canada', flag: '/countries pngs/canada.png', ipCount: '543,782 IPs' },
  { name: 'China', flag: '/countries pngs/china.png', ipCount: '1,210,872 IPs' },
  { name: 'France', flag: '/countries pngs/france.png', ipCount: '568,958 IPs' },
  { name: 'Germany', flag: '/countries pngs/germany.png', ipCount: '583,121 IPs' },
  { name: 'Australia', flag: '/countries pngs/au.png', ipCount: '220,543 IPs' },
  { name: 'Brazil', flag: '/countries pngs/brazil.png', ipCount: '364,104 IPs' },
  { name: 'India', flag: '/countries pngs/india.png', ipCount: '397,640 IPs' },
  { name: 'Japan', flag: '/countries pngs/japan.png', ipCount: '134,222 IPs' },
]

export default function Countries() {
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
          Top Proxy <span className="text-brand">Locations</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Premium proxy IPs from 195 countries</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
        {countries.map((country) => (
          <div 
            key={country.name} 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_0_22px_rgba(0,0,0,0.14)] dark:shadow-[0_0_22px_rgba(0,0,0,0.3)] p-6 
                     transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_15px_rgba(0,0,0,0.2)]
                     flex flex-col items-center justify-center group"
          >
            <div className="relative w-16 h-12 mb-4 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={country.flag}
                alt={`${country.name} flag`}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 64px) 100vw, 64px"
              />
            </div>
            <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">{country.name}</h3>
            <p className="text-brand font-medium">{country.ipCount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
