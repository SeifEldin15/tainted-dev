import React from 'react';

const IPV4 = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-6">
      <div className="bg-white p-4 sm:p-8 border border-gray-200 rounded-lg">
        <div className="mb-4">
          <span className="text-[#00D4E1] text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full bg-[#00D4E1]/10">
            Residential IPv4 Proxies
          </span>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
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
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Purchase IPv4 Residential Proxies</h3>
              <p className="text-sm sm:text-base text-gray-600">Pay for as much bandwidth as you'll use.</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-full w-[10%] bg-[#00D4E1] rounded-full"></div>
            </div>
            <span className="text-sm text-gray-600 mt-1">1 GB</span>
          </div>

          <ul className="space-y-2 sm:space-y-3 mb-6">
            {[
              'Unlimited Threads',
              '10 Million+ Unique IPs Globally',
              'High Network Speeds',
              '190+ Countries',
              'Reliable Connections',
              'Data Never Expires',
              'Sticky Sessions up to 24 Hours',
              'Authenticated & IP Whitelist'
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" fill="#00D4E1" fillOpacity="0.1"/>
                  <circle cx="10" cy="10" r="3" fill="#00D4E1"/>
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Estimate Price:</p>
              <div className="flex items-baseline text-gray-900">
                <span className="text-xl sm:text-2xl font-bold">$</span>
                <span className="text-2xl sm:text-3xl font-bold">1.75</span>
                <span className="text-xs sm:text-sm text-gray-500 ml-1">USD</span>
              </div>
            </div>
            <button className="w-full sm:w-auto bg-[#00D4E1] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-[#00D4E1]/90 transition-colors">
              Login to buy →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPV4;
