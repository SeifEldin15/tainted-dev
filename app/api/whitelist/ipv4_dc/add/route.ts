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
    const { username, ip }: any = await request.json();

    // if the request body is empty then returning the error response
    if (!username || !ip) {
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

    // sending the requset to reset password of infinite proxy for current user
    const data = await fetch(
      `https://api.infiniteproxies.com/v2/reseller/sub_users/ip_authentication`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.RESELLER_API_KEY || "",
        },
        body: JSON.stringify({ username: username, ip, product: "dcp" }),
      }
    ).then((res) => res.json());

    // Returning the success response to the user beacuse status code is 200
    return NextResponse.json<ResponseObjectType>(
      {
        status: "success",
        message: SERVER_SUCCESS_RESPONSES.sucesss.message,
        messageCode: SERVER_SUCCESS_RESPONSES.sucesss.messageCode,
        data: data?.data,
      },
      { status: SERVER_SUCCESS_RESPONSES.sucesss.status }
    );
  } catch (error) {
    // console logging the error for debugging purpose
    console.log("IP WHITELIST ERROR:", error);

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
