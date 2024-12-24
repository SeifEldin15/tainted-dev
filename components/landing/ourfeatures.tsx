import { cn } from "@/lib/utils";
import { HandIcon, ShieldCheck, Wand2, Wrench, Zap } from "lucide-react";
import React from "react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureData = [
  {
    title: "Instant Delivery",
    description:
      "Discover the unique instant-delivery experience with EclipseProxy. Upon payment approval, expect your product to arrive swiftly within 1-2 minutes. Explore our website to elevate your experience today!",
    icon: <Zap size={20} />,
  },
  {
    title: "Bandwidth Assurance",
    description:
      "When you purchase bandwidth from us, rest assured that 1GB means exactly that – no hidden caps or throttling, no lies, no bs.",
    icon: <ShieldCheck size={20} />,
  },
  {
    title: "Affordable",
    description:
      "We believe in providing great quality at reasonable costs, allowing all users to have a positive experience at a lower cost.",
    icon: <HandIcon size={20} />,
  },
  {
    title: "Active Support",
    description:
      "Our customer service representatives are available around the clock to assist you whenever you need it.",
    icon: <Wrench size={20} />,
  },
];

const OurFeatures = () => {
  return (
    <div id="features" className="px-4 pt-24">
      <div className="middle">
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center gap-2 text-sm text-brand">
            <Wand2 size={16} />
            <div className="">Magic Features</div>
          </div>
          <div className="mt-4 text-4xl font-semibold">Our Features</div>
          <div className="mt-10 grid grid-flow-row gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FeatureData.map((feature: FeatureProps, index: number) => (
              <div
                key={index}
                className={cn(
                  index == 5 ? "bg-[#111113]" : "hover:bg-brandGray/5",
                  "group flex cursor-pointer flex-col gap-4 rounded-xl p-4 hover:bg-brand hover:text-black duration-300"
                )}
              >
                <div>{feature?.icon}</div>
                <div className="text-lg font-medium">{feature?.title}</div>
                <div className="text-sm font-[400] text-white/40 group-hover:text-black/70">
                  {feature?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
