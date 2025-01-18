"use client";

import DashboardIPV6Component from "@/components/myui/DashboardIPV6Component";
import { dashboardPurchasePricing } from "@/constants/DashboardStrings";
import React from "react";

const IPV6Page = ({ session }: any) => {
  // console.log("Purchase Page Session: ", session);

  return (
    <div className="flex flex-col gap-3 sm:gap-5 h-full">
      <div className="flex flex-col gap-[10px]">
        <div className="text-[20px] sm:text-[24px] font-semibold text-gray-900">
          <span>{`IPV6 Proxies`}</span>
        </div>
        <div className="text-[13px] text-grayText">{`Here is our pricing for IPV6 proxies! Purchase as many threads as you need.`}</div>
        <div className="text-[13px] text-grayText">{`(There's also bulk discounts! And if you need even larger bulk, contact support.)`}</div>
      </div>
      <DashboardIPV6Component />
    </div>
  );
};

export default IPV6Page;
