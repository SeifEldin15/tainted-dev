import { ResponseObjectType } from "@/constants/types";
import prisma from "@/prisma";
import { connectToDatabase } from "@/prisma/serverConnector";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    // return to the user
    return NextResponse.json<ResponseObjectType>(
      {
        status: "success",
        message: "Webhook Received",
        messageCode: "WEBHOOK_RECEIVED",
        data: "user",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  } finally {
    // await prisma.$disconnect();
  }
};
