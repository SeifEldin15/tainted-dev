import React from 'react';
import { HiServer } from 'react-icons/hi';
import { HiHomeModern } from 'react-icons/hi2';
import { BsGlobe } from 'react-icons/bs';
import { MdRouter } from 'react-icons/md';

interface PricingCard {
  title: string;
  description: string;
  price: string;
  unit: string;
  buttonColor: string;
  icon: React.ElementType;
}

const PricingSection: React.FC = () => {
  const pricingCards: PricingCard[] = [
    {
      title: "Residential Proxies",
      description: "Real IPs from ISPs for reliable and secure web scraping",
      price: "$2",
      unit: "/GB",
      buttonColor: "bg-brand",
      icon: HiHomeModern,
    },
    {
      title: "Datacenter Proxies",
      description: "High-speed, scalable proxies from data centers for bulk web scraping",
      price: "$4.3",
      unit: "/day",
      buttonColor: "bg-brand",
      icon: HiServer,
    },
    {
      title: "IPV6 Proxies",
      description: "Modern, high-availability proxies with vast address space for advanced needs",
      price: "$3.1",
      unit: "/day",
      buttonColor: "bg-brand",
      icon: BsGlobe,
    },
    {
      title: "Static ISP Proxies",
      description: "Consistent IPs from ISPs for stable and uninterrupted connections",
      price: "$2.5",
      unit: "/IP",
      buttonColor: "bg-brand",
      icon: MdRouter,
    },
  ];

  return (
    <section className="py-16 px-4 mt-12 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          Efficient Data Scraping For <span className="text-brand font-bold">Projects Of Any Scale</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          From Premium Residential Proxies or responsive datacenter to static ISP solutions for any needs, experience the quality with CatProxies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pricingCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <card.icon className="w-12 h-12 mb-4 mx-auto text-brand" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{card.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{card.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.price}
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{card.unit}</span>
                  </p>
                </div>
                <button className={`${card.buttonColor} text-black px-6 py-2 rounded-md hover:opacity-90`}>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
