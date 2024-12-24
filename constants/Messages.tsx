export const SERVER_ERROR_RESPONSES = {
  userNotFound: {
    message: "User not found",
    messageCode: "USER_NOT_FOUND",
    status: 404,
  },

  invalidData: {
    message: "Please fill all the fields",
    messageCode: "INVALID_DATA",
    status: 422,
  },
  termsNotAccepted: {
    message: "Please accept the terms and conditions",
    messageCode: "TERMS_NOT_ACCEPTED",
    status: 422,
  },
  passwordMismatch: {
    message: "Password and confirm password do not match",
    messageCode: "PASSWORD_MISMATCH",
    status: 422,
  },
  serverError: {
    message: "Something went wrong",
    messageCode: "SERVER_ERROR",
    status: 500,
  },
  invalidRecaptcha: {
    message: "Invalid recaptcha token",
    messageCode: "INVALID_RECAPTCHA",
    status: 422,
  },
  emailAlreadyExists: {
    message: "Email already exists",
    messageCode: "EMAIL_ALREADY_EXISTS",
    status: 422,
  },
  usernameAlreadyExists: {
    message: "Username already exists",
    messageCode: "USERNAME_ALREADY_EXISTS",
    status: 422,
  },
  unauthorized: {
    message: "Unauthorized Access",
    messageCode: "UNAUTHORIZED",
    status: 401,
  },
  alreadyVerified: {
    message: "Email already verified",
    messageCode: "ALREADY_VERIFIED",
    status: 422,
  },
  invalidTokenCode: {
    message: "Invalid Token Code",
    messageCode: "INVALID_CODE",
    status: 422,
  },
  invalidSignature: {
    message: "Invalid Sellix Signature",
    messageCode: "INVALID_SELLIX_SIGNATURE",
    status: 422,
  },
  invalidPayload: {
    message: "Invalid Payload",
    messageCode: "INVALID_PAYLOAD",
    status: 422,
  },
  invalidCoupon: {
    message: "Invalid Coupon",
    messageCode: "INVALID_COUPON",
    status: 422,
  },
  notFound: {
    message: "Not Found",
    messageCode: "NOT_FOUND",
    status: 404,
  },
  linkExpired: {
    message: "Link expired",
    messageCode: "LINK_EXPIRED",
    status: 422,
  },
};

export const SERVER_SUCCESS_RESPONSES = {
  loginSuccess: {
    message: "Login successful",
    messageCode: "LOGIN_SUCCESS",
    status: 200,
  },
  registerSuccess: {
    message: "Registration successful",
    messageCode: "REGISTER_SUCCESS",
    status: 200,
  },
  forgotPasswordSuccess: {
    message: "Password reset link sent to your email",
    messageCode: "RESET_LINK_SUCCESS",
    status: 200,
  },
  resetPasswordSuccess: {
    message: "Password reset successfully",
    messageCode: "RESET_PASSWORD_SUCCESS",
    status: 200,
  },
  invoiceCreated: {
    message: "Invoice created successfully",
    messageCode: "INVOICE_CREATED",
    status: 200,
  },
  sucesss: {
    message: "Success",
    messageCode: "SUCCESS",
    status: 200,
  },
};

export const PROMISE_MESSAGES = {
  register: {
    loading: "Registering an amazing user",
    success: (successMessage: string) => {
      return successMessage;
    },
    error: (errorMessage: string) => {
      return errorMessage;
    },
  },
  verifyEmail: {
    loading: "Verifying your email",
    success: (successMessage: string) => {
      return `${successMessage}, Redirecting to dashboard in 5 seconds...`;
    },
    error: (errorMessage: string) => {
      return errorMessage;
    },
  },
  forgotPassword: {
    loading: "Looking for this user...",
    success: (successMessage: string) => {
      return successMessage;
    },
    error: (errorMessage: string) => {
      return errorMessage;
    },
  },
  resetPassword: {
    loading: "Resetting your password",
    success: (successMessage: string) => {
      return successMessage;
    },
    error: (errorMessage: string) => {
      return errorMessage;
    },
  },
  invoiceCreated: {
    loading: "Creating invoice for you",
    success: (successMessage: string) => {
      return `${successMessage}, Redirecting you to payment page`;
    },
    error: (errorMessage: string) => {
      return errorMessage;
    },
  },
  coupon: {
    loading: "Checking coupon",
    success: (successMessage: string) => {
      return successMessage;
    },
    error: (errorMessage: string) => {
      return errorMessage;
    },
  },
};

export const NEXTAUTH_ERROR_RESPONSES = {
  invalidCredentials: {
    message: "Invalid username or password",
    messageCode: "INVALID_CREDENTIALS",
    status: 401,
  },
  userNotFound: {
    message: "No user found with the given email address",
    messageCode: "USER_NOT_FOUND",
    status: 404,
  },
};

export const CLIENT_ERROR_RESPONSES = {
  loginFailed: {
    message: "Login failed! Please check your credentials",
    messageCode: "LOGIN_FAILED",
    status: 401,
  },
};
