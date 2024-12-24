import { NextResponse } from "next/server";
import { ResponseObjectType } from "@/constants/types";
import { connectToDatabase } from "@/prisma/serverConnector";
import {
  SERVER_ERROR_RESPONSES,
  SERVER_SUCCESS_RESPONSES,
} from "@/constants/Messages";
import bcrypt from "bcrypt";
import prisma from "@/prisma";
import { RegisterFormValues } from "@/constants/types";
import { verifyRecaptcha } from "@/constants/functions";
import { v4 as uuidv4 } from "uuid";
import { sendVerifyEmailCode } from "@/components/emailTemplates/EmailFunctions";

export const POST = async (request: Request) => {
  try {
    // Seprating the values from the request body
    const {
      username,
      email,
      password,
      confirmpassword,
      terms,
      recaptcha,
    }: RegisterFormValues = await request.json();

    // If Details are not present in the request body then return the response error to the user
    if (!username || !email || !password || !confirmpassword) {
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

    // if there is no recaptcha token then return error response to the user
    if (!recaptcha) {
      // Returning the error response to the user
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.invalidRecaptcha.message,
          messageCode: SERVER_ERROR_RESPONSES.invalidRecaptcha.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.invalidRecaptcha.status }
      );
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptcha);

    // if recaptcha is not valid then return error response to the user
    if (!isRecaptchaValid?.success) {
      // Returning the error response to the user
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.invalidRecaptcha.message,
          messageCode: SERVER_ERROR_RESPONSES.invalidRecaptcha.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.invalidRecaptcha.status }
      );
    }

    // if terms are not accepted then return error response to the user
    if (!terms) {
      // Returning the error response to the user
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.termsNotAccepted.message,
          messageCode: SERVER_ERROR_RESPONSES.termsNotAccepted.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.termsNotAccepted.status }
      );
    }

    // If password and confirm password are not same then return the response error to the user
    if (password !== confirmpassword) {
      // Returning the error response to the user
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

    // checking if user email already exists in the database
    const isEmailExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // if email already exists then return error response to the user
    if (isEmailExists) {
      // Returning the error response to the user
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.emailAlreadyExists.message,
          messageCode: SERVER_ERROR_RESPONSES.emailAlreadyExists.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.emailAlreadyExists.status }
      );
    }

    // Additional check to see if the username is in a list of strings
    const usernameList = [
      "eclipse_testing2",
      "eclipse_HXKDddCy",
      "eclipse_EWULJLKQ",
      "eclipse_ELXCnOVq",
      "eclipse_kmLBFqHl",
      "eclipse_URKIoBTa",
      "eclipse_BIygjCtj",
      "eclipse_YhKaCimP",
      "eclipse_cmvJuLni",
      "eclipse_pDSCwZuy",
      "eclipse_GtQOpbmo",
      "eclipse_ArDurUuz",
      "eclipse_qXZPGIFI",
      "eclipse_REIYtfNU",
      "eclipse_mcaJZqUa",
      "eclipse_testing10",
      "eclipse_testlegion",
      "TaintUser",
      "eclipse_Opus",
      "eclipse_Manny123",
      "eclipse_kQwfrsbQ",
      "eclipse_ngwUZVuK",
      "eclipse_testing5",
      "eclipse_YYAvUrpK",
      "eclipse_FsSXoDvW",
      "eclipse_TeBDLJfy",
    ];

    // Checking if the username is in the list
    const isUsernameInList = usernameList.includes(`eclipse_${username}`);

    // checking if username already exists in the database
    const isUsernameExists = await prisma.user.findUnique({
      where: {
        username: `eclipse_${username}`,
      },
    });

    // if username already exists then return error response to the user
    if (isUsernameExists || isUsernameInList) {
      // Returning the error response to the user
      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.usernameAlreadyExists.message,
          messageCode: SERVER_ERROR_RESPONSES.usernameAlreadyExists.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.usernameAlreadyExists.status }
      );
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generating the verify OTP for the user
    const verifyOTP = `VERIFY-EMAIL-${uuidv4()}`;
    // if everthing is fine then add user to the database
    const newUser = await prisma.user.create({
      data: {
        username: `eclipse_${username}`,
        email: email,
        hashedPassword: hashedPassword,
        image: "https://i.imgur.com/oXRpx5s.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        termsAccepted: terms,
        verifyOTP: verifyOTP,
        userPlans: {
          create: {
            datacenter_shared: false,
            datacenter_unmetered: false,
            mobile_proxies: false,
            residential: false,
            ipv6: false,
          },
        },
      },
    });

    // Sending the verification email to the user beacuse user is added to the database
    if (newUser) {
      // Sending the verification email to the user
      await sendVerifyEmailCode({
        email: email,
        username: username,
        validationCode: verifyOTP,
      });
    }

    // Returning the success response to the user
    return NextResponse.json<ResponseObjectType>(
      {
        status: "success",
        message: SERVER_SUCCESS_RESPONSES.registerSuccess.message,
        messageCode: SERVER_SUCCESS_RESPONSES.registerSuccess.messageCode,
        data: newUser,
      },
      { status: SERVER_SUCCESS_RESPONSES.registerSuccess.status }
    );
  } catch (error) {
    // console logging the error for debugging purpose
    console.log("REGISTER ROUTE ERROR:", error);

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
