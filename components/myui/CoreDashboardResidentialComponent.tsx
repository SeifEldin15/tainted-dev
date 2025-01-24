"use client";

import { ChevronRight, CreditCard, ShoppingCart } from "lucide-react";
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "../ui/button";
import {getCoreResiProxyPrice, getProxyPrice} from "@/constants/functions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { modalState } from "@/global/modal-states";

const CoreDashboardResidentialComponent = ({
  isBackgroundTransparent = false,
}: {
  isBackgroundTransparent?: boolean;
  isCat?: boolean;
  isTitle?: boolean;
  isPaddingAbove?: boolean;
}) => {
  const { push } = useRouter();
  const [value, setValue] = React.useState<any>(1);
  const setcurrentModal = useSetRecoilState(modalState);

  const handleCheckout = () => {
    setcurrentModal({
      modalName: "PurchaseCoreResiModal",
      modalData: {
        totalGB: value,
      },
    });
  };

  return (
    <div id="pricing">
      <div className="">
        <div className="flex flex-col items-center mb-12">
          <div
            className={cn(
              isBackgroundTransparent
                ? "border border-transparent bg-transparent"
                : "mt-10 border border-transparent dark:bg-gray-800 bg-white",
              "relative flex w-full flex-col rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden p-6"
            )}
          >
            {/* box content */}
            <div className="flex flex-row gap-4">
              <div className="rounded-md bg-brand/10 p-3 sm:p-5">
                <CreditCard size={26} className="text-brand" />
              </div>
              <div className="flex flex-col justify-between sm:py-1">
                <div className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  Purchase Core Residential Bandwidth
                </div>
                <div className="text-gray-500 dark:text-gray-400">Pay as You Go</div>
              </div>
            </div>
            {/* Slider */}
            <div className="relative py-8">
              <Slider
                defaultValue={[value]}
                min={1}
                max={500}
                step={1}
                onValueChange={(val: any) => setValue(val?.[0])}
                className="[&_.relative]:bg-gray-200 [&_[data-orientation=horizontal]>.bg-primary]:bg-[#00E9F7] [&_[role=slider]]:bg-[#00E9F7] [&_[role=slider]]:border-[#00E9F7]"
              />
            </div>
            {/* features of pricing */}
            <div className="flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-end">
              {/* Features */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-gray-600 dark:text-gray-300">Unlimited Threads</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-gray-600 dark:text-gray-300">10 Million+ Unique IPs Globally</div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-gray-600 dark:text-gray-300">High Network Speeds</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-gray-600 dark:text-gray-300">190+ Countries</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-gray-600 dark:text-gray-300">Reliable Connections</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-gray-600 dark:text-gray-300">Data <strong>Never</strong> Expires</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Sticky Sessions up to 24 Hours
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-gray-600 dark:text-gray-300">Authenticated & IP Whitelist</div>
                </div>
              </div>
              {/* Caluclated Pricing */}
              <div className="flex w-full flex-row items-center justify-between gap-5 sm:w-fit">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Estimate Price:</div>
                  <div className="text-3xl font-semibold text-brand">
                    {`$ ${getCoreResiProxyPrice(Number(value))}`}
                  </div>
                </div>
                {/* checkout btn */}
                <div className="flex flex-col items-center">
                  <Button
                    variant={"brand"}
                    onClick={handleCheckout}
                    className="flex flex-row items-center gap-2 bg-brand hover:bg-brand/90] text-white"
                  >
                    <span>Purchase</span>
                    <ChevronRight size={16} />
                  </Button>
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    {`*Prices are in USD`}
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

export default CoreDashboardResidentialComponent;
