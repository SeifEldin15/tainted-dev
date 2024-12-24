import { UndercoverIcon } from "@/assests/svg";
import { FeaturesValues, FeaturesValuesTypes } from "@/constants/Strings";
import { cn } from "@/lib/utils";
import React from "react";

const Features = () => {
  return (
    <div id="about" className="px-2">
      <div className="mx-auto w-full max-w-[1400px] px-2">
        <div className="grid grid-flow-row md:grid-cols-3 gap-10">
          {FeaturesValues.map(
            (
              { description, icon, title }: FeaturesValuesTypes,
              index: number
            ) => (
              <div key={index} className="flex flex-col w-full">
                {/* Top Line */}
                <div
                  className={cn(
                    "h-[1px] w-full",
                    index == 1 ? "bg-brand" : "bg-borderColor"
                  )}
                />
                {/* Content */}
                <div className="p-[24px]">
                  <div className="w-[50px] h-[50px]">{icon}</div>
                  <div
                    className={cn(
                      "pt-[20px] pb-[8px] font-semibold",
                      index == 1 ? "text-brand" : "text-white"
                    )}
                  >
                    {title}
                  </div>
                  <div className="text-sm text-grayText">{description}</div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Features;
