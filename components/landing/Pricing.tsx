import React from 'react';

interface PricingCard {
  title: string;
  description: string;
  price: string;
  unit: string;
  buttonColor: string;
  icon: string;
}

const PricingSection: React.FC = () => {
  const pricingCards: PricingCard[] = [
    {
      title: "Residential Proxies",
      description: "Real IPs from ISPs for reliable and secure web scraping",
      price: "$2",
      unit: "/GB",
      buttonColor: "bg-[#00D4E1]",
      icon: "/icons/residential.svg", // You'll need to add these icons
    },
    {
      title: "Datacenter Proxies",
      description: "High-speed, scalable proxies from data centers for bulk web scraping",
      price: "$4.3",
      unit: "/day",
      buttonColor: "bg-[#00D4E1]",
      icon: "/icons/datacenter.svg",
    },
    {
      title: "IPV6 Proxies",
      description: "Modern, high-availability proxies with vast address space for advanced needs",
      price: "$3.1",
      unit: "/day",
      buttonColor: "bg-[#00D4E1]",
      icon: "/icons/ipv6.svg",
    },
    {
      title: "Static ISP Proxies",
      description: "Consistent IPs from ISPs for stable and uninterrupted connections",
      price: "$2.5",
      unit: "/IP",
      buttonColor: "bg-[#00D4E1]",
      icon: "/icons/static-isp.svg",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl  mb-2 text-gray-900">
          Efficient Data Scraping For <span className="text-[#00D4E1] font-bold">Projects Of Any Scale</span>
        </h2>
        <p className="text-gray-600 mb-12">
          From Premium Residential Proxies or responsive datacenter to static ISP solutions for any needs, experience the quality with CatProxies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pricingCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
              <img src={card.icon} alt="" className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{card.title}</h3>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.price}
                    <span className="text-gray-500 text-sm">{card.unit}</span>
                  </p>
                </div>
                <button className={`${card.buttonColor} text-white px-6 py-2 rounded-md hover:opacity-90`}>
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
