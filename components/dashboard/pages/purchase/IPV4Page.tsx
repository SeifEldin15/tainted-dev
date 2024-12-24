"use client";

import DashboardIPV4Component from "@/components/myui/DashboardIPV4Component";
import { dashboardPurchasePricing } from "@/constants/DashboardStrings";
import React from "react";

const IPV6Page = ({ session }: any) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-5 h-full">
      <div className="flex flex-col gap-[10px]">
        <div className="text-[20px] sm:text-[24px] font-semibold">
          <span>{`IPV4 Proxies`}</span>
        </div>
        <div className="text-[13px] text-grayText">{`Here is our pricing for IPv4 Datacenter Proxies! Purchase as many threads as you need for as long as required!`}</div>
        <div className="text-[13px] text-grayText">{`(There's also bulk discounts! If you need large bulk, contact support.)`}</div>
      </div>
      <DashboardIPV4Component />
    </div>
  );
};

export default IPV6Page;
