import { NextResponse } from "next/server";
import { ResponseObjectType, resetPasswordType } from "@/constants/types";
import { connectToDatabase } from "@/prisma/serverConnector";
import {
  SERVER_ERROR_RESPONSES,
  SERVER_SUCCESS_RESPONSES,
} from "@/constants/Messages";
import bcrypt from "bcrypt";
import prisma from "@/prisma";
import { v4 as uuidv4 } from "uuid";
import { passwordResetConfirmationkEmail } from "@/components/emailTemplates/EmailFunctions";

export const POST = async (request: Request) => {
  try {
    // Seprating the values from the request body
    const { password, confirmpassword, resetPasswordCode }: resetPasswordType =
      await request.json();

    // If Details are not present in the request body then return the response error to the user
    if (!resetPasswordCode || !password || !confirmpassword) {
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

    if (password !== confirmpassword) {
      // Returning the error response
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.passwordMismatch.message,
          messageCode: SERVER_ERROR_RESPONSES.passwordMismatch.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.passwordMismatch.status }
      );
    }

    // connecting to the database
    await connectToDatabase();

    // checking if user exists in the database
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordCode: resetPasswordCode,
      },
    });

    // if user not exists then return error response
    if (!user) {
      // Returning the error response
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.linkExpired.message,
          messageCode: SERVER_ERROR_RESPONSES.linkExpired.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.linkExpired.status }
      );
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update the user with the verification code
    const updatedUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        hashedPassword: hashedPassword,
        resetPasswordCode: uuidv4(),
        // linkExpiry: "",
      },
    });

    // sending password reset link to the user
    if (updatedUser) {
      await passwordResetConfirmationkEmail({
        email: updatedUser.email,
        username: updatedUser.username,
      });
    }

    // Returning the success response to the user
    return NextResponse.json<ResponseObjectType>(
      {
        status: "success",
        message: SERVER_SUCCESS_RESPONSES.resetPasswordSuccess.message,
        messageCode: SERVER_SUCCESS_RESPONSES.resetPasswordSuccess.messageCode,
        data: updatedUser,
      },
      { status: SERVER_SUCCESS_RESPONSES.resetPasswordSuccess.status }
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
