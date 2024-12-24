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
    <div className="h-[100svh] w-full flex flex-row items-center px-5">
      {/* background */}
      <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 overflow-hidden z-[1]">
        <Image
          className="object-cover object-center w-full h-full opacity-[50%]"
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
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Create an account</CardTitle>
                  <CardDescription>
                    Enter your email below to create your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {/* USERNAME */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between"
                      htmlFor="username"
                    >
                      <span>Username</span>
                      {errors.username ? (
                        <span className="font-medium pt-1 text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none">
                          {errors?.username}
                        </span>
                      ) : null}
                    </Label>
                    <Input
                      name="username"
                      onChange={handleChange("username")}
                      id="username"
                      type="text"
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between"
                      htmlFor="email"
                    >
                      <span>Email</span>
                      {errors.email ? (
                        <span className="font-medium pt-1 text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none">
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
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between"
                      htmlFor="password"
                    >
                      <span>Password</span>
                      {errors.password ? (
                        <span className="font-medium pt-1 text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none">
                          {errors?.password}
                        </span>
                      ) : null}
                    </Label>
                    <Input
                      name="password"
                      onChange={handleChange("password")}
                      id="password"
                      type="password"
                    />
                  </div>
                  {/* CONFIRM PASSWORD */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between"
                      htmlFor="confirmpassword"
                    >
                      <span>Confirm Password</span>
                      {errors.confirmpassword ? (
                        <span className="font-medium pt-1 text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none">
                          {errors?.confirmpassword}
                        </span>
                      ) : null}
                    </Label>
                    <Input
                      name="confirmpassword"
                      onChange={handleChange("confirmpassword")}
                      id="confirmpassword"
                      type="password"
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
                      className="h-[18px] cursor-pointer items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 justify-between flex flex-row w-full"
                    >
                      Accept terms and conditions
                      {errors.terms ? (
                        <span className="font-medium pt-1 text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none">
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
                        <span className="font-medium pt-1 text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none">
                          {errors?.recaptcha}
                        </span>
                      ) : null}
                    </Label>
                    <div className="h-[80px] w-full flex items-center justify-center">
                      <ReCAPTCHA
                        sitekey={
                          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                        }
                        ref={recaptchaRef}
                        onChange={(token) => setFieldValue("recaptcha", token)}
                        theme="dark" // Add this line to set the dark theme
                      />
                    </div>
                  </div>
                </CardContent>
                {/* SUBMIT REGISTER BUTTON */}
                <CardFooter>
                  <Button
                    onClick={() => handleSubmit()}
                    type="submit"
                    className="w-full flex flex-row items-center gap-1.5"
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
                  {/* Already have an account?*/}
                  <div className="flex items-center space-x-2">
                    <Link href={"/login"}>
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline underline-offset-2 cursor-pointer"
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
