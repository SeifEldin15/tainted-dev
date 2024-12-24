import { StarterIcon } from "@/assests/svg";
import { CheckCircle, Sparkles } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  purchasePlansTypes,
  dashboardPurchasePricing,
  purchasePlansTypeProps,
} from "@/constants/DashboardStrings";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSetRecoilState } from "recoil";
import { modalState } from "@/global/modal-states";

const PurchaseCards = ({
  icon,
  name,
  description,
  type,
  price,
  totalGB,
  pricePer,
  features,
  isSpecial,
  buttonValues,
}: purchasePlansTypes) => {
  const setcurrentModal = useSetRecoilState(modalState);

  const handleOpenModal = () => {
    setcurrentModal({
      modalName: "purchaseModal",
      modalData: {
        icon,
        name,
        description,
        type,
        price,
        totalGB,
        pricePer,
        features,
        isSpecial,
        buttonValues,
      },
    });
  };

  return (
    <div
      className={cn(
        "p-[1px] rounded-md",
        isSpecial
          ? "bg-brand pulse-Effect"
          : "bg-gradient-to-br from-borderColor via-transparent to-transparent"
      )}
    >
      <div className="flex flex-col p-5 bg-[#161616] rounded-md relative">
        {isSpecial && (
          <div className="absolute right-2 top-2 flex flex-row items-center gap-1 text-sm text-brand px-2.5 py-1.5 rounded-sm bg-brand/[0.1]">
            <span>Popular</span>
            <Sparkles size={16} color="currentColor" />
          </div>
        )}
        <div className="flex flex-col gap-3">
          {/* Icon */}
          <div className="h-[70px] w-[70px]">{icon}</div>
          {/* Plan name */}
          <div>
            <div className="text-[20px] font-semibold">{name}</div>
            <div className="text-sm text-grayText">{description}</div>
          </div>
          {/* Pricing */}
          <div className="mt-4">
            <div className="text-[18px] flex flex-row items-end gap-2">
              <div className="flex flex-row items-center">
                <div className="text-[28px] leading-[28px] font-semibold">
                  {`$`}
                </div>
                <div className="text-[60px] leading-[40px] font-semibold">
                  {price}
                </div>
              </div>
              <div className="text-[18px] leading-[18px] text-white font-semibold px-2.5 py-1.5 bg-[#3f3f3f6c] rounded-sm">
                {`${totalGB} GB`}
              </div>
            </div>
            <div className="text-sm text-grayText mt-2">{pricePer}</div>
          </div>
          {/* Divider */}
          <div className="border-t border-borderColor" />
          {/* Features */}
          <div>
            <div className="text-grayText">{`Plan Includes`}</div>
            <div className="mt-2 flex flex-col gap-2">
              {features.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="flex flex-row items-center gap-2 text-sm"
                >
                  <CheckCircle
                    size={16}
                    color="currentColor"
                    className="text-brand"
                  />
                  <div>{feature}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Buy Btn */}
          <div className="w-full mt-2">
            <Button
              onClick={() => handleOpenModal()}
              className="w-full py-5 flex flex-row items-center gap-2"
              variant={"brand"}
              size={"sm"}
            >
              <span>{buttonValues.text}</span>
              {buttonValues.icon}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCards;
