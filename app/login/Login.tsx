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
import Link from "next/link";
import React, { Fragment, useState, useEffect, useRef } from "react"; 
import { Formik, Form } from "formik";
import { loginSchema } from "@/constants/FormSchema";
import { ArrowRight, Loader } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { CLIENT_ERROR_RESPONSES } from "@/constants/Messages";
import ReCAPTCHA from "react-google-recaptcha";

interface LoginFormValues {
  email: string;
  password: string;
  // recaptcha: string;  // commented out
}

const LoginPage = () => {
  // const recaptchaRef = useRef<ReCAPTCHA>(null);  // commented out
  const [isSendingData, setIsSendingData] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    // recaptcha: "",  // commented out
  };

  //  Functions to run on submit
  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsSendingData(true);
      
      console.log('Attempting login with values:', values);

      const loginStatus = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/dashboard",
        email: values.email,
        password: values.password,
      });

      console.log("Login status:", loginStatus);

      if (loginStatus?.status === 200) {
        toast.success("Login successful");
        window.location.href = loginStatus?.url || "/dashboard";
      } else if (loginStatus?.status === 401) {
        toast.error(CLIENT_ERROR_RESPONSES?.loginFailed?.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsSendingData(false);
    }
  };

  return (
    <div className="h-[100svh] w-full flex flex-row items-center px-5 dark:bg-gray-800">
      {/* REGISTER FORM */}
      <Formik
        onSubmit={onSubmit}
        validationSchema={loginSchema}
        initialValues={initialValues}
        enableReinitialize
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
            <Form noValidate className="w-full max-w-[500px] mx-auto z-[2]">
              <Card className="shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-black dark:text-white">
                    Login to <span className="text-brand">the account</span>
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Enter your email & password to login.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {/* EMAIL */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-black dark:text-white"
                      htmlFor="email"
                    >
                      <span>Email</span>
                      {errors.email ? (
                        <span className="pt-1 font-medium text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none text-white">
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
                      className="border-gray-200 dark:border-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 dark:bg-gray-700"
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
                        <span className="pt-1 font-medium text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none text-white">
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
                  {/* Comment out GOOGLE RECAPTCHA section
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
                  */}
                </CardContent>
                {/* SUBMIT LOGIN BUTTON */}
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full flex flex-row items-center gap-1.5 bg-brand hover:bg-brand/90 !text-black"
                    disabled={isSendingData}
                  >
                    {!isSendingData ? (
                      <>
                        <span>Login</span>
                        <ArrowRight size={14} />
                      </>
                    ) : (
                      <Loader size={20} className="animate-spin" />
                    )}
                  </Button>
                </CardFooter>
                <CardContent className="grid gap-4">
                  <div className="flex flex-col space-y-2">
                    <Link href={"/action/forgot-password"}>
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none text-brand peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline underline-offset-2 cursor-pointer"
                      >
                        Forgot Password?
                      </label>
                    </Link>
                    <Link href={"/register"}>
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none text-brand peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline underline-offset-2 cursor-pointer"
                      >
                        Don't have an account?
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

export default LoginPage;
