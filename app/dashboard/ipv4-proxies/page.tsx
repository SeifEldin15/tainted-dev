import IPV4Page from "@/components/dashboard/pages/purchase/IPV4Page";
import { nextAuthSessionType } from "@/constants/types";
import { authOptions } from "@/providers/AuthOptions";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session: nextAuthSessionType | null = await getServerSession(
    authOptions
  );

  return <IPV4Page session={session} />;
};

export default Page;
