"use client";

import { ChevronRight, CreditCard, ShoppingCart } from "lucide-react";
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "../ui/button";
import {
  getCustomIPv4ProxyPrice,
  getIPv4ProxyPrice,
  getProxyPrice,
  IPv4PricingInfo,
} from "@/constants/functions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { modalState } from "@/global/modal-states";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const IPv4PricingDays = [1, 7, 14, 30, 90];

const DashboardIPV4Component = ({
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
    IPv4PricingInfo[0]?.threads
  );
  const setcurrentModal = useSetRecoilState(modalState);

  const handleCheckout = () => {
    const price = getCustomIPv4ProxyPrice(threadCount, days);
    if (!price) return;
    setcurrentModal({
      modalName: "PurchaseIPV4Modal",
      modalData: {
        type: "ipv4",
        threadCount: threadCount,
        days: days,
        price: price.toFixed(2),
      },
    });
  };

  return (
    <div id="pricing">
      <div className="">
        <div className="flex flex-col items-center dark:bg-gray-800">
          <div
            className={cn(
              isBackgroundTransparent
                ? "border border-transparent dark:border-transparent bg-transparent"
                : "mt-10",
              "relative flex w-full flex-col rounded-2xl p-6"
            )}
          >
            {/* box content */}
            <div className="flex flex-row gap-4">
              <div className="rounded-md bg-brand/10 h-fit p-3 sm:p-5">
                <CreditCard size={26} className="text-brand" />
              </div>
              <div className="flex flex-col justify-between sm:py-1">
                <div className="text-xl font-semibold sm:text-2xl text-black dark:text-white">
                  Purchase an IPv4 Datacenter Proxy Plan
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
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black dark:text-white">Unlimited Bandwidth</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black dark:text-white">Authenticated & IP Auth Options</div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black dark:text-white">Large IP Pool</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black dark:text-white">Super Fast Response Time</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black dark:text-white">US IPs</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black dark:text-white">Sticky Sessions Supported</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black dark:text-white">Works On All Websites</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-black dark:text-white">Custom Length & Thread Count Supported</div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end">
                {/* buttons of time and thread selection */}
                <div className="relative py-4 space-y-2">
                  <div className="flex flex-col gap-2">
                    <div className="text-black dark:text-white">Thread Count</div>
                    <div className="flex flex-row gap-2 flex-wrap items-center text-black dark:text-white">
                      {IPv4PricingInfo?.map((plan, index) => (
                          <Button
                              key={index}
                              onClick={() => setThreadCount(plan?.threads)}
                              variant={
                                threadCount === plan?.threads ? "brand" : "outline"
                              }
                              className={threadCount === plan?.threads ? "!text-black" : ""}
                          >
                            {plan?.threads}
                          </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-black dark:text-white">Time</div>
                    <div className="flex flex-row gap-2 flex-wrap items-center text-black dark:text-white">
                      {IPv4PricingDays?.map((day: number, index: number) => (
                          <Button
                              key={index}
                              onClick={() => setDays(day)}
                              variant={days === day ? "brand" : "outline"}
                              className={days === day ? "!text-black" : ""}
                          >
                            {`${day} Days`}
                          </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* custom plan */}
                <div className="flex w-full items-center gap-5 mb-4 text-black dark:text-white">
                  <div>
                    <Label>Custom Threads (Min 400)</Label>
                    <Input
                        type="number"
                        className="!text-black dark:!text-white bg-white dark:bg-gray-700"
                        value={threadCount}
                        onChange={(e) => setThreadCount(parseInt(e.target.value))}
                        min={400}
                    />
                  </div>
                  <div>
                    <Label>Custom Days</Label>
                    <Input
                        type="number"
                        className="!text-black dark:!text-white bg-white dark:bg-gray-700"
                        value={days}
                        onChange={(e) => setDays(parseInt(e.target.value))}
                        min={1}
                    />
                  </div>
                </div>

                {/* Caluclated Pricing */}
                <div className="flex w-full flex-row items-center justify-between gap-5 ">
                  <div>
                    <div className="text-sm text-black dark:text-white">Estimate Price:</div>
                    <div className="text-3xl font-semibold text-brand">
                      {`$ ${getCustomIPv4ProxyPrice(
                          threadCount || 0,
                          days || 0
                      ).toFixed(2)}`}
                    </div>
                  </div>
                  {/* checkout btn */}
                  <div className="flex flex-col items-center">
                    <Button
                        variant={"brand"}
                        onClick={() => handleCheckout()}
                        className="flex flex-row items-center gap-2 !text-black"
                    >
                      <span className="!text-black">Purchase</span>
                      <ChevronRight size={16}/>
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

export default DashboardIPV4Component;
