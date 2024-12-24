import React from "react";
import BuyaPlan from "@/components/dashboard/pages/proxy-generator/BuyaPlan";
import CoreResiProxyGeneratorPage from "@/components/dashboard/pages/proxy-generator/CoreResiProxyGenerator";
import { getUserDetailsAdminAccess } from "@/constants/functions";
import { nextAuthSessionType } from "@/constants/types";
import { authOptions } from "@/providers/AuthOptions";
import { getServerSession } from "next-auth";
import data from "@/app/api/proxy-generator/resi-core/data";

const Page = async () => {
  const session: nextAuthSessionType | null = await getServerSession(
    authOptions
  );

  let userData = null;
  let userProxyData = null;

  try {
    userData = await getUserDetailsAdminAccess(session?.user?.email || "");

    const subUserResponse = await fetch(
      `https://app-api.geonode.com/api/reseller/user/${userData?.userCoreResiPlans[0]?.userResellerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "r-api-key": process.env.GEONODE_RESELLER_API_KEY as string,
        },
      }
    );

    userProxyData = await subUserResponse.json();
  } catch (error) {
    console.log("[PROXY GENERATOR PAGE] ERROR: ", error);
  }

  return (
    <div className="h-full w-full">
      {userData?.userPlans?.core_residential ? (
        <CoreResiProxyGeneratorPage
          proxySettings={data}
          userProxyData={userProxyData}
        />
      ) : (
        <BuyaPlan />
      )}
    </div>
  );
};

export default Page;

export const dynamic = "force-dynamic";
