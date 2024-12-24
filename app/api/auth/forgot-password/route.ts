import { NextResponse } from "next/server";
import { ResponseObjectType, forgotPasswordType } from "@/constants/types";
import { connectToDatabase } from "@/prisma/serverConnector";
import {
  SERVER_ERROR_RESPONSES,
  SERVER_SUCCESS_RESPONSES,
} from "@/constants/Messages";
import prisma from "@/prisma";
import { v4 as uuidv4 } from "uuid";
import { sendResetPasswordLinkEmail } from "@/components/emailTemplates/EmailFunctions";

export const POST = async (request: Request) => {
  try {
    // Seprating the values from the request body
    const { email }: forgotPasswordType = await request.json();

    // If Details are not present in the request body then return the response error to the user
    if (!email) {
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

    // connecting to the database
    await connectToDatabase();

    // checking if user exists in the database
    const isUserExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // if user not exists then return error response
    if (!isUserExist) {
      // Returning the error response
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

    // Generating the verification code
    const uniqueCode = uuidv4();
    const resetPasswordLink = `https://eclipseproxy.com/action/reset-password?code=${uniqueCode}`;

    // update the user with the verification code
    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        resetPasswordCode: uniqueCode,
      },
    });

    // sending password reset link to the user
    if (updatedUser) {
      await sendResetPasswordLinkEmail({
        email: email,
        resetPasswordLink,
      });
    }

    // Returning the success response to the user
    return NextResponse.json<ResponseObjectType>(
      {
        status: "success",
        message: SERVER_SUCCESS_RESPONSES.forgotPasswordSuccess.message,
        messageCode: SERVER_SUCCESS_RESPONSES.forgotPasswordSuccess.messageCode,
        data: updatedUser,
      },
      { status: SERVER_SUCCESS_RESPONSES.forgotPasswordSuccess.status }
    );
  } catch (error) {
    // console logging the error for debugging purpose
    console.log("FORGOT PASSWORD ROUTE ERROR:", error);

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
