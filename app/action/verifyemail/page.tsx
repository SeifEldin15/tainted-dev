import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/providers/AuthOptions";
import { redirect } from "next/navigation";
import { nextAuthSessionType } from "@/constants/types";
import VerifyEmail from "./VerifyEmail";
import { getUserDetailsAdminAccess } from "@/constants/functions";

const Page = async () => {
  const session: nextAuthSessionType | null = await getServerSession(
    authOptions
  );

  // if session not exists redirect user to login page
  // if session exists but user is verified then redirect user to dashboard

  if (!session) {
    redirect("/login");
  } else if (session) {
    const userData = await getUserDetailsAdminAccess(session?.user?.email);

    if (userData?.isVerified) {
      redirect("/dashboard");
    }
  }

  //@ts-ignore
  return <VerifyEmail sessionData={session} />;
};

export default Page;
