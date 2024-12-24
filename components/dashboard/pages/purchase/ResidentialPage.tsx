"use client";

import { dashboardPurchasePricing } from "@/constants/DashboardStrings";
import React from "react";
import DashboardResidentialComponent from "@/components/myui/DashboardResidentialComponent";

const ResidentialPage = ({ session }: any) => {
  // console.log("Purchase Page Session: ", session);

  return (
    <div className="flex flex-col gap-3 sm:gap-5 h-full">
      <div className="flex flex-col gap-[10px]">
        <div className="text-[20px] sm:text-[24px] font-semibold">
          <span>{`Residential Proxies`}</span>
        </div>
        <div className="text-[13px] text-grayText">{`Here is our pricing for residential proxies! Data never expires and there is no limiting on threads!`}</div>
        <div className="text-[13px] text-grayText">{`(There's also bulk discounts! And if you need even larger bulk, contact support.)`}</div>
      </div>
      <DashboardResidentialComponent />
    </div>
  );
};

export default ResidentialPage;
