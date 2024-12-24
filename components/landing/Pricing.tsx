import React from "react";
import PricingCard from "../myui/PricingCard";
import {
  PricingValuesTypes,
  PricingValues,
  DatacenterPricingValues,
  ContactUSValues,
} from "@/constants/Strings";
import Link from "next/link";
import { Button } from "../ui/button";
import LandingPageProxyPricing from "../myui/LandingPricingSlider";
import { ShoppingCartIcon } from "lucide-react";
import LandingIPv6Plans from "../myui/LandingIPv6Plans";
import LandingIPv4Plans from "../myui/LandingIPv4Plans";

const Pricing = () => {
  const { mainTitle, planType, plans, subTitle }: PricingValuesTypes =
    PricingValues;

  return (
    <div id="pricing" className="px-2">
      <div className="mx-auto w-full max-w-[1400px] px-2">
        <div className="flex flex-col gap-5">
          {/* Title */}
          <div className="w-full flex flex-col items-center mt-20">
            <div className="flex flex-row items-center gap-2 text-sm text-brand">
              <ShoppingCartIcon size={16} />
              <div className="">Affordable Prices</div>
            </div>
            <div className="mt-4 text-4xl font-semibold">Pricing Plans</div>
          </div>

          {/* Plans Starting */}
          {/* planType */}
          <div className="flex flex-col w-full gap-5">
            <div className="text-brand bg-brand/[0.05] w-fit px-3 py-1.5 rounded-md">
              {`Residential IPv4 Proxies`}
            </div>
            {/* Plans */}
            <LandingPageProxyPricing />
          </div>
          {/* ipv6 plans */}
          <div className="flex flex-col w-full gap-5">
            <div className="text-brand bg-brand/[0.05] w-fit px-3 py-1.5 rounded-md">
              {`Datacenter IPv6 Proxies`}
            </div>
            {/* Plans */}
            <LandingIPv6Plans />
          </div>
          {/* ipv4 plans */}
          <div className="flex flex-col w-full gap-5">
            <div className="text-brand bg-brand/[0.05] w-fit px-3 py-1.5 rounded-md">
              {`Datacenter IPv4 Proxies`}
            </div>
            {/* Plans */}
            <LandingIPv4Plans />
          </div>
          {/* Exclusive Plans And Contact Us*/}
          <div className="grid grid-flow-row gap-5">
            {/* contact us */}
            <div className="flex flex-col gap-5 h-full">
              <div className="text-brand bg-brand/[0.05] w-fit px-3 py-1.5 rounded-md">
                {ContactUSValues.title}
              </div>
              {/* Plans */}
              <div className="h-full p-[1px] rounded-md">
                <div className="h-full flex flex-col p-5 bg-[#111113] rounded-md relative">
                  <div className="flex flex-col gap-3">
                    {/* Icon */}
                    <div className="h-[70px] w-[70px]">
                      {ContactUSValues.icon}
                    </div>
                    {/* Plan name */}
                    <div>
                      <div className="text-[20px] font-semibold">
                        {ContactUSValues.name}
                      </div>
                      <div className="text-sm text-grayText">
                        {ContactUSValues.description}
                      </div>
                    </div>
                    {/* Pricing */}
                    <div className="mt-4">
                      <Link href={ContactUSValues.buttonValues.path}>
                        <Button
                          size={ContactUSValues.buttonValues.size}
                          variant={ContactUSValues.buttonValues.variant}
                          className="flex flex-row items-center gap-2 bg-[#27272a] border border-[#27272a]"
                        >
                          <div>{ContactUSValues.buttonValues.text}</div>
                          {ContactUSValues.buttonValues.icon}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
