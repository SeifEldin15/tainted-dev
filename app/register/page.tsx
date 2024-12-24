import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/providers/AuthOptions";
import { redirect } from "next/navigation";
import RegisterPage from "./Register";

const Page = async () => {
  const session = await getServerSession(authOptions);

  // if session exists then redirect user to dashboard
  if (session) {
    redirect("/dashboard");
  }

  return <RegisterPage />;
};

export default Page;
