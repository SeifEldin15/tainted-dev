"use client";

import { dashboardPurchasePricing } from "@/constants/DashboardStrings";
import React from "react";
import CoreDashboardResidentialComponent from "@/components/myui/CoreDashboardResidentialComponent";

const CoreResidentialPage = ({ session }: any) => {
  // console.log("Purchase Page Session: ", session);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-[10px]">
        <div className="text-[20px] sm:text-[24px] font-semibold">
          <span>Core Residential Proxies</span>
        </div>
        {/* <div className="text-[13px] text-grayText">{`Here is our pricing for core-residential proxies! Data never expires and there is no limiting on threads!`}</div> */}
        {/* <div className="text-[13px] text-grayText">{`(There's also bulk discounts! And if you need even larger bulk, contact support.)`}</div> */}
      </div>

      {/* banner */}
      <div className="flex items-center justify-center text-black">
        <div className="border border-gray-200 rounded-lg shadow-lg flex justify-between p-6 w-full bg-white">
          <div className="">
            <h2 className="text-3xl  mb-2">Bulk Pricing</h2>
            <h3 className="text-xl font-bold text-[#00D4E1]">1 TB+</h3>
            <p className="text-sm font-medium text-gray-600 mb-4">
              Starting at $1.5/GB, as low as $1/GB 🎉🎉
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-6xl font-extrabold">$1.00</span>
              <span className="text-xl text-gray-600 ml-2">per GB</span>
            </div>

            <div className="mt-6">
              <button
                  className="bg-[#00D4E1] hover:bg-[#00D4E1]/90 text-black text-white font-semibold py-2 px-4 rounded transition-colors"
                  onClick={() => window.open('https://discord.gg/eclipseproxy', '_blank')}
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
      <CoreDashboardResidentialComponent/>
    </div>
  );
};

export default CoreResidentialPage;
