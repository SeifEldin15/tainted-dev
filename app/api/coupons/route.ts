import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { convertURLSearchParamsToObject } from "@/utils/helpers";
import { ResponseObjectType } from "@/constants/types";
import {
  SERVER_ERROR_RESPONSES,
  SERVER_SUCCESS_RESPONSES,
} from "@/constants/Messages";

export const POST = async (request: NextRequest) => {
  // Validate
  const body = await request.json();
  const code = body.code;
  const from = body.from;
  if (!code || !from) {
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

  // Get the coupon
  const coupon = await prisma.coupon.findFirst({
    where: {
      code: code,
      [from]: true,
    },
  });

  if (!coupon) {
    return NextResponse.json<ResponseObjectType>(
      {
        status: "error",
        message: SERVER_ERROR_RESPONSES.notFound.message,
        messageCode: SERVER_ERROR_RESPONSES.notFound.messageCode,
        data: null,
      },
      { status: SERVER_ERROR_RESPONSES.notFound.status }
    );
  }

  return NextResponse.json<ResponseObjectType>(
    {
      status: "success",
      message: SERVER_SUCCESS_RESPONSES.sucesss.message,
      messageCode: SERVER_SUCCESS_RESPONSES.sucesss.messageCode,
      data: coupon,
    },
    { status: 200 }
  );
};
