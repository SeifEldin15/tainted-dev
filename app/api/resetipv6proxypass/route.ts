import { purchasePlansTypes } from "@/constants/DashboardStrings";
import {
  SERVER_ERROR_RESPONSES,
  SERVER_SUCCESS_RESPONSES,
} from "@/constants/Messages";
import { getProxyPrice } from "@/constants/functions";
import { ResponseObjectType, nextAuthSessionType } from "@/constants/types";
import { authOptions } from "@/providers/AuthOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { generateRandomString } from "@/utils/helpers";
import prisma from "@/prisma";

export const POST = async (request: Request) => {
  try {
    // checking session is available or not
    const session: nextAuthSessionType | null = await getServerSession(
      authOptions
    );

    // if session is not available then returning the error response
    if (!session) {
      // Returning the error response to the user
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.unauthorized.message,
          messageCode: SERVER_ERROR_RESPONSES.unauthorized.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.unauthorized.status }
      );
    }

    // Seprating the values from the request body
    const { planId }: any = await request.json();

    // if the request body is empty then returning the error response
    if (!planId) {
      // Returning the error response to the user
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

    const password = generateRandomString(10);

    const urlencoded = new URLSearchParams();
    urlencoded.append("password", password);
    // sending the requset to reset password of infinite proxy for current user
    const response = await fetch(
      `https://us1.proxylogic.org/changepassword/${planId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PROXYLOGIC_API_KEY}`,
        },
        body: urlencoded,
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      // update ipv6 plan password
      await prisma.iPv6Plans.update({
        where: { planId: planId },
        data: {
          password: password,
        },
      });
    }

    // Returning the success response to the user beacuse status code is 200
    return NextResponse.json<ResponseObjectType>(
      {
        status: "success",
        message: SERVER_SUCCESS_RESPONSES.sucesss.message,
        messageCode: SERVER_SUCCESS_RESPONSES.sucesss.messageCode,
        data: data,
      },
      { status: SERVER_SUCCESS_RESPONSES.sucesss.status }
    );
  } catch (error) {
    // console logging the error for debugging purpose
    console.log("RESET PROXY PASS ROUTE ERROR:", error);

    // Returning the error response to the user
    return NextResponse.json<ResponseObjectType>(
      {
        status: "error",
        message: SERVER_ERROR_RESPONSES.serverError.message,
        messageCode: SERVER_ERROR_RESPONSES.serverError.messageCode,
        data: error,
      },
      { status: SERVER_ERROR_RESPONSES.serverError.status }
    );
  }
};
