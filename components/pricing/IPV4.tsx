import React from 'react';
import { Slider } from "@/components/ui/slider";
import { getCoreResiProxyPrice } from "@/constants/functions";

const IPV4 = () => {
  const [value, setValue] = React.useState<any>(1);

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 border border-gray-200 dark:border-transparent rounded-lg">
        <div className="mb-4">
          <span className="text-brand text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full bg-brand/10">
            Residential IPv4 Proxies
          </span>
        </div>

        <div className="border border-gray-200 dark:border-transparent rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
            <div className="bg-brand/10 p-1.5 rounded">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand">
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
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Purchase IPv4 Residential Proxies
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Pay for as much bandwidth as you'll use.
              </p>
            </div>
          </div>

          <div className="relative py-8">
            <Slider
              defaultValue={[value]}
              min={1}
              max={500}
              step={1}
              onValueChange={(val: any) => setValue(val?.[0])}
              className="[&_.relative]:bg-gray-200 [&_[data-orientation=horizontal]>.bg-primary]:bg-brand [&_[role=slider]]:bg-brand [&_[role=slider]]:border-brand"
            />
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
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Estimate Price:</p>
              <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-xl sm:text-2xl font-bold">$</span>
                <span className="text-2xl sm:text-3xl font-bold">{getCoreResiProxyPrice(Number(value))}</span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-1">USD</span>
              </div>
            </div>
            <a href="/dashboard" className="w-full sm:w-auto bg-brand text-black px-4 sm:px-6 py-2 rounded-lg hover:bg-brand/90 transition-colors">
              Login to buy →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPV4;
