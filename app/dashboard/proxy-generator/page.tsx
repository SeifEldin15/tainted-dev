import BuyaPlan from "@/components/dashboard/pages/proxy-generator/BuyaPlan";
import ProxyGeneratorPage from "@/components/dashboard/pages/proxy-generator/ProxyGeneratorPage";
import { getUserDetailsAdminAccess } from "@/constants/functions";
import { nextAuthSessionType } from "@/constants/types";
import { authOptions } from "@/providers/AuthOptions";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session: nextAuthSessionType | null = await getServerSession(
    authOptions
  );

  let userData = null;
  let proxySettings = null;
  let userProxyData = null;

  try {
    userData = await getUserDetailsAdminAccess(session?.user?.email || "");

    proxySettings = await fetch(
      `https://api.infiniteproxies.com/v1/reseller/proxy_settings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.RESELLER_API_KEY || "",
        },
      }
    ).then((res) => res.json());
    userProxyData = await fetch(
      `https://api.infiniteproxies.com/v1/reseller/sub_users/view_single?username=${session?.user?.username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.RESELLER_API_KEY || "",
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    console.log("[PROXY GENERATOR PAGE] ERROR: ", error);
  }
  return (
    <div className="h-full w-full">
      {userData?.userPlans?.residential ? (
        <ProxyGeneratorPage
          proxySettings={proxySettings}
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
