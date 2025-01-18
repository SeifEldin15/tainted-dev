"use client";

import React, { useEffect, useState } from "react";
import { Bitcoin, Layers, MapPin, Users } from "lucide-react";
import DashboardCard from "../../comps/dashboard/Card";
import DashboardChart from "../../comps/dashboard/DashboardChart";
import Annoucements from "../../comps/dashboard/Annoucements";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardPage = ({ session, proxieData, userData }: any) => {
  const [UserData, setUserData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUserData(data);
    })();
  }, []);

  let BandwidthUsed = UserData?.data?.proxyUsage?.data?.total_bandwidth
      ?.toString()
      ?.split(".")[0];

  let BandwidthRemaining = UserData?.data?.proxyData?.data?.balance
      ?.toString()
      ?.split(".")[0];

  let CoreBandwidth = UserData?.data?.coreData;

  // Get and round the total spent
  const totalSpent = getUserSpent(UserData?.data?.user);
  const roundedSpent = totalSpent ? totalSpent.toFixed(2) : "0.00";

  let cards: Array<
      | { icon: React.JSX.Element; id: number; title: string; value: any }
      | { icon: React.JSX.Element; id: number; title: string; value: 0 | number }
      | { icon: React.JSX.Element; id: number; title: string; value: string }
  >;


  if (UserData?.data?.proxyData?.data?.balance > 0) {
    cards = [
      {
        id: 1,
        title: "Core Residential Bandwidth",
        value: UserData && `${CoreBandwidth}`,
        icon: <Bitcoin size={18} />,
      },
      {
        id: 2,
        title: "Residential Bandwidth",
        value: UserData && `${formatBandwidth(BandwidthRemaining)}`,
        icon: <Bitcoin size={18} />,
      },
      {
        id: 3,
        title: "Active Datacenter Plans",
        value: getUserPlans(UserData?.data?.user) &&
            getUserPlans(UserData?.data?.user),
        icon: <Layers size={18} />,
      },
      {
        id: 4,
        title: "Total Spent",
        value: `$ ${roundedSpent}`,
        icon: <MapPin size={18} />,
      },
    ];
  } else {
    cards = [
      {
        id: 1,
        title: "Core Residential Bandwidth",
        value: UserData && `${CoreBandwidth}`,
        icon: <Bitcoin size={18} />,
      },
      {
        id: 2,
        title: "Active Datacenter Plans",
        value: getUserPlans(UserData?.data?.user) &&
            getUserPlans(UserData?.data?.user),
        icon: <Layers size={18} />,
      },
      {
        id: 3,
        title: "Total Spent",
        value: `$ ${roundedSpent}`,
        icon: <MapPin size={18} />,
      },
      {
        id: 4,
        title: "Total Orders",
        value:
            getUserOrders(UserData?.data?.user) &&
            getUserOrders(UserData?.data?.user),
        icon: <Users size={18} />,
      },
    ];
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-5 h-full ">
      {/* Accouments */}
      <Annoucements />
      {/* Greetings Text */}
      <div className="flex flex-col gap-[10px]">
        <div className="text-[20px] sm:text-[24px] font-semibold text-gray-900">
          <span>{`Welcome, `}</span>
          <span>{`${session?.user?.username.replace("eclipse_", "")}!`}</span>
          <span>{`🌞`}</span>
        </div>
        <div className="text-xs text-gray-900">{`Thank you for being a customer!`}</div>
      </div>
      {/* Dashboard Content */}
      <div className="flex flex-col gap-[16px] pb-3 sm:pb-5">
        {/* Cards */}
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          {cards?.map((card, index) => (
              <DashboardCard key={index} {...card} />
          ))}
        </div>
        {/* charts & Store Visits */}
        <div className="w-full flex flex-col lg:flex-row gap-[16px]">
          {/* Chart */}

          {/* charts & Store Visits */}
          <div className="w-full flex flex-col lg:flex-row gap-[16px]">
            {/* Chart */}
            <div className="w-full">
              <DashboardCard title="Core Residential Bandwidth Usage">
                <div className="mt-4 text-sm text-gray-900 relative">
                  {UserData?.dataa?.proxyUsage?.data?.stats ? (
                      <DashboardChart chartData={UserData?.dataa?.proxyUsage?.data?.stats}/>
                  ) : (
                      <Skeleton className="w-full h-[350px]"/>
                  )}

                  {/* Coming Soon Overlay */}
                  <div
                      className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 text-gray-900 font-semibold text-xl">
                    Coming Soon
                  </div>
                </div>
              </DashboardCard>
            </div>

          </div>

        </div>

        {BandwidthRemaining > 0 && (
            <div className="w-full">
              <DashboardCard title="Residential Bandwidth Usage">
                <div className="mt-4 text-sm text-gray-900">
                  {UserData?.data?.proxyUsage?.data?.stats ? (
                      <DashboardChart chartData={UserData?.data?.proxyUsage?.data?.stats} />
                  ) : (
                      <Skeleton className="w-full h-[350px]" />
                  )}
                </div>
              </DashboardCard>
            </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

function getUserSpent(user: any) {
  let total = 0;

  if (!user?.invoices) return null;

  user?.invoices?.forEach((invoice: any) => {
    if (invoice?.status === "COMPLETED") {
      total += Number(invoice?.planPrice);
    }
  });

  return total;
}

function getUserOrders(user: any) {
  let total = 0;

  if (!user?.invoices) return null;

  user?.invoices?.forEach((invoice: any) => {
    if (invoice?.status === "COMPLETED") {
      total++;
    }
  });

  return total;
}

function getUserPlans(user: any) {
  let activeIPv4Plans = 0;
  let activeIPv6Plans = 0;

  // Check for active IPv4 plans
  if (user?.userIPv4Plans) {
    user.userIPv4Plans.forEach((plan: any) => {
      // Assuming a condition like expiration date comparison to determine active plans
      if (new Date(plan.expires_at) > new Date()) {
        activeIPv4Plans++;
      }
    });
  }

  // Check for active IPv6 plans
  if (user?.userIPv6Plans) {
    user.userIPv6Plans.forEach((plan: any) => {
      // Assuming a condition like expiration date comparison to determine active plans
      if (new Date(plan.expires_at) > new Date()) {
        activeIPv6Plans++;
      }
    });
  }

  return (activeIPv4Plans + activeIPv6Plans);
}


// function to change MB to GB if the value is greater than 1000
function formatBandwidth(value: number) {
  if (value > 1000) {
    return `${(value / 1000).toFixed(2)} GB`;
  }
  return `${value ? value : 0} MB`;
}
