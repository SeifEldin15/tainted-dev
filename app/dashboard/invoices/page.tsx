import InvoicesPage from "@/components/dashboard/pages/invoices/InvoicesPage";
import { nextAuthSessionType } from "@/constants/types";
import prisma from "@/prisma";
import { connectToDatabase } from "@/prisma/serverConnector";
import { authOptions } from "@/providers/AuthOptions";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session: nextAuthSessionType | null = await getServerSession(
    authOptions
  );

  let user = null;

  try {
    // connecting to the database
    await connectToDatabase();

    user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
      include: {
        invoices: {
          include: {
            status_history: true,
          },
        },
      },
    });
  } catch (error) {
    console.log("[INVOICE PAGE] ERROR: ", error);
  } finally {
    await prisma.$disconnect();
  }

  return <InvoicesPage session={session} user={user} />;
  // return <InvoicesPage />;
};

export default Page;
