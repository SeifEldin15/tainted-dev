import { getUserDetailsAdminAccess } from "@/constants/functions";
import {
  SERVER_ERROR_RESPONSES,
  SERVER_SUCCESS_RESPONSES,
} from "@/constants/Messages";
import { ResponseObjectType, nextAuthSessionType } from "@/constants/types";
import { authOptions } from "@/providers/AuthOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
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

    const user = await getUserDetailsAdminAccess(session?.user?.email);
    const userResellerId = user?.userCoreResiPlans?.[0]?.userResellerId;

    if (!userResellerId) {
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

    // sending the requset to reset password of infinite proxy for current user
    const data = await fetch(
      `https://app-api.geonode.com/api/reseller/user/whitelisted-ips/${userResellerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "r-api-key": process.env.GEONODE_RESELLER_API_KEY as string,
        },
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
