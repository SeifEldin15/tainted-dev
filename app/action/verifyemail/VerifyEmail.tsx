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
import { verifyEmailSchema } from "@/constants/FormSchema";
import { ArrowRight, Loader } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { PROMISE_MESSAGES } from "@/constants/Messages";
import { verifyEmailAddressType } from "@/constants/types";
import { verifyEmail } from "@/constants/functions";
import { redirect, useSearchParams } from "next/navigation";

const VerifyEmail = ({ sessionData }: any) => {
  const searchParams = useSearchParams();

  const [isSendingData, setIsSendingData] = useState(false);

  const initialValues = {
    email: sessionData?.user?.email,
    validationCode: searchParams.get("token") || "",
  };

  //  Functions to run on submit
  const onSubmit = async (values: verifyEmailAddressType) => {
    // console.log("VERIFY EMAIL PAGE :", values);

    setIsSendingData(true);

    // promise to check failed or successfully api response hit
    let promise = new Promise(async (resolve, reject) => {
      // sending data to the server
      const response = await verifyEmail(values);

      // checking if response is success or error
      if (response?.status === "success") {
        // if success
        resolve(response?.message);
        setIsSendingData(false);
        // beacuse now email is verfied then redirect user to dashboard page after 5 seconds
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 4000);
      } else {
        // if error
        reject(response?.message);
        setIsSendingData(false);
      }
    });

    // if success then show toast to user
    toast.promise(promise, {
      loading: PROMISE_MESSAGES.verifyEmail.loading,
      success: (msg: any) => PROMISE_MESSAGES.verifyEmail.success(msg),
      error: (err: any) => PROMISE_MESSAGES.verifyEmail.error(err),
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
        validationSchema={verifyEmailSchema}
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
                    Verify your email address
                  </CardTitle>
                  <CardDescription>
                    {`Enter your token which you got in your email address, Check
                    Spam Section If you didnt get any email in inbox.`}
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
                      readOnly={true}
                      disabled={true}
                      id="email"
                      type="email"
                      placeholder="johndoe@eclipseproxy.com"
                    />
                  </div>
                  {/* Token */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between"
                      htmlFor="validationCode"
                    >
                      <span>Token</span>
                      {errors.validationCode ? (
                        <span className="pt-1 font-medium text-[11px] bg-red-500 py-0.5 px-1 rounded-[2px] select-none">
                          {errors?.validationCode}
                        </span>
                      ) : null}
                    </Label>
                    <Input
                      name="validationCode"
                      placeholder="Enter your token"
                      onChange={handleChange("validationCode")}
                      value={values?.validationCode}
                      id="validationCode"
                      type="validationCode"
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
                        <span>Verify</span>
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

export default VerifyEmail;
