import { getUserDetailsAdminAccess } from "@/constants/functions";
import { nextAuthSessionType } from "@/constants/types";
import { authOptions } from "@/providers/AuthOptions";
import { getServerSession } from "next-auth";
import React from "react";
import ShowIPv4Plans from "./showIPv4Plans";
import { UserPlans } from "@prisma/client";

const Page = async () => {
  const session: nextAuthSessionType | null = await getServerSession(
    authOptions
  );

  var userData = await getUserDetailsAdminAccess(session?.user?.email || "");

  var userPlans: any = userData?.userIPv4Plans;

  // Use Promise.all to await all asynchronous operations

  await Promise.all(
    userPlans?.map(async (plan: any, index: number) => {
      const planData = await fetch(
        `https://api.infiniteproxies.com/v2/reseller/sub_users/view_single?username=${plan?.username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.RESELLER_API_KEY || "",
          },
        }
      );

      var planDataJson = await planData.json();

      // Push data into the array after the asynchronous operation is completed
      userPlans[index].proxy_key =
        planDataJson?.data?.products?.dataCenter?.proxy_key;
    })
  );

  // console.log("USER PLANS WITH PASSWORD : ", userPlans || []);
  return (
    <div className="h-full w-full">
      {userData?.userPlans?.ipv4 ? (
        <ShowIPv4Plans PlansData={userPlans} />
      ) : (
        <div className="h-full w-full">
          <div className="flex flex-col gap-[10px]">
            <div className="text-[20px] sm:text-[24px] font-semibold">
              <span>{`Purchase a plan to use the proxy generator!`}</span>
            </div>
            <div className="text-[13px] text-grayText">{`Head to the "IPv4 Proxies" page to buy a plan`}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

export const dynamic = "force-dynamic";
