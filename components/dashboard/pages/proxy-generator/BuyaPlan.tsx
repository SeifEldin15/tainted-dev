import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const BuyaPlan = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-[10px]">
        <div className="text-[20px] sm:text-[24px] font-semibold text-black dark:text-white">
          <span>{`Purchase a plan to use the proxy generator!`}</span>
        </div>
        <div className="text-[13px] text-grayText dark:text-gray-300">{`Head to the "Residential Proxies" page to buy a plan`}</div>
      </div>
      <div className="bg-[#101014] dark:bg-gray-800 rounded-md py-4 px-5 flex flex-col gap-2 mt-6 shadow-lg shadow-[#00000038]">
        <div className="text-[16px] text-black dark:text-white">No Active Plan</div>
        <div className="h-[1px] bg-transparent"></div>
        <div className="mt-4">
          <Link href="/dashboard/residential-proxies">
            <Button variant="brand" className="w-full">
              View Plans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyaPlan;
