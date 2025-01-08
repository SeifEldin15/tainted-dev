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
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <div className="bg-white p-4 sm:p-8 border border-gray-200 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-6">
          <div className="bg-[#00D4E1]/10 p-1.5 rounded">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#00D4E1]">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path 
                d="M7 13h2m2 0h2m-6-3h10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <span className="text-[#00D4E1] text-sm font-medium px-3 py-1 rounded-full bg-[#00D4E1]/10">
              Residential IPv4 Proxies
            </span>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">Purchase an IPv4 Proxy Plan</h2>
          <p className="text-[#00D4E1]">Pick the length and thread limit you need</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00D4E1] rounded-full"></div>
              <span className="text-gray-900">{feature}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="border border-gray-200 bg-white rounded-lg p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl text-cyan-400 mb-3 sm:mb-4">{plan.threads} Threads</h3>
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full py-2 px-3 sm:px-4 text-sm sm:text-base rounded border border-gray-200 text-gray-900 transition hover:bg-gray-50">
                  1 Day - ${plan.pricing.day}
                </button>
                <button className="w-full py-2 px-3 sm:px-4 text-sm sm:text-base rounded border border-gray-200 text-gray-900 transition hover:bg-gray-50">
                  1 Week - ${plan.pricing.week}
                </button>
                <button className="w-full py-2 px-3 sm:px-4 text-sm sm:text-base rounded border border-gray-200 text-gray-900 transition hover:bg-gray-50">
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
