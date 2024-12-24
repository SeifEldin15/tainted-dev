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
    return NextResponse.json<ResponseObjectType>(
        {
            status: "error",
            message: SERVER_ERROR_RESPONSES.serverError.message,
            messageCode: SERVER_ERROR_RESPONSES.serverError.messageCode,
            data: null,
        },
        { status: SERVER_ERROR_RESPONSES.serverError.status }
    );
};
