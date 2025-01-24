import React from 'react';
import { HiGlobeAlt } from 'react-icons/hi';
import { MdAutorenew, MdSecurity, MdLocationOn } from 'react-icons/md';
import { FaRobot, FaLock, FaKey, FaBolt } from 'react-icons/fa';

const Features2 = () => {
  const features = [
    {
      icon: <HiGlobeAlt className="text-brand text-2xl" />,
      title: '3+ million IPs from 100 countries',
    },
    {
      icon: <MdAutorenew className="text-brand text-2xl" />,
      title: 'IP rotation - Each request/Sticky sessions',
    },
    {
      icon: <FaRobot className="text-brand text-2xl" />,
      title: 'Ethically-sourced IPs, helping avoid CAPTCHAs and IP blocks',
    },
    {
      icon: <FaLock className="text-brand text-2xl" />,
      title: 'HTTP(S)/SOCKS5 Support',
    },
    {
      icon: <FaKey className="text-brand text-2xl" />,
      title: 'Easy authentication with User:Password or white-listed IPs',
    },
    {
      icon: <MdLocationOn className="text-brand text-2xl" />,
      title: 'Wide set of geolocations at the country-, state-, city-, ISP- (ASN)',
    },
    {
      icon: <FaBolt className="text-brand text-2xl" />,
      title: 'Unlimited Concurrent Connections',
    },
    {
      icon: <MdSecurity className="text-brand text-2xl" />,
      title: '99% Uptime',
    },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-brand uppercase font-medium mb-4">FEATURES</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
            Proxy Features of our Residential Proxies
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[80px]"
              >
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-lg bg-brand/10">
                  {feature.icon}
                </div>
                <p className="font-medium text-gray-900 dark:text-white text-sm flex items-center">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
          
          <div className="relative">
            <img
              src="/vpn.jpg"
              alt="Features illustration"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features2;
