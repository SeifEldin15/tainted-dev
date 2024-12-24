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
import React, { Fragment, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "@/constants/FormSchema";
import { ArrowRight, Loader } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { CLIENT_ERROR_RESPONSES } from "@/constants/Messages";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [isSendingData, setIsSendingData] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  //  Functions to run on submit
  const onSubmit = async (values: LoginFormValues) => {
    // console.log("LOGIN :", values);

    // set is sending data to true
    setIsSendingData(true);

    const loginStatus = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/dashboard",
      email: values?.email,
      password: values?.password,
    });

    if (loginStatus?.status === 200) {
      toast.success("Login successful");
      // @ts-ignore
      // redirect user to dashboard
      window.location.href = loginStatus?.url;

      // set is sending data to false
      setIsSendingData(false);
    } else if (
      loginStatus?.status === 401 &&
      loginStatus?.error === "CredentialsSignin"
    ) {
      // set is sending data to false
      setIsSendingData(false);
      // show error message to user
      toast.error(CLIENT_ERROR_RESPONSES?.loginFailed?.message);
    }
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
        onSubmit={onSubmit}
        validationSchema={loginSchema}
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
                  <CardTitle className="text-2xl">
                    Login to the account
                  </CardTitle>
                  <CardDescription>
                    Enter your email & password to login.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {/* EMAIL */}
                  <div className="grid gap-2">
                    <Label
                        className="h-[15px] flex flex-row items-center justify-between"
                        htmlFor="email"
                    >
                      <span>Email</span>
                      {errors.email ? (
                          <span
                              className="pt-1 font-medium text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none">
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
                          <span
                              className="pt-1 font-medium text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none">
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
                </CardContent>
                {/* SUBMIT LOGIN BUTTON */}
                <CardFooter>
                  <Button
                      onClick={() => handleSubmit()}
                      type="submit"
                      className="w-full flex flex-row items-center gap-1.5"
                      disabled={isSendingData}
                  >
                    {!isSendingData ? (
                        <>
                          <span>Login</span>
                          <ArrowRight size={14}/>
                        </>
                    ) : (
                        <Loader size={20} className="animate-spin"/>
                    )}
                  </Button>
                </CardFooter>
                <CardContent className="grid gap-4">
                  <div className="flex flex-col space-y-2">
                    <Link href={"/action/forgot-password"}>
                      <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline underline-offset-2 cursor-pointer"
                      >
                        Forgot Password?
                      </label>
                    </Link>
                    <Link href={"/register"}>
                      <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline underline-offset-2 cursor-pointer"
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
