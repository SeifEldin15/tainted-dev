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
    <div className="py-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2 text-gray-900">Top Proxy <span className="text-[#00D4E1] font-bold">Locations</span></h2>
        <p className="text-gray-600">Premium proxy IPs from 195 countries</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto px-4">
        {countries.map((country) => (
          <div key={country.name} className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
            <Image
              src={country.flag}
              alt={`${country.name} flag`}
              width={64}
              height={42}
              className="mb-2"
            />
            <h3 className="font-medium">{country.name}</h3>
            <p className="text-sm text-gray-600">{country.ipCount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
