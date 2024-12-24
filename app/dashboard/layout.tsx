import React from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/providers/AuthOptions";
import { redirect } from "next/navigation";
import { nextAuthSessionType } from "@/constants/types";
import { getUserDetailsAdminAccess } from "@/constants/functions";
import Sidebar from "@/components/dashboard/main/Sidebar";
import DashboardHeader from "@/components/dashboard/main/DashboardHeader";

export const metadata: Metadata = {
  title: "Eclipse Proxy | Dashboard",
  description:
    "Unlock the web's full potential with ProxyPros! Browse securely, access global content, and enjoy lightning-fast speeds. Elevate your online experience today! ",
  icons: {
    icon: "https://i.imgur.com/uKp4INU.png",
  },
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: nextAuthSessionType | null = await getServerSession(
    authOptions
  );

  // console.log("DASHBOARD LAYOUT FUNCTION ENVOKED");

  // if session not exists redirect user to login page
  // if session exists but user is verified then redirect user to dashboard

  // ! Turning this function Off for now beacuse its reloading the user object everytime changes has been made
  let userData;
  if (!session) {
    redirect("/login");
  } else if (session) {
    userData = await getUserDetailsAdminAccess(session?.user?.email);
    if (!userData?.isVerified) {
      redirect("/action/verifyemail");
    }
  }

  return (
    <div className="flex h-[100svh] w-full flex-row overflow-hidden">
      {/* Sidebar */}
      <Sidebar oldcustomer={userData?.oldResiCustomer ?? false}/>
      {/* Dashboard */}
      <div className="flex flex-col h-full w-full">
        {/* Dashboard Header */}
        <DashboardHeader session={session} />
        {/* Page Content */}
        <div className="dashboard-page-height w-full p-3 sm:p-5 overflow-x-hidden noScrollBar">
          {/* min width 1200px */}
          <div className="h-full max-w-[1200px] mx-auto">
            {/* current Page Rendering  */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

// force page to dynamic rendering  app router

// export const dynamic = "force-dynamic";
