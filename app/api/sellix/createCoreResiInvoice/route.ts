import { purchasePlansTypes } from "@/constants/DashboardStrings";
import {
  SERVER_ERROR_RESPONSES,
  SERVER_SUCCESS_RESPONSES,
} from "@/constants/Messages";
import { getCoreResiProxyPrice } from "@/constants/functions";
import { ResponseObjectType, nextAuthSessionType } from "@/constants/types";
import prisma from "@/prisma";
import { authOptions } from "@/providers/AuthOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface createSellixInvoiceTypes {
  title: string;
  gateway: null;
  gateways: null;
  value: number;
  currency: "USD" | "EUR";
  quantity: number;
  email: string;
  custom_fields: {} | any;
  webhook?: string;
  white_label: boolean;
  return_url?: string;
}

export const POST = async (request: Request) => {
  try {
    // Seprating the values from the request body
    const { name, type, totalGB, coupon }: purchasePlansTypes =
      await request.json();

    // if the request body is empty then returning the error response
    if (!name || !type || !totalGB) {
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

    // now creating the invoice

    let targetCoupon = null;
    let planPrice = getCoreResiProxyPrice(Number(totalGB));
    if (coupon) {
      // checking if the coupon is valid or not
      targetCoupon = await prisma.coupon.findFirst({
        where: {
          code: coupon,
          ipv4_resi: true,
        },
      });

      if (!targetCoupon) {
        // Returning the error response to the user
        return NextResponse.json<ResponseObjectType>(
          {
            status: "error",
            message: SERVER_ERROR_RESPONSES.invalidCoupon.message,
            messageCode: SERVER_ERROR_RESPONSES.invalidCoupon.messageCode,
            data: null,
          },
          { status: SERVER_ERROR_RESPONSES.invalidCoupon.status }
        );
      }
      // if the coupon is valid then we will calculate the price after applying the coupon
      planPrice = planPrice - (planPrice * (targetCoupon?.percent || 0)) / 100;
    }

    const customFieldData = {
      username: session?.user?.username,
      email: session?.user?.email,
      planType: type,
      planName: name,
      planPrice: planPrice,
      planGB: totalGB,
      days: 30,
      couponId: targetCoupon?.id || null,
    };

    const invoice: createSellixInvoiceTypes = {
      title: `${name} | ${type}`,
      gateway: null,
      gateways: null,
      value: planPrice,
      currency: "USD",
      quantity: 1,
      email: session?.user?.email,
      custom_fields: customFieldData,
      webhook: process.env.WEBHOOK,
      white_label: false,
      return_url: process.env.RETURN_URL,
    };

    // creating the invoice by sending request to sellix api
    const response = await fetch(
      `${process.env.SELLIX_API_BASE_URL}/payments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SELLIX_API_KEY}`,
          "Content-Type": "application/json",
          "X-Sellix-Merchant": process.env.SELLIX_SHOP_NAME || "",
        },
        body: JSON.stringify(invoice),
      }
    );

    // getting the response from the sellix api
    const data = await response.json();

    if (data.status !== 200) {
      // Returning the error response to the user
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: data.error || SERVER_ERROR_RESPONSES.serverError.message,
          messageCode: SERVER_ERROR_RESPONSES.serverError.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.serverError.status }
      );
    }

    // Returning the success response to the user beacuse status code is 200
    return NextResponse.json<ResponseObjectType>(
      {
        status: "success",
        message: SERVER_SUCCESS_RESPONSES.invoiceCreated.message,
        messageCode: SERVER_SUCCESS_RESPONSES.invoiceCreated.messageCode,
        data: data?.data,
      },
      { status: SERVER_SUCCESS_RESPONSES.invoiceCreated.status }
    );
  } catch (error) {
    // console logging the error for debugging purpose
    console.log("SELLIX CREATE INVOICE ROUTE ERROR:", error);

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
