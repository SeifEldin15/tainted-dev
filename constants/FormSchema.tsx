import * as Yup from "yup";
import { EMAIL_REGEX, PASSWORD_REGEX } from "./Values";

// Form Schema for register form
export const registerSchema = Yup.object({
  username: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z0-9]+$/, "No special characters allowed"),
  email: Yup.string()
    .required("Required")
    .matches(EMAIL_REGEX, "Not Valid Email"),
  password: Yup.string()
    .required("Required")
    .matches(PASSWORD_REGEX, "Should be more than 8 characters"),
  // Confirm Password should match with password
  confirmpassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  // recaptcha: Yup.string().required("Required Recaptcha"),
  terms: Yup.boolean().oneOf([true], "Required"),
});

// Form Schema for login form
export const loginSchema = Yup.object({
  email: Yup.string()
    .required("Required")
    .matches(EMAIL_REGEX, "Not Valid Email"),
  password: Yup.string()
    .required("Required")
    .matches(PASSWORD_REGEX, "Should be more than 8 characters"),
  // recaptcha: Yup.string().required("Required"),
});

// Form Schema for login form
export const verifyEmailSchema = Yup.object({
  email: Yup.string()
    .required("Required")
    .matches(EMAIL_REGEX, "Not Valid Email"),
  validationCode: Yup.string().required("Required"),
});

// Form Schema for forgot password form
export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .required("Required")
    .matches(EMAIL_REGEX, "Not Valid Email"),
});

// Form Schema for reset password form
export const resetPasswordSchema = Yup.object({
  code: Yup.string(),
  password: Yup.string()
    .required("Required")
    .matches(PASSWORD_REGEX, "Should be more than 8 characters"),
  confirmpassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
