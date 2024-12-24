"use client";

import { ChevronRight, CreditCard, ShoppingCart } from "lucide-react";
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "../ui/button";
import { getProxyPrice } from "@/constants/functions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { modalState } from "@/global/modal-states";

const DashboardPageProxyPricing = ({
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
      modalName: "purchaseModal",
      modalData: {
        totalGB: value,
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
                ? "border bg-transparent"
                : "mt-10 bg-[#111113]",
              "relative flex w-full flex-col rounded-2xl p-6"
            )}
          >
            {/* box content */}
            <div className="flex flex-row gap-4">
              <div className="rounded-md bg-brand/10  p-3 sm:p-5">
                <CreditCard size={26} className="text-brand" />
              </div>
              <div className="flex flex-col justify-between sm:py-1">
                <div className="text-xl font-semibold sm:text-2xl">
                  Purchase Proxy Bandwidth
                </div>
                <div className="text-brand">Pay for just what you need</div>
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
              />
            </div>
            {/* features of pricing */}
            <div className="flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-end">
              {/* Features */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">Instant delivery</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">Pay as you go</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">Unlimited threads</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">Large proxy pool</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">Sticky session up to 2 hours</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">Data NEVER expires</div>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand"></div>
                  <div className="text-white/80">Geo IP targeting</div>
                </div>
              </div>
              {/* Caluclated Pricing */}
              <div className="flex w-full flex-row items-center justify-between gap-5 sm:w-fit">
                <div>
                  <div className="text-sm text-white">Estimate Price:</div>
                  <div className="text-3xl font-semibold text-brand">
                    {`$ ${getProxyPrice(Number(value))}`}
                  </div>
                </div>
                {/* checkout btn */}
                <div className="flex flex-col items-center">
                  <Button
                      variant={"brand"}
                      onClick={handleCheckout}
                      className="flex flex-row items-center gap-2"
                  >
                    <span>Purchase</span>
                    <ChevronRight size={16}/>
                  </Button>
                  <div className="mt-1 text-xs text-white/50">
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

export default DashboardPageProxyPricing;
