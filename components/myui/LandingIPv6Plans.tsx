"use client";

import { CreditCard, ZapIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { IPv6PricingInfo } from "@/constants/functions";

const LandingIPv6Plans = () => {
  const redirectTo = (url: string) => {
    window.location.href = url; // Redirect to the specified URL
  };

  return (
    <div id="pricing">
      <div className="">
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "relative flex w-full flex-col rounded-md p-6 bg-[#111113]"
            )}
          >
            {/* box content */}
            <div className="flex flex-row gap-4">
              <div className="rounded-md bg-brand/10  p-3 sm:p-5">
                <ZapIcon size={26} className="text-brand" />
              </div>
              <div className="flex flex-col justify-between sm:py-1">
                <div className="text-xl font-semibold sm:text-2xl">
                  Purchase an IPV6 Proxy Plan
                </div>
                <div className="text-brand">
                  Pick the length and thread limit you need
                </div>
              </div>
            </div>
            {/* features of pricing */}
            <div className="mt-3 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-end">
              {/* Features */}
              <div className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 w-full gap-3">
                <div className="flex flex-row items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">Unlimited Unique IPs</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">IPv6 Forced</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">Super Fast Response Time</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">US IPs</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">{`/32 IPv6 Network`}</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">Session Support 3 Hours</div>
                </div>
              </div>
            </div>
            {/* plans */}
            <div className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-6">
              {IPv6PricingInfo?.map((plan, index) => (
                  <div
                      key={index}
                      className="p-3 bg-[#09090b] rounded-md space-y-3"
                  >
                    <div className="text-3xl text-brand">
                      {plan?.threads === 100000 ? "Unlimited Threads" : `${plan?.threads} Threads`}
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button
                          variant={"outline"}
                          onClick={() => redirectTo("https://eclipseproxy.com/dashboard")}
                      >{`1 Week - ${plan?.prices?.week}$`}</Button>
                      <Button
                          variant={"outline"}
                          onClick={() => redirectTo("https://eclipseproxy.com/dashboard")}
                      >{`1 Month - ${plan?.prices?.month}$`}</Button>
                      <Button
                          variant={"outline"}
                          onClick={() => redirectTo("https://eclipseproxy.com/dashboard")}
                      >
                        {`3 Months - ${plan?.prices?.threeMonths}$`}
                      </Button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingIPv6Plans;
