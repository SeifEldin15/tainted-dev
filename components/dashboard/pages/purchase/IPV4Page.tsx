"use client";

import DashboardIPV4Component from "@/components/myui/DashboardIPV4Component";
import { dashboardPurchasePricing } from "@/constants/DashboardStrings";
import React from "react";

const IPV6Page = ({ session }: any) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-5 h-full">
      <div className="flex flex-col gap-[10px] bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-transparent shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden p-5">
        <div className="text-[20px] sm:text-[24px] font-semibold text-gray-900 dark:text-white">
          <span>{`IPV4 Proxies`}</span>
        </div>
        <div className="text-[13px] text-gray-500 dark:text-gray-300">{`Here is our pricing for IPv4 Datacenter Proxies! Purchase as many threads as you need for as long as required!`}</div>
        <div className="text-[13px] text-gray-500 dark:text-gray-300">{`(There's also bulk discounts! If you need large bulk, contact support.)`}</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-transparent shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <DashboardIPV4Component />
      </div>
    </div>
  );
};

export default IPV6Page;
