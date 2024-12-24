import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/providers/AuthOptions";
import { redirect } from "next/navigation";
import LoginPage from "./Login";

const Page = async () => {
  const session = await getServerSession(authOptions);

  // if session exists then redirect user to dashboard
  if (session) {
    redirect("/dashboard");
  }

  return <LoginPage />;
};

export default Page;
