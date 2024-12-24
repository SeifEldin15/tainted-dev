import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const BuyaPlan = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-[10px]">
        <div className="text-[20px] sm:text-[24px] font-semibold">
          <span>{`Purchase a plan to use the proxy generator!`}</span>
        </div>
        <div className="text-[13px] text-grayText">{`Head to the "Residential Proxies" page to buy a plan`}</div>
      </div>
    </div>
  );
};

export default BuyaPlan;
