import { Resend } from "resend";
import VerifyEmailCodeTemplate from "./verifyEmailCode";
import {
  confirmationMailType,
  resetPasswordEmailType,
  sendVerifyEmailCodeType,
} from "@/constants/types";
import { ResetPasswordTemplate } from "./ResetPasswordTemplate";
import ResetPasswordConfirmationTemplate from "./ResetPasswordConfirmationTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerifyEmailCode = async ({
  email,
  username,
  validationCode,
}: sendVerifyEmailCodeType) => {
  try {
    console.log(
      "sendVerifyEmailCode :",
      process.env.EMAIL_DOMAIN,
      email,
      username,
      validationCode
    );

    const data = await resend.emails.send({
      from: `EclipseProxy Verfication <email@${process.env.EMAIL_DOMAIN}>`,
      to: [email],
      subject: "Verify your email for EclipseProxy!",
      react: VerifyEmailCodeTemplate({
        username: username,
        validationCode: validationCode,
      }),
    });

    console.log("[SERVER] sendVerifyEmailCode :", data);

    return data;
  } catch (error) {
    console.error("sendVerifyEmailCode Error :", error);

    return false;
  }
};
export const sendResetPasswordLinkEmail = async ({
  email,
  resetPasswordLink,
}: resetPasswordEmailType) => {
  try {
    console.log(
      "reset password link :",
      process.env.EMAIL_DOMAIN,
      resetPasswordLink
    );

    const data = await resend.emails.send({
      from: `EclipseProxy Password Reset <email@${process.env.EMAIL_DOMAIN}>`,
      to: [email],
      subject: "Reset your password for EclipseProxy!",
      react: ResetPasswordTemplate({
        resetPasswordLink,
      }),
    });

    console.log("[SERVER] send reset password link :", data);

    return data;
  } catch (error) {
    console.error("send reset password link Error :", error);

    return false;
  }
};

export const passwordResetConfirmationkEmail = async ({
  email,
  username,
}: confirmationMailType) => {
  try {
   
    const data = await resend.emails.send({
      from: `EclipseProxy Password Reset Confirmation <email@${process.env.EMAIL_DOMAIN}>`,
      to: [email],
      subject: "Password successfully reset for EclipseProxy!",
      react: ResetPasswordConfirmationTemplate({
        username
      }),
    });

    console.log("[SERVER] send reset password link :", data);

    return data;
  } catch (error) {
    console.error("send reset password link Error :", error);

    return false;
  }
};
