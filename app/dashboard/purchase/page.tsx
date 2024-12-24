import PurchasePage from "@/components/dashboard/pages/purchase/PurchasePage";
import { nextAuthSessionType } from "@/constants/types";
import { authOptions } from "@/providers/AuthOptions";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session: nextAuthSessionType | null = await getServerSession(
    authOptions
  );

  return <PurchasePage session={session} />;
};

export default Page;
