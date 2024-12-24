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
import React, { Fragment, useState } from "react";
import { Form, Formik } from "formik";
import { resetPasswordSchema } from "@/constants/FormSchema";
import { ArrowRight, Loader } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { PROMISE_MESSAGES } from "@/constants/Messages";
import { resetPasswordType } from "@/constants/types";
import { resetPassword } from "@/constants/functions";
import { useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [isSendingData, setIsSendingData] = useState(false);

  const initialValues = {
    password: "",
    confirmpassword: "",
    resetPasswordCode: code ? code : "",
  };

  //  Functions to run on submit
  const onSubmit = async (values: resetPasswordType) => {
    // console.log("VERIFY EMAIL PAGE :", values);

    setIsSendingData(true);

    // promise to check failed or successfully api response hit
    let promise = new Promise(async (resolve, reject) => {
      if (!code) {
        return reject("Invalid code");
      }
      // sending data to the server
      const response = await resetPassword({
        ...values,
        resetPasswordCode: code,
      });

      // checking if response is success or error
      if (response?.status === "success") {
        // if success
        resolve(response?.message);
        setIsSendingData(false);
      } else {
        // if error
        reject(response?.message);
        setIsSendingData(false);
      }
    });

    // if success then show toast to user
    toast
      .promise(promise, {
        loading: PROMISE_MESSAGES.resetPassword.loading,
        success: (msg: any) => PROMISE_MESSAGES.resetPassword.success(msg),
        error: (err: any) => PROMISE_MESSAGES.resetPassword.error(err),
      })
      .then(() => {
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }, 3000);
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
        onSubmit={onSubmit}
        validationSchema={resetPasswordSchema}
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
                    Reset Your Password
                  </CardTitle>
                  <CardDescription>
                    Update your password to continue.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
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
                        <span>Update</span>
                        <ArrowRight size={14} />
                      </>
                    ) : (
                      <Loader size={20} className="animate-spin" />
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          </Fragment>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
