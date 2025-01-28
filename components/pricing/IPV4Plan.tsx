import React from 'react';

const IPV4Plan = () => {
  const features = [
    "Unlimited Bandwidth",
    "Super Fast Response Time",
    "User/Password or IP Auth",
    "US IPs",
    "Large Proxy Pool",
    "Sticky Session Support"
  ];

  const plans = [
    {
      threads: 400,
      pricing: {
        day: "3.49",
        week: "23.25",
        month: "89"
      }
    },
    {
      threads: 500,
      pricing: {
        day: "4.29",
        week: "29",
        month: "109"
      }
    },
    {
      threads: 1000,
      pricing: {
        day: "7.99",
        week: "53",
        month: "199"
      }
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
              Residential IPv4 Proxies
            </span>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">Purchase an IPv4 Proxy Plan</h2>
          <p className="text-brand">Pick the length and thread limit you need</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand rounded-full"></div>
              <span className="text-gray-900 dark:text-white">{feature}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl text-brand font-semibold mb-3 sm:mb-4">{plan.threads} Threads</h3>
              <div className="space-y-2 sm:space-y-3">
                <button className="bg-brand hover:bg-brand/90 transition w-full py-2 px-3 sm:px-4 text-sm sm:text-base rounded border border-gray-200 dark:border-gray-600 text-gray-900">
                  1 Day - ${plan.pricing.day}
                </button>
                <button className="w-full py-2 bg-brand hover:bg-brand/90 transition px-3 sm:px-4 text-sm sm:text-base rounded border border-gray-200 dark:border-gray-600 text-gray-900">
                  1 Week - ${plan.pricing.week}
                </button>
                <button className="w-full py-2 bg-brand hover:bg-brand/90 transition px-3 sm:px-4 text-sm sm:text-base rounded border border-gray-200 dark:border-gray-600 text-gray-900">
                  1 Month - ${plan.pricing.month}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IPV4Plan;
