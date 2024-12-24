"use client";

import { ZapIcon } from "lucide-react";
import React from "react";
import moment from "moment";
import { cn } from "@/lib/utils";
import IPv6GeneratorPage from "@/components/dashboard/pages/proxy-generator/IPv6GeneratorPage";

const ShowIPv6Plans = ({ PlansData }: any) => {
  // console.log(PlansData);

  function sortByExpiresDesc(arr: any) {
    return arr.sort((a: any, b: any) => {
      // @ts-ignore
      return new Date(b.expires_at) - new Date(a.expires_at);
    });
  }

  PlansData = sortByExpiresDesc(PlansData);

  const [selectedPlan, setSelectedPlan] = React.useState<any>(null);

  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-[10px]">
        <div className="text-[20px] sm:text-[24px] font-semibold">
          <span>{`IPv6 Plans`}</span>
        </div>
        <div className="text-[13px] text-grayText">{`Select any of your plans to begin generating proxies!`}</div>
        {/* plans in box type */}
        <div className="mt-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PlansData?.map((plan: any, index: number) => {
            const createdAt = moment();
            const expiresAt = moment(plan?.expires_at);

            const differenceInDays = expiresAt.diff(createdAt, "days");

            const isPlanExpired = differenceInDays < 0;

            return (
              <div
                className={cn(
                  differenceInDays < -10 && "hidden", // hide plans that are expired for more than 10 days
                  isPlanExpired && "opacity-50", // reduce opacity for expired plans
                  selectedPlan?.username === plan?.username
                    ? "border-brand shadow-xl shadow-brand/5"
                    : "border-transparent",
                  "bg-brandGray rounded-lg select-none cursor-pointer border-[1px] duration-200 group relative"
                )}
                key={index}
                onClick={() => {
                  if (isPlanExpired) return;
                  setSelectedPlan(plan);
                }}
              >
                {
                  // selected plan
                  selectedPlan?.username === plan?.username && (
                    <div className="absolute px-2 top-0 right-0 rounded-tr-md rounded-bl-md bg-brand text-black text-xs font-semibold p-1">
                      Selected
                    </div>
                  )
                }
                {
                  // expired plan
                  isPlanExpired && (
                    <div className="absolute px-2 top-0 right-0 rounded-tr-md rounded-bl-md bg-red-500 text-white text-xs font-semibold p-1">
                      Expired
                    </div>
                  )
                }
                {/* top div */}
                <div className="flex flex-row gap-3 items-center py-3 px-3 border-b border-white/10">
                  <div className="p-3 bg-white/5 rounded-md">
                    <ZapIcon
                      fill={
                        selectedPlan?.username === plan?.username
                          ? "#00ecfc"
                          : "white"
                      }
                      size={16}
                      className={cn(
                        selectedPlan?.username === plan?.username
                          ? "text-brand"
                          : "text-white"
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-white/30">Username</div>
                    <div className="text-sm">{plan?.username}</div>
                  </div>
                </div>
                {/* plan details */}
                <div className="flex flex-col gap-1 p-3">
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-xs text-white/30">Status</div>
                    <div
                      className={cn(
                        isPlanExpired
                          ? " bg-red-500/10 text-red-500"
                          : " bg-green-400/10 text-green-400",
                        "text-xs px-1.5 py-1 rounded-md"
                      )}
                    >
                      {
                        // expired plan
                        isPlanExpired ? "Expired" : "Active"
                      }
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-xs text-white/30">Key</div>
                    <div className="text-xs px-1.5 py-1 rounded-md bg-gray-400/10 text-gray-400 select-text">
                      {isPlanExpired ? "Expired Key" : plan?.password}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-xs text-white/30">Threads</div>
                    <div className="text-xs px-1.5 py-1">
                      {plan?.threadCount}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-xs text-white/30">Days</div>
                    <div className="text-xs px-1.5 py-1">{plan?.daysCount}</div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-xs text-white/30">Created At</div>
                    <div className="text-xs px-1.5 py-1">
                      {moment(plan?.created_at).format("LL")}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-xs text-white/30">
                      {
                        // expired at
                        isPlanExpired ? "Expired At" : "Expires At"
                      }
                    </div>
                    <div className="text-xs px-1.5 py-1 rounded-md bg-red-500/10 text-red-500">
                      {moment(plan?.expires_at).format("LL")}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* proxy generator */}
        {selectedPlan && <IPv6GeneratorPage userProxyData={selectedPlan} />}
      </div>
    </div>
  );
};

export default ShowIPv6Plans;
