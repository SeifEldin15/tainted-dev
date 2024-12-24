import ResidentialPage from "@/components/dashboard/pages/purchase/ResidentialPage";
import { nextAuthSessionType } from "@/constants/types";
import { authOptions } from "@/providers/AuthOptions";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session: nextAuthSessionType | null = await getServerSession(
    authOptions
  );

  return <ResidentialPage session={session} />;
};

export default Page;
