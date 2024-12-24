export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
  recaptcha: string | null;
  terms: boolean;
}

export interface ResponseObjectType {
  status: "success" | "error";
  message: string;
  messageCode: string;
  data: any | null;
}

export interface sendVerifyEmailCodeType {
  email: string;
  username: string;
  validationCode: string;
}

export interface resetPasswordEmailType {
  email: string;
  resetPasswordLink: string;
}

export interface confirmationMailType {
  username: string;
  email: string;
}

export interface nextAuthSessionType {
  user: {
    id: string;
    image: string;
    email: string;
    username: string;
    termsAccepted: boolean;
    createdAt: string;
    updatedAt: string;
    isVerified: boolean;
    role: string;
  };
}

export interface verifyEmailAddressType {
  email: string;
  validationCode: string;
}

export interface forgotPasswordType {
  email: string;
}

export interface resetPasswordType {
  resetPasswordCode: string;
  password: string;
  confirmpassword: string;
}

export interface CouponType {
  code: string;
  discount: number;
  ipv4_resi?: boolean;
  ipv6_dc?: boolean;
}
