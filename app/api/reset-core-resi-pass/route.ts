import { purchasePlansTypes } from "@/constants/DashboardStrings";
import {
  SERVER_ERROR_RESPONSES,
  SERVER_SUCCESS_RESPONSES,
} from "@/constants/Messages";
import {
  getProxyPrice,
  getUserDetailsAdminAccess,
} from "@/constants/functions";
import { ResponseObjectType, nextAuthSessionType } from "@/constants/types";
import prisma from "@/prisma";
import { authOptions } from "@/providers/AuthOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

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

    // sending the requset to reset password of infinite proxy for current user
    const subUserObject = {
      password: uuid(),
    };

    const user = await getUserDetailsAdminAccess(session?.user?.email || "");
    const userResellerId = user?.userCoreResiPlans[0]?.userResellerId;

    const subUserResponse = await fetch(
      `https://app-api.geonode.com/api/reseller/user/${userResellerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "r-api-key": process.env.GEONODE_RESELLER_API_KEY || "",
        },
        body: JSON.stringify(subUserObject),
      }
    );

    if (!subUserResponse.ok) {
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.serverError.message,
          messageCode: SERVER_ERROR_RESPONSES.serverError.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.serverError.status }
      );
    }

    const subUserResponseData = await subUserResponse.json();
    // save updated password in the database
    await prisma.coreResiPlans.update({
      where: {
        userResellerId: userResellerId,
      },
      data: {
        password: subUserObject.password,
      },
    });

    // Returning the success response to the user beacuse status code is 200
    return NextResponse.json<ResponseObjectType>(
      {
        status: "success",
        message: SERVER_SUCCESS_RESPONSES.sucesss.message,
        messageCode: SERVER_SUCCESS_RESPONSES.sucesss.messageCode,
        data: subUserResponseData?.data,
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
