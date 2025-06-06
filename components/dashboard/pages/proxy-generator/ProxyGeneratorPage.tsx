"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CountrySelectField } from "../../comps/proxy-generator/CountrySelectField";
import { RegionSelectField } from "../../comps/proxy-generator/RegionSelectField";
import { CitySelectField } from "../../comps/proxy-generator/CitySelectField";
import { FormatSelectField } from "../../comps/proxy-generator/FormatSelectField";
import React, { Fragment, useState, useRef } from "react";
import { Formik, Form } from "formik";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { DownloadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ProtocolSelectField } from "@/components/dashboard/comps/proxy-generator/ProtocolSelectField";

const ProxyGeneratorPage = ({ proxySettings, userProxyData }: any) => {
  //console.log("PROXY GENERATOR PROXY SETTINGS :", proxySettings);
  //console.log("PROXY GENERATOR USER PROXY DATA :", userProxyData);

  const [generatedProxies, setGeneratedProxies] = useState<any>(``);
  const router = useRouter();

  const formRef = useRef<any>(null);

  const initialValues = {
    geoTarget: "",
    isRotating: true,
    generateAmount: 1,
    stickySession: 30,
    protocol: "http",
    format: "hostname:port:username:password",
  };

  const onSubmit = async (values: any) => {
    // console.log("PROXY GENERATOR VALUES :", values);

    const { format, generateAmount, geoTarget, isRotating, stickySession } =
      formRef?.current?.values;

    const proxyPassword = userProxyData?.data?.proxy_authkey + geoTarget;
    const proxyUsername = userProxyData?.data?.username;
    const proxyPort = 1111;
    const proxyHostname = `ipv4.eclipseproxy.com`;
    const proxyProtocol = values.protocol;

    if (isRotating) {
      let proxyList = [];
      for (let i = 0; i < generateAmount; i++) {
        proxyList.push(
          getRotatingFormatedProxy({
            hostname: proxyHostname,
            port: proxyPort,
            username: proxyUsername,
            password: proxyPassword,
            format: format,
            protocol: proxyProtocol,
          })
        );
      }
      setGeneratedProxies(proxyList.join("\n"));
    } else {
      let proxyList = [];
      for (let i = 0; i < generateAmount; i++) {
        proxyList.push(
          getStickyFormatedProxy({
            hostname: proxyHostname,
            port: proxyPort,
            username: proxyUsername,
            password: proxyPassword,
            stickySession: stickySession,
            format: format,
            protocol: proxyProtocol,
          })
        );
      }
      setGeneratedProxies(proxyList.join("\n"));
    }
  };

  const handleResetProxyPass = async () => {
    const response = await fetch("/api/resetproxypass", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    // console.log("RESET PROXY PASS RESPONSE :", response);
    if (response?.status == "success") {
      toast.success("Proxy Password Reset Successfully");
      // router refresh to get the new password
      router.refresh();
    } else {
      toast.error("Error While Resetting Proxy Password");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-[10px]">
        <div className="text-[20px] sm:text-[24px] font-semibold text-gray-900">
          <span>{`Proxy Generator`}</span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-6 w-full h-full">
        {/* Generator Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg h-full border border-gray-300 dark:border-transparent shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden py-4 px-5 flex flex-col gap-2 lg:max-w-[400px] w-full mb-12">
          <div className="text-brand text-xl font-semibold">Generator Settings</div>
          <div className="h-[1px] bg-gray-100 dark:bg-gray-700"></div>
          {/* Now The Main things */}
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            innerRef={formRef}
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
                <div className="mt-4 flex flex-col gap-6">
                  {/* Rotating or sticky */}
                  <div className="flex flex-row items-center justify-center gap-4">
                    <Label
                      className={cn(
                        !values?.isRotating ? "opacity-100" : "opacity-40",
                        "h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                      )}
                    >
                      <span>Sticky</span>
                    </Label>
                    <Switch
                      defaultChecked={values?.isRotating}
                      onCheckedChange={(eValue) =>
                        setFieldValue("isRotating", eValue)
                      }
                      className="data-[state=checked]:bg-brand"
                    />
                    <Label
                      className={cn(
                        values?.isRotating ? "opacity-100" : "opacity-40",
                        "h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                      )}
                    >
                      <span>Rotating</span>
                    </Label>
                  </div>
                  {/* sticky session time */}
                  {values?.isRotating == false && (
                    <div className="grid gap-2">
                      <Label
                        className="h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                        htmlFor="stickySession"
                      >
                        <span>{`Session Time (in 1-120 Minutes)`}</span>
                      </Label>
                      <Input
                        value={values?.stickySession}
                        name="stickySession"
                        onChange={(event) => {
                          // @ts-ignore
                          if (event?.target?.value > 120) {
                            // set the formik value to 120
                            setFieldValue("stickySession", 120);
                          }
                          // @ts-ignore
                          if (event?.target?.value <= 120) {
                            // set the formik value to target value
                            setFieldValue(
                              "stickySession",
                              event?.target?.value
                            );
                          }
                        }}
                        id="stickySession"
                        type="number"
                        max={120}
                        min={1}
                        className="border-gray-300 dark:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-brand/20 focus:border-brand"
                      />
                    </div>
                  )}
                  {/* Country */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                      htmlFor="email"
                    >
                      <span>Country</span>
                    </Label>
                    <CountrySelectField
                      defaultSelectText="Select Country"
                      fieldData={proxySettings?.data?.countries}
                      FieldValue={values?.geoTarget}
                      setFieldValue={setFieldValue}
                      className="text-gray-900 dark:text-white hover:bg-brand/10"
                    />
                  </div>
                  {/* Region */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                      htmlFor="email"
                    >
                      <span>Region</span>
                    </Label>
                    <RegionSelectField
                      defaultSelectText="Select Region"
                      fieldData={proxySettings?.data?.region?.data}
                      FieldValue={values?.geoTarget}
                      setFieldValue={setFieldValue}
                      className="text-gray-900 dark:text-white hover:bg-brand/10"
                    />
                  </div>
                  {/* City */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                      htmlFor="email"
                    >
                      <span>City</span>
                    </Label>
                    <CitySelectField
                      defaultSelectText="Select Region"
                      fieldData={proxySettings?.data?.cities?.data}
                      FieldValue={values?.geoTarget}
                      setFieldValue={setFieldValue}
                      className="text-gray-900 dark:text-white hover:bg-brand/10"
                    />
                  </div>
                  {/* Protocol */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                      htmlFor="email"
                    >
                      <span>Protocol</span>
                    </Label>
                    <ProtocolSelectField
                      defaultSelectText="Select Protocol"
                      FieldValue={values?.protocol}
                      setFieldValue={setFieldValue}
                      className="text-gray-900 dark:text-white hover:bg-brand/10"
                    />
                  </div>
                  {/* Format */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                      htmlFor="email"
                    >
                      <span>Format</span>
                    </Label>
                    <FormatSelectField
                      defaultSelectText="Select Format"
                      FieldValue={values?.format}
                      setFieldValue={setFieldValue}
                      className="text-gray-900 dark:text-white hover:bg-brand/10"
                    />
                  </div>
                  {/* Amount to generate */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                      htmlFor="generateAmount"
                    >
                      <span>Amount To Generate</span>
                    </Label>
                    <Input
                      name="generateAmount"
                      value={values?.generateAmount}
                      onChange={handleChange("generateAmount")}
                      id="generateAmount"
                      className="border-gray-300 dark:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-brand/20 focus:border-brand"
                      type="number"
                    />
                  </div>
                  {/* Generate Button & proxy reset button*/}
                  <div className="flex flex-row gap-4">
                    <Button
                      className="bg-brand hover:bg-brand/90 text-black transition-all duration-300"
                      variant={"attention"}
                      onClick={handleResetProxyPass}
                    >
                      Reset Password
                    </Button>
                    <Button
                      onClick={() => handleSubmit()}
                      type="submit"
                      className="bg-brand hover:bg-brand/90 text-black transition-all duration-300"
                      variant={"brand"}
                    >
                      Generate Proxies
                    </Button>
                  </div>
                </div>
              </Fragment>
            )}
          </Formik>
        </div>
        {/* Generated Proxies */}
        <div className="bg-white dark:bg-gray-800 rounded-lg h-full border border-gray-300 dark:border-transparent shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden py-4 px-5 flex flex-col gap-2 w-full">
          <div className="text-brand text-xl font-semibold">Generated Proxies</div>
          <div className="h-[1px] bg-gray-100 dark:bg-gray-700"></div>
          <div className="mt-4 flex flex-col gap-6 h-full">
            {/* Hostname / IP for Pool Access */}
            <div className="grid gap-2">
              <Label
                className="h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                htmlFor="stickySession"
              >
                <span>{`Hostname / IP for Pool Access`}</span>
              </Label>
              <Input
                className="disabled:opacity-80 border-gray-300 dark:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-brand/20 focus:border-brand"
                defaultValue={`ipv4.eclipseproxy.com`}
                disabled={true}
              />
            </div>
            {/* Port */}
            <div className="grid gap-2">
              <Label
                className="h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                htmlFor="stickySession"
              >
                <span>{`Port`}</span>
              </Label>
              <Input
                className="disabled:opacity-80 border-gray-300 dark:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-brand/20 focus:border-brand"
                defaultValue={`1111 (http); 1112 (https); 2222 (socks5)`}
                disabled={true}
              />
            </div>
            {/* Your Username */}
            <div className="grid gap-2">
              <Label
                className="h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                htmlFor="stickySession"
              >
                <span>{`Your Username`}</span>
              </Label>
              <Input
                className="disabled:opacity-80 border-gray-300 dark:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-brand/20 focus:border-brand"
                defaultValue={userProxyData?.data?.username}
                disabled={true}
              />
            </div>
            {/* Your Proxy Password */}
            <div className="grid gap-2">
              <Label
                className="h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                htmlFor="stickySession"
              >
                <span>{`Your Proxy Password`}</span>
              </Label>
              <Input
                className="disabled:opacity-80 border-gray-300 dark:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-brand/20 focus:border-brand"
                value={userProxyData?.data?.proxy_authkey}
                disabled={true}
              />
            </div>
            {/* Generated Proxies */}
            <div className="flex flex-col gap-2 h-full">
              <Label
                className="h-[15px] flex flex-row items-center justify-between text-gray-900 dark:text-white"
                htmlFor="stickySession"
              >
                <span>{`Generated Proxies`}</span>
                <Button
                  onClick={() =>
                    downloadTextFile(
                      generatedProxies,
                      `${userProxyData?.data?.username}EclipseProxies.txt`
                    )
                  }
                  size={"xs"}
                  type="button"
                  className="flex flex-row items-center gap-2 rounded-sm bg-brand text-black hover:bg-brand/90 transition-all duration-300"
                >
                  <DownloadCloud size={12} />
                  <span>Save as file</span>
                </Button>
              </Label>
              <Textarea
                className="disabled:opacity-100 lg:h-full min-h-[200px] lg:min-h-fit flex-1 disabled:cursor-text border-gray-300 dark:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-brand/20 focus:border-brand"
                defaultValue={generatedProxies}
                placeholder="Click Generate Proxies to generate proxies"
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProxyGeneratorPage;

function getRotatingFormatedProxy({
  hostname,
  port,
  username,
  password,
  format,
  protocol,
}: any) {
  switch (protocol) {
    case "http":
      port = 1111;
      break;
    case "https":
      port = 1112;
      break;
    case "socks5":
      port = 2222;
      break;
    default:
      port = 1111; // default to HTTP if no protocol is specified
      break;
  }

  switch (format) {
    case "hostname:port:username:password":
      return `${hostname}:${port}:${username}:${password}`;
    case "username:password@hostname:port":
      return `${username}:${password}@${hostname}:${port}`;
    case "username:password:hostname:port":
      return `${username}:${password}:${hostname}:${port}`;
    default:
      return `${hostname}:${port}:${username}:${password}`;
  }
}

function getStickyFormatedProxy({
  hostname,
  port,
  username,
  password,
  stickySession,
  format,
  protocol,
}: any) {
  stickySession = `_lifetime-${stickySession}`;
  let session = `_session-${generateRandomString()}`;

  switch (protocol) {
    case "http":
      port = 1111;
      break;
    case "https":
      port = 1112;
      break;
    case "socks5":
      port = 2222;
      break;
    default:
      port = 1111; // default to HTTP if no protocol is specified
      break;
  }

  switch (format) {
    case "hostname:port:username:password":
      return `${hostname}:${port}:${username}:${
        password + session + stickySession
      }`;
    case "username:password@hostname:port":
      return `${username}:${
        password + session + stickySession
      }@${hostname}:${port}`;
    case "username:password:hostname:port":
      return `${username}:${
        password + session + stickySession
      }:${hostname}:${port}`;
    default:
      return `${hostname}:${port}:${username}:${
        password + session + stickySession
      }`;
  }
}

function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function downloadTextFile(content: any, fileName: any) {
  if (typeof window !== "undefined") {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    // Trigger the download
    link.click();

    // Clean up
    window.URL.revokeObjectURL(link.href);
  } else {
    alert("Error While Downloading File, Please use this feature in browser");
  }
}
