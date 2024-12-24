import React from "react";
import { HeroAnnoucementBarTypes } from "@/constants/Strings";

const AnimatedBadge = ({
  text,
  icon,
  iconSide,
  showIcon,
}: HeroAnnoucementBarTypes) => {
  return (
    <div className="select-none p-[1px] relative flex items-center justify-center overflow-hidden rounded-full">
      <div className="absolute z-[1] badge-animated-border w-full min-h-screen"></div>
      <div className="relative z-[2] text-xs text-brand bg-[#081e17] px-3 py-1.5 rounded-full flex gap-1.5">
        {iconSide === "left" && showIcon ? icon : null}
        <div>{text}</div>
        {iconSide === "right" && showIcon ? icon : null}
      </div>
    </div>
  );
};

export default AnimatedBadge;
