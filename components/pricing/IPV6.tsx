import React from 'react';

const IPV6 = () => {
  const features = [
    'Unlimited Unique IPs',
    'US IPs',
    'IPv6 Forced',
    '/32 IPv6 Network',
    'Super Fast Response Time',
    'Session Support 3 Hours'
  ];

  const plans = [
    {
      threads: '100 Threads',
      pricing: [
        { duration: '1 Week', price: '5' },
        { duration: '1 Month', price: '19' },
        { duration: '3 Months', price: '49' }
      ]
    },
    {
      threads: '250 Threads',
      pricing: [
        { duration: '1 Week', price: '10' },
        { duration: '1 Month', price: '39' },
        { duration: '3 Months', price: '99' }
      ]
    },
    {
      threads: '500 Threads',
      pricing: [
        { duration: '1 Week', price: '20' },
        { duration: '1 Month', price: '79' },
        { duration: '3 Months', price: '199' }
      ]
    },
    {
      threads: '1000 Threads',
      pricing: [
        { duration: '1 Week', price: '30' },
        { duration: '1 Month', price: '109' },
        { duration: '3 Months', price: '299' }
      ]
    },
    {
      threads: '5000 Threads',
      pricing: [
        { duration: '1 Week', price: '50' },
        { duration: '1 Month', price: '199' },
        { duration: '3 Months', price: '499' }
      ]
    },
    {
      threads: 'Unlimited Threads',
      pricing: [
        { duration: '1 Week', price: '90' },
        { duration: '1 Month', price: '299' },
        { duration: '3 Months', price: '799' }
      ]
    }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 border border-gray-200 dark:border-transparent rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-6">
          <div className="bg-brand/10 p-1.5 rounded">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand">
              <path 
                d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <span className="text-brand text-sm font-medium px-3 py-1 rounded-full bg-brand/10">
              Residential IPv6 Proxies
            </span>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">Purchase an IPv6 Proxy Plan</h2>
          <p className="text-brand">Pick the length and thread limit you need</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-gray-900 dark:text-white">
              <div className="w-2 h-2 rounded-full bg-brand mr-2"></div>
              <span className="text-sm sm:text-base">{feature}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl text-brand font-semibold mb-3 sm:mb-4">{plan.threads}</h3>
              {plan.pricing.map((price, priceIndex) => (
                <button
                  key={priceIndex}
                  className="w-full bg-brand hover:bg-brand/90 transition py-2 sm:py-3 px-3 sm:px-4 mb-2 sm:mb-3 text-sm sm:text-base border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900"
                >
                  {price.duration} - {price.price}$
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IPV6;
