import {
  SERVER_ERROR_RESPONSES,
  SERVER_SUCCESS_RESPONSES,
} from "@/constants/Messages";
import { ResponseObjectType } from "@/constants/types";
import prisma from "@/prisma";
import { connectToDatabase } from "@/prisma/serverConnector";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { code, percent, ipv4_resi, ipv6_dc } = body;

    if (!code || !percent) {
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.invalidData.message,
          messageCode: SERVER_ERROR_RESPONSES.invalidData.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.invalidData.status }
      );
    }

    // connecting to the database
    await connectToDatabase();

    const newCoupon = await prisma.coupon.create({
      data: {
        code,
        percent,
        ipv4_resi,
        ipv6_dc,
      },
    });

    // creating the coupon
    return NextResponse.json<ResponseObjectType>(
      {
        status: "success",
        message: SERVER_SUCCESS_RESPONSES.sucesss.message,
        messageCode: SERVER_SUCCESS_RESPONSES.sucesss.messageCode,
        data: newCoupon,
      },
      { status: SERVER_SUCCESS_RESPONSES.registerSuccess.status }
    );
  } catch (error) {
  } finally {
    // disconnecting from the database
    await prisma.$disconnect();
  }
}
