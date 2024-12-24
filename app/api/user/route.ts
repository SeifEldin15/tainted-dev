import { purchasePlansTypes } from "@/constants/DashboardStrings";
import {
  SERVER_ERROR_RESPONSES,
  SERVER_SUCCESS_RESPONSES,
} from "@/constants/Messages";
import { ResponseObjectType, nextAuthSessionType } from "@/constants/types";
import prisma from "@/prisma";
import { connectToDatabase } from "@/prisma/serverConnector";
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

    const returnObject: {
      user: any;
      proxyUsage: any;
      proxyData: any;
      coreData: any;
    } = {
      user: null,
      proxyUsage: null,
      proxyData: null,
        coreData: null,
    };

    // Getting user data from Infinite Proxies
    const response = await fetch(
      `https://api.infiniteproxies.com/v1/reseller/sub_users/view_single?username=${session?.user?.username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.RESELLER_API_KEY || "",
        },
      }
    );

    returnObject.proxyData = await response.json();


    // getting user proxy usage
    // Getting user data from Infinite Proxies
    const proxyUsageResponse = await fetch(
      `https://api.infiniteproxies.com/v1/reseller/sub_users/view_txs?username=${session?.user?.username}&duration=10d&granularity=day`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.RESELLER_API_KEY || "",
        },
      }
    );

    returnObject.proxyUsage = await proxyUsageResponse.json();

    // connecting to the database
    await connectToDatabase();

    // Getting user data
    let user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
      include: {
        invoices: {
          include: {
            status_history: true,
          },
        },
          userIPv4Plans: true,
          userIPv6Plans: true,
          userCoreResiPlans: true,
      },
    });
    //console.log(user?.oldResiCustomer);
    //console.log(returnObject.proxyData);
    //console.log(returnObject.proxyData?.data?.balance > 0);
      if (user?.oldResiCustomer !== true) {
          if (returnObject.proxyData?.data?.balance > 0)
          {
              await prisma.user.update({
                  where: { email: session?.user?.email },
                  data: { oldResiCustomer: true },
              });
              user = await prisma.user.findUnique({
                  where: { email: session?.user?.email },
                  include: {
                      invoices: {
                          include: {
                              status_history: true,
                          },
                      },
                      userIPv4Plans: true,
                      userIPv6Plans: true,
                      userCoreResiPlans: true,
                  },
              });
          }
      }
      if (user?.oldResiCustomer == true) {
          if (returnObject.proxyData?.data?.balance === 0)
          {
              await prisma.user.update({
                  where: { email: session?.user?.email },
                  data: { oldResiCustomer: false },
              });
              user = await prisma.user.findUnique({
                  where: { email: session?.user?.email },
                  include: {
                      invoices: {
                          include: {
                              status_history: true,
                          },
                      },
                      userIPv4Plans: true,
                      userIPv6Plans: true,
                      userCoreResiPlans: true,
                  },
              });
          }
      }

    // Getting core resi bandiwdth
      if (user?.userCoreResiPlans?.length ?? 1 > 0) {
          const subUserResponse = await fetch(
              `https://app-api.geonode.com/api/reseller/user/traffic/${user?.userCoreResiPlans[0].userResellerId}`,
              {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                      "r-api-key": process.env.GEONODE_RESELLER_API_KEY as string,
                  },
              }
          );

          const userProxyData = await subUserResponse.json();

          // Get the usage and limit from the API response
          const usageBandwidth = userProxyData.data.usageBandwidth; // in bytes
          const trafficLimitInBytes = userProxyData.data.trafficLimitInBytes; // in bytes

          // Calculate the remaining bandwidth in bytes
          const remainingBytes = trafficLimitInBytes - usageBandwidth;

          // Convert bytes to MB
          const remainingMB = remainingBytes / (1000 * 1000);

          // If remaining bandwidth is less than 1 GB, show in MB (rounded to no decimals)
          if (remainingMB < 1000) {
              returnObject.coreData = Math.round(remainingMB) + " MB"; // No decimals for MB
          } else {
              // If remaining bandwidth is 1 GB or more, show in GB (rounded to 2 decimals)
              const remainingGB = remainingMB / 1000;
              returnObject.coreData = (Math.round(remainingGB * 100) / 100).toFixed(2) + " GB";
          }

      } else {
          returnObject.coreData = "0 MB";
      }


      // if user is not available then returning the error response
    if (!user) {
      // Returning the error response to the user
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.userNotFound.message,
          messageCode: SERVER_ERROR_RESPONSES.userNotFound.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.userNotFound.status }
      );
    }

    // @ts-ignore
    // if user is available then returning the success response
    returnObject.user = user;
    if (returnObject.user) returnObject.user.resetPasswordCode = undefined;
    // Returning the success response to the user beacuse status code is 200
    return NextResponse.json<ResponseObjectType>(
      {
        status: "success",
        message: SERVER_SUCCESS_RESPONSES.sucesss.message,
        messageCode: SERVER_SUCCESS_RESPONSES.sucesss.messageCode,
        data: returnObject,
      },
      { status: SERVER_SUCCESS_RESPONSES.sucesss.status }
    );
  } catch (error) {
    // console logging the error for debugging purpose
    // console.log("USER ROUTE ERROR:", error);

    // Returning the error response to the user
    return NextResponse.json<ResponseObjectType>(
      {
        status: "error",
        message: SERVER_ERROR_RESPONSES.serverError.message,
        messageCode: SERVER_ERROR_RESPONSES.serverError.messageCode,
        data: error, // sending the error to the user for debugging purpose
      },
      { status: SERVER_ERROR_RESPONSES.serverError.status }
    );
  } finally {
    // closing the connection
    await prisma.$disconnect();
  }
};
