"use client";

import React from "react";
import { Crisp } from "crisp-sdk-web";

const CrispeProvider = () => {
  // installing crisp
  if (typeof window === "undefined") {
    console.log("");
  } else {
    window.addEventListener(
      "load",
      //   @ts-ignore
      Crisp.configure("a64ba73e-7ee4-41f4-abca-864b01d408a9"),
      false
    );
  }

  return <div></div>;
};

export default CrispeProvider;
