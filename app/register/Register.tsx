"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { Form, Formik } from "formik";
import { registerSchema } from "@/constants/FormSchema";
import { ArrowRight, Loader } from "lucide-react";
import { RegisterFormValues } from "@/constants/types";
import Image from "next/image";
import { register } from "@/constants/functions";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import { PROMISE_MESSAGES } from "@/constants/Messages";

const RegisterPage = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formikRef = useRef<any>(null);
  const [isSendingData, setIsSendingData] = useState(false);

  // Inital Values for formik
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    recaptcha: "",
    terms: false,
  };

  const onSubmit = async (values: RegisterFormValues) => {
    // console.log("REGISTER :", values);

    // set is sending data to true
    setIsSendingData(true);

    let promise = new Promise(async function (resolve, reject) {
      // Sending Values to server
      const response = await register(values);

      // resolving the response from the server to the promise
      if (response?.status === "success") {
        resolve(response?.message);
        // Resetting the form and formik field too
        recaptchaRef?.current?.reset();
        formikRef?.current?.setFieldValue("recaptcha", null);
        formikRef?.current?.setFieldTouched("recaptcha", false);
        // set is sending data to false
        setIsSendingData(false);

        // Redirecting to login page
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else if (response?.status === "error") {
        reject(response?.message);
        // Resetting the form and formik field too
        recaptchaRef?.current?.reset();
        formikRef?.current?.setFieldValue("recaptcha", null);
        formikRef?.current?.setFieldTouched("recaptcha", false);
        // set is sending data to false
        setIsSendingData(false);
      }
    });

    // Showing Toast To User
    toast.promise(promise, {
      loading: PROMISE_MESSAGES.register.loading,
      success: (msg: any) => PROMISE_MESSAGES.register.success(msg),
      error: (err: any) => PROMISE_MESSAGES.register.error(err),
    });
  };

  return (
    <div className="h-[100svh] w-full flex flex-row items-center px-5 dark:bg-gray-800">
      {/* background */}
      <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 overflow-hidden z-[1] bg-black/40">
        <Image
          className="object-cover object-center w-full h-full opacity-[15%]"
          alt="Background"
          src={"/backgrounds/patternWaves.png"}
          width={1920}
          height={1080}
          draggable={false}
          unoptimized={true}
          priority
        />
      </div>
      {/* REGISTER FORM */}
      <Formik
        innerRef={formikRef}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <Fragment>
            <Form className="w-full max-w-[500px] mx-auto z-[2]">
              <Card className="shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-black dark:text-white">
                    Create an <span className="text-brand">account</span>
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Enter your email below to create your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {/* USERNAME */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-black dark:text-white"
                      htmlFor="username"
                    >
                      <span>Username</span>
                      {errors.username ? (
                        <span className="font-medium pt-1 text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none text-white">
                          {errors?.username}
                        </span>
                      ) : null}
                    </Label>
                    <Input
                      name="username"
                      onChange={handleChange("username")}
                      id="username"
                      type="text"
                      className="border-gray-200 dark:border-transparent text-black dark:text-white dark:bg-gray-700"
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-black dark:text-white"
                      htmlFor="email"
                    >
                      <span>Email</span>
                      {errors.email ? (
                        <span className="font-medium pt-1 text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none text-white">
                          {errors?.email}
                        </span>
                      ) : null}
                    </Label>
                    <Input
                      name="email"
                      onChange={handleChange("email")}
                      id="email"
                      type="email"
                      placeholder="johndoe@eclipseproxy.com"
                      className="border-gray-200 dark:border-transparent text-black dark:text-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-black dark:text-white"
                      htmlFor="password"
                    >
                      <span>Password</span>
                      {errors.password ? (
                        <span className="font-medium pt-1 text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none text-white">
                          {errors?.password}
                        </span>
                      ) : null}
                    </Label>
                    <Input
                      name="password"
                      onChange={handleChange("password")}
                      id="password"
                      type="password"
                      className="border-gray-200 dark:border-transparent text-black dark:text-white dark:bg-gray-700"
                    />
                  </div>
                  {/* CONFIRM PASSWORD */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-black dark:text-white"
                      htmlFor="confirmpassword"
                    >
                      <span>Confirm Password</span>
                      {errors.confirmpassword ? (
                        <span className="font-medium pt-1 text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none text-white">
                          {errors?.confirmpassword}
                        </span>
                      ) : null}
                    </Label>
                    <Input
                      name="confirmpassword"
                      onChange={handleChange("confirmpassword")}
                      id="confirmpassword"
                      type="password"
                      className="border-gray-200 dark:border-transparent text-black dark:text-white dark:bg-gray-700"
                    />
                  </div>
                  {/* ACCEPT TOS */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      name="terms"
                      onCheckedChange={(isChecked) =>
                        setFieldValue("terms", isChecked)
                      }
                      id="terms"
                    />
                    <label
                      htmlFor="terms"
                      className="h-[18px] cursor-pointer items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 justify-between flex flex-row w-full text-white"
                    >
                      Accept terms and conditions
                      {errors.terms ? (
                        <span className="font-medium pt-1 text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none text-white">
                          {errors?.terms}
                        </span>
                      ) : null}
                    </label>
                  </div>
                  {/* GOOGLE RECAPTCHA */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-center"
                      htmlFor="recaptcha"
                    >
                      {errors.recaptcha ? (
                        <span className="font-medium pt-1 text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none text-white">
                          {errors?.recaptcha}
                        </span>
                      ) : null}
                    </Label>
                    <div className="h-[80px] w-full flex items-center justify-center">
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                        ref={recaptchaRef}
                        onChange={(token) => setFieldValue("recaptcha", token)}
                        theme="light"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleSubmit()}
                    type="submit"
                    className="w-full flex flex-row items-center gap-1.5 bg-brand hover:bg-brand/90 !text-black"
                    disabled={isSendingData}
                  >
                    {!isSendingData ? (
                      <>
                        <span>Register</span>
                        <ArrowRight size={14} />
                      </>
                    ) : (
                      <Loader size={20} className="animate-spin" />
                    )}
                  </Button>
                </CardFooter>
                <CardContent className="grid gap-4">
                  <div className="flex items-center space-x-2">
                    <Link href={"/login"}>
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none text-brand peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline underline-offset-2 cursor-pointer"
                      >
                        Already have an account?
                      </label>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Form>
          </Fragment>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
