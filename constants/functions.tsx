import prisma from "@/prisma";
import {
  RegisterFormValues,
  forgotPasswordType,
  resetPasswordType,
  verifyEmailAddressType,
} from "./types";
import { purchasePlansTypes } from "./DashboardStrings";
import { createHmac, timingSafeEqual } from "crypto";
import { connectToDatabase } from "@/prisma/serverConnector";

// function to get discounted price
export const getProxyPrice = (GBcount: number) => {
  // pricing in usd
  let price = 2;
  if (GBcount > 25 && GBcount < 50) {
    price = 1.9;
  } else if (GBcount >= 50 && GBcount < 100) {
    price = 1.8;
  } else if (GBcount >= 100 && GBcount < 150) {
    price = 1.7;
  } else if (GBcount >= 150 && GBcount < 350) {
    price = 1.6;
  } else if (GBcount >= 350) {
    price = 1.5;
  }
  // Calculating the discounted price
  let discountedPrice = GBcount * price;
  // Rounding to the closest cent
  discountedPrice = Math.round(discountedPrice * 100) / 100;
  // Returning the rounded discounted price
  return discountedPrice;
};

export const getCoreResiProxyPrice = (GBcount: number) => {
  // Pricing levels in USD
  let pricePerGB = 1.75; // Default starting price
  if (GBcount > 100 && GBcount <= 200) {
    pricePerGB = 1.70; // Level 1
  } else if (GBcount > 200 && GBcount <= 300) {
    pricePerGB = 1.65; // Level 2
  } else if (GBcount > 300 && GBcount <= 400) {
    pricePerGB = 1.60; // Level 3
  } else if (GBcount > 400 && GBcount <= 500) {
    pricePerGB = 1.55; // Level 4
  } else if (GBcount > 500) {
    pricePerGB = 1.50; // Cap price at 500+ GB
  }

  // Calculate total price
  let totalPrice = GBcount * pricePerGB;

  // Round to the nearest cent
  totalPrice = Math.round(totalPrice * 100) / 100;

  // Return the rounded total price
  return totalPrice;
};


export const IPv4PricingInfo: {
  threads: number;
  prices: {
    day: number;
    week: number;
    twoweek: number;
    month: number;
    threeMonths: number;
  };
}[] = [
  {
    threads: 400,
    prices: {
      day: 3.49,
      week: 23.25,
      twoweek: 44.0,
      month: 89.0,
      threeMonths: 249.0,
    },
  },
  {
    threads: 500,
    prices: {
      day: 4.29,
      week: 29.0,
      twoweek: 54.0,
      month: 109.0,
      threeMonths: 309.0,
    },
  },
  {
    threads: 1000,
    prices: {
      day: 7.99,
      week: 53.0,
      twoweek: 97.0,
      month: 199.0,
      threeMonths: 559.0,
    },
  },
];

export const IPv6PricingInfo: {
  threads: number;
  prices: { week: number; month: number; threeMonths: number };
}[] = [
  { threads: 100, prices: { week: 5, month: 19, threeMonths: 49 } }, // 3.8x weekly
  { threads: 250, prices: { week: 10, month: 39, threeMonths: 99 } }, // 3.9x weekly
  { threads: 500, prices: { week: 20, month: 79, threeMonths: 199 } }, // 3.95x weekly
  { threads: 1000, prices: { week: 30, month: 109, threeMonths: 299 } }, // 3.63x weekly
  { threads: 5000, prices: { week: 50, month: 199, threeMonths: 499 } }, // 4x weekly
  { threads: 100000, prices: { week: 90, month: 299, threeMonths: 799 } }, // 3.32x weekly
];

// function to get IPv4 Proxy Pricing
export const getIPv4ProxyPrice = (threadCount: number, days: number) => {
  // check if thread count and days are valid
  if (threadCount <= 0 || days <= 0) return 0;
  if (threadCount < 400) threadCount = 400;
  // find the pricing info for the given thread count
  const pricing = IPv4PricingInfo.find((p) => p.threads === threadCount);

  // get the price for the given days
  let price = 0;

  // check if pricing info is found
  if (pricing) {
    if (days === 7) {
      price = pricing.prices.week;
    } else if (days === 30) {
      price = pricing.prices.month;
    } else if (days === 90) {
      price = pricing.prices.threeMonths;
    } else if (days === 1) {
      price = pricing.prices.day;
    } else if (days === 14) {
      price = pricing.prices.twoweek;
    }
  } else {
    let cost = days * 1.75 + (threadCount - 400) * 0.004 * days;

    if (cost < 4) {
      cost *= 2;
    } else if (cost < 25) {
      cost *= 1.9;
    } else if (cost < 50) {
      cost *= 1.8;
    } else if (cost < 125) {
      cost *= 1.7;
    } else if (cost < 375) {
      cost *= 1.6;
    } else {
      cost *= 1.5;
    }

    price = cost;
  }

  // return the price
  return price;
};

