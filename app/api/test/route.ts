import prisma from "@/prisma";
import { connectToDatabase } from "@/prisma/serverConnector";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  // connecting to the database
  await connectToDatabase();

  // await prisma.user.update({
  //   where: { email: "test@test.com" },
  //   data: {
  //     userPlans: {
  //       update: {
  //         data: {
  //           ipv6: true,
  //         },
  //       },
  //     },
  //   },
  // });

  // checking if user email already exists in the database
  const isEmailExists = await prisma.user.findUnique({
    where: {
      email: "test@test.com",
    },
    include: {
      userPlans: true,
      invoices: true,
      userIPv6Plans: true,
    },
  });

  // Returning the success response to the user
  return NextResponse.json(
    {
      status: "success",
      message: "hourrrrrrryea",
      messageCode: "ok server success response",
      data: isEmailExists,
    },
    { status: 200 }
  );
};
