import React from 'react';
import { 
  HiChartBar, 
  HiLightBulb, 
  HiAdjustmentsHorizontal, 
  HiArrowPath, 
  HiCurrencyDollar, 
  HiSquares2X2 
} from 'react-icons/hi2';

const Features = () => {
  const features = [
    {
      icon: <HiChartBar className="w-6 h-6 text-[#00D4E1]" />,
      title: 'Set Your Own Pricing',
      description: 'That\'s right! We offer you the ability to set your own pricing, be it lower or higher, depending on your marketing strategy.'
    },
    {
      icon: <HiLightBulb className="w-6 h-6 text-[#00D4E1]" />,
      title: 'World-Class Support',
      description: 'Your success is our success. We are your proxy partner!'
    },
    {
      icon: <HiAdjustmentsHorizontal className="w-6 h-6 text-[#00D4E1]" />,
      title: 'Optimized For Resellers',
      description: 'Great pricing and bug-free APIs, the dream of any proxy reseller.'
    },
    {
      icon: <HiArrowPath className="w-6 h-6 text-[#00D4E1]" />,
      title: 'Popular Products',
      description: 'Residential and Datacenter Proxies are the most popular proxy products, among IPv6 and ISP'
    },
    {
      icon: <HiCurrencyDollar className="w-6 h-6 text-[#00D4E1]" />,
      title: 'Fully API Integration',
      description: 'Complete freedom to create your own proxy service.'
    },
    {
      icon: <HiSquares2X2 className="w-6 h-6 text-[#00D4E1]" />,
      title: 'White-label Solutions',
      description: 'Reseller our Proxies under your brand name, no involvement from our side.'
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center">
          <p className="text-base font-semibold text-[#00D4E1] uppercase">
            ESSENTIAL KEY FEATURES
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Start your Proxy Business with our Reseller Program.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Perfectly tailored for partners looking to launch their proxy network or expand it by offering a range of new products to their audience.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#00D4E1]/10">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
              </div>
              <p className="mt-2 text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