export const getCustomIPv4ProxyPrice = (threadCount: number, days: number) => {
  console.log({ threadCount, days });
  if (threadCount === 0 || days === 0) return 0;
  if (threadCount < 0 || days < 0) return 0;

  let price = getIPv4ProxyPrice(threadCount, days);

  console.log({ price });

  return price;
};

// function to get IPv6 Proxy Pricing
export const getIPv6ProxyPrice = (threadCount: number, days: number) => {
  // check if thread count and days are valid
  if (threadCount <= 0 || days <= 0) return 0;

  // find the pricing info for the given thread count
  const pricing = IPv6PricingInfo.find((p) => p.threads === threadCount);

  // check if pricing info is found
  if (!pricing) return 0;

  // get the price for the given days
  let price = 0;

  if (days === 7) {
    price = pricing.prices.week;
  } else if (days === 30) {
    price = pricing.prices.month;
  } else if (days === 90) {
    price = pricing.prices.threeMonths;
  }

  // return the price
  return price;
};

export const verifyRecaptcha = async (recaptchaToken: string) => {
  // Checking if recaptcha token is valid or not
  const captchaResponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || "",
        response: recaptchaToken,
      }),
    }
  );

  const data = await captchaResponse.json();

  // console.log("[verifyRecaptcha] RESPONSE DATA :", data);

  return data;
};

export const register = async (values: RegisterFormValues) => {
  // Sending Values to server
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  // console.log("[register] RESPONSE DATA :", data);

  return data;
};

export const verifyEmail = async (values: verifyEmailAddressType) => {
  // Sending Values to server
  const response = await fetch("/api/auth/verifyemail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  // console.log("[verifyEmail] RESPONSE DATA :", data);

  return data;
};

export const forgotPassword = async (values: forgotPasswordType) => {
  // Sending Values to server
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  return data;
};

export const resetPassword = async (values: resetPasswordType) => {
  // Sending Values to server
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  return data;
};

export const getUserDetailsAdminAccess = async (email: string) => {
  try {
    // connecting to the database
    await connectToDatabase();

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        userPlans: true,
        userIPv6Plans: true,
        userIPv4Plans: true,
        userCoreResiPlans: true,
      },
    });

    // console.log("[getUserDetailsAdminAccess] RESPONSE DATA :", data);

    return user;
  } catch (err) {
    console.log("[getUserDetailsAdminAccess] RESPONSE ERROR :", err);
    return null;
  } finally {
    // disconnecting from database
    await prisma.$disconnect();
  }
};

export const createSellixInvoice = async (data: purchasePlansTypes) => {
  // Sending Values to server
  const response = await fetch("/api/sellix/createinvoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();

  // console.log("[createSellixInvoice] RESPONSE DATA :", res);

  return res;
};

export const createSellixIPV6Invoice = async (data: purchasePlansTypes) => {
  // Sending Values to server
  const response = await fetch("/api/sellix/createipv6invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();

  // console.log("[createSellixIPV6Invoice] RESPONSE DATA :", res);

  return res;
};

export const createSellixIPV4Invoice = async (data: purchasePlansTypes) => {
  // Sending Values to server
  const response = await fetch("/api/sellix/createipv4invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();

  // console.log("[createSellixIPV6Invoice] RESPONSE DATA :", res);

  return res;
};

export const createSellixCoreResiInvoice = async (data: purchasePlansTypes) => {
  // Sending Values to server
  const response = await fetch("/api/sellix/createCoreResiInvoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();

  // console.log("[createSellixIPV6Invoice] RESPONSE DATA :", res);

  return res;
};

export const validateSellixSignature = async (
  headerSignature: any,
  payload: any
) => {
  const secret: any = process.env.SELLIX_API_SECRET;

  // return false beacuse no signature or payload found
  if (!headerSignature || !payload) return false;

  // now if both are present we will match the signature
  const signature = createHmac("sha512", secret)
    .update(JSON.stringify(payload))
    .digest("hex");

  // now we will match if Eqauls returns true else false
  if (
    timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(headerSignature, "utf-8")
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const getCoupon = async (code: string, from: string) => {
  try {
    const response = await fetch(`/api/coupons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        from: from,
      }),
    });

    const res = await response.json();
    return res;
  } catch (error) {}
};
