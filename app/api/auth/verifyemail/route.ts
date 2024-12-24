import { NextResponse } from "next/server";
import {
  ResponseObjectType,
  nextAuthSessionType,
  verifyEmailAddressType,
} from "@/constants/types";
import { SERVER_ERROR_RESPONSES } from "@/constants/Messages";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/providers/AuthOptions";
import { connectToDatabase } from "@/prisma/serverConnector";

export const POST = async (request: Request) => {
  try {
    // seprating the value from the request body
    const { email, validationCode }: verifyEmailAddressType =
      await request.json();

    // if email or validationCode is not present in the request body then return the error response to the user
    if (!email || !validationCode) {
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

    // getting user session from the nextauth session
    const session: nextAuthSessionType | null = await getServerSession(
      authOptions
    );

    // if session is not present in the request then return the error response to the user
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

    // now beacuse session exists
    // we will check if body email and session email are same or not

    if (session?.user?.email !== email) {
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

    // connecting to the database
    await connectToDatabase();

    // now we will check if the user is already verified or not
    // if the user is already verified then return the error response to the user
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (user?.isVerified) {
      // Returning the error response to the user
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.alreadyVerified.message,
          messageCode: SERVER_ERROR_RESPONSES.alreadyVerified.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.alreadyVerified.status }
      );
    }

    // now we will check if the validation code is same or not
    // if the validation code is not same then return the error response to the user
    if (user?.verifyOTP !== validationCode) {
      // Returning the error response to the user
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.invalidTokenCode.message,
          messageCode: SERVER_ERROR_RESPONSES.invalidTokenCode.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.invalidTokenCode.status }
      );
    }

    // now we will update the user as verified beacuse all the conditions are satisfied and also remove the verifyOTP from the user
    const updatedUser = await prisma.user.update({
      where: {
        email: session?.user?.email,
      },
      data: {
        isVerified: true,
        verifyOTP: "",
      },
    });

    // Returning the success response to the user
    return NextResponse.json<ResponseObjectType>(
      {
        status: "success",
        message: "Email verified successfully",
        messageCode: "EMAIL_VERIFIED_SUCCESSFULLY",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    // console logging the error for debugging purpose
    console.log("VERIFY EMAIL ROUTE ERROR:", error);

    // Returning the error response to the user
    return NextResponse.json<ResponseObjectType>(
      {
        status: "error",
        message: SERVER_ERROR_RESPONSES.serverError.message,
        messageCode: SERVER_ERROR_RESPONSES.serverError.messageCode,
        data: null,
      },
      { status: SERVER_ERROR_RESPONSES.serverError.status }
    );
  } finally {
    // disconnecting from the database
    await prisma.$disconnect();
  }
};
