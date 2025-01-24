"use client";

import { ChevronRight, CreditCard, ShoppingCart } from "lucide-react";
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "../ui/button";
import { getIPv6ProxyPrice, getProxyPrice } from "@/constants/functions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { modalState } from "@/global/modal-states";
import { IPv6PricingInfo } from "@/constants/functions";

const IPv6PricingDays = [7, 30, 90];

const DashboardIPV6Component = ({
  isBackgroundTransparent = false,
}: {
  isBackgroundTransparent?: boolean;
  isCat?: boolean;
  isTitle?: boolean;
  isPaddingAbove?: boolean;
}) => {
  const { push } = useRouter();
  const [days, setDays] = React.useState<any>(7);
  const [threadCount, setThreadCount] = React.useState<any>(
    IPv6PricingInfo[0]?.threads
  );
  const setcurrentModal = useSetRecoilState(modalState);

  const handleCheckout = () => {
    setcurrentModal({
      modalName: "PurchaseIPV6Modal",
      modalData: {
        type: "ipv6",
        threadCount: threadCount,
        days: days,
        price: getIPv6ProxyPrice(threadCount, days),
      },
    });
  };

  return (
    <div id="pricing">
      <div className="">
        <div className="flex flex-col items-center">
          <div
            className={cn(
              isBackgroundTransparent
                ? "border border-transparent dark:border-transparent bg-transparent"
                : "mt-10 bg-white dark:bg-gray-800",
              "relative flex w-full flex-col rounded-2xl p-6"
            )}
          >
            {/* box content */}
            <div className="flex flex-row gap-4">
              <div className="rounded-md bg-brand/10 h-fit p-3 sm:p-5">
                <CreditCard size={26} className="text-brand" />
              </div>
              <div className="flex flex-col justify-between sm:py-1">
                <div className="text-xl font-semibold text-black dark:text-white sm:text-2xl">
                  Purchase an IPV6 Proxy Plan
                </div>
                <div className="text-brand">
                  Pick the length and thread limit you need
                </div>
              </div>
            </div>
            {/* features of pricing */}
            <div className="mt-4 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-end">
              {/* Features */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black/80 dark:text-white/80">Unlimited Unique IPs</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black/80 dark:text-white/80">IPv6 Forced</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black/80 dark:text-white/80">Super Fast Response Time</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black/80 dark:text-white/80">US IPs</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black/80 dark:text-white/80">{`/32 IPv6 Network`}</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black/80 dark:text-white/80">Session Support 3 Hours</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black/80 dark:text-white/80">
                    IPv6 does NOT work on all website. Make sure your target supposed IPv6 before purchasing.
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end">
                {/* buttons of time and thread selection */}
                <div className="relative py-4 space-y-2">
                  <div className="flex flex-col gap-2">
                    <div className="text-black/90 dark:text-white/90">{`Thread Count:`}</div>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {IPv6PricingInfo?.map((plan, index) => (
                          <Button
                              key={index}
                              onClick={() => setThreadCount(plan?.threads)}
                              variant={
                                threadCount === plan?.threads ? "brand" : "outline"
                              }
                              className={threadCount === plan?.threads ? "bg-brand text-white hover:bg-brand/90" : "text-gray-900"}
                          >
                            {plan?.threads === 100000 ? "Unlimited" : plan?.threads}
                          </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-black/90 dark:text-white/90">{`Time:`}</div>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {IPv6PricingDays?.map((day: number, index: number) => (
                          <Button
                              key={index}
                              onClick={() => setDays(day)}
                              variant={days === day ? "brand" : "outline"}
                              className={days === day ? "bg-brand text-white hover:bg-brand/90" : "text-gray-900"}
                          >
                            {`${day} Days`}
                          </Button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Caluclated Pricing */}
                <div className="flex w-full flex-row items-center justify-between gap-5 ">
                  <div>
                    <div className="text-sm text-black dark:text-white">Estimate Price:</div>
                    <div className="text-3xl font-semibold text-brand">
                      {`$ ${getIPv6ProxyPrice(threadCount, days)}`}
                    </div>
                  </div>
                  {/* checkout btn */}
                  <div className="flex flex-col items-center">
                    <Button
                      variant={"brand"}
                      onClick={() => handleCheckout()}
                      className="flex flex-row items-center gap-2 text-white bg-brand hover:bg-brand/90"
                    >
                      <span>Purchase</span>
                      <ChevronRight size={16} />
                    </Button>
                    <div className="mt-1 text-xs text-black/50 dark:text-white/50">
                      {`*Prices are in USD`}
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

export default DashboardIPV6Component;
