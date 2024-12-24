import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthSessionType } from "@/constants/types";
import { authOptions } from "@/providers/AuthOptions";
import DashboardPage from "@/components/dashboard/pages/dashboard/DashboardPage";
import { connectToDatabase } from "@/prisma/serverConnector";
import prisma from "@/prisma";

const Page = async () => {
  const session: nextAuthSessionType | null = await getServerSession(
    authOptions
  );

  return <DashboardPage session={session} />;
};

export default Page;
