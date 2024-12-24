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
import { forgotPasswordSchema } from "@/constants/FormSchema";
import { ArrowRight, Loader } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { PROMISE_MESSAGES } from "@/constants/Messages";
import { forgotPasswordType } from "@/constants/types";
import { forgotPassword } from "@/constants/functions";

const ForgotPassword = () => {
  const [isSendingData, setIsSendingData] = useState(false);

  const initialValues = {
    email: "",
  };

  //  Functions to run on submit
  const onSubmit = async (values: forgotPasswordType) => {
    // console.log("VERIFY EMAIL PAGE :", values);

    setIsSendingData(true);

    // promise to check failed or successfully api response hit
    let promise = new Promise(async (resolve, reject) => {
      // sending data to the server
      const response = await forgotPassword(values);

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
    toast.promise(promise, {
      loading: PROMISE_MESSAGES.forgotPassword.loading,
      success: (msg: any) => PROMISE_MESSAGES.forgotPassword.success(msg),
      error: (err: any) => PROMISE_MESSAGES.forgotPassword.error(err),
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
        validationSchema={forgotPasswordSchema}
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
                    Enter your email address and we will send you a password
                    reset link.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {/* EMAIL */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between"
                      htmlFor="email"
                    >
                      <span>Your Email</span>
                      {errors.email ? (
                        <span className="pt-1 font-medium text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none">
                          {errors?.email}
                        </span>
                      ) : null}
                    </Label>
                    <Input
                      name="email"
                      onChange={handleChange("email")}
                      defaultValue={values.email}
                      id="email"
                      type="email"
                      placeholder="johndoe@eclipseproxy.com"
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
                        <span>Send</span>
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

export default ForgotPassword;
