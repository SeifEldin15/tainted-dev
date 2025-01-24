"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormatSelectField } from "../../comps/proxy-generator/FormatSelectField";
import React, { Fragment, useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { DownloadCloud } from "lucide-react";
import { Clipboard } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { StateSelectField } from "../../comps/proxy-generator/StateCoreResiSelectField";
import { CountryCoreResiSelectField } from "../../comps/proxy-generator/CountryCoreResiSelectField";
import { CityCorResiSelectField } from "../../comps/proxy-generator/CityCoreResiSelectField";
import { ProtocolCoreResiSelectField } from "../../comps/proxy-generator/ProtocolCoreResiSelectField";
import { hostname } from "os";

const ProxyGeneratorPage = ({ proxySettings, userProxyData }: any) => {

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [generatedProxies, setGeneratedProxies] = useState<any>(``);
  const [whitelistIps, setWhitelistIps] = useState<any>({
    ip1: "",
    ip2: "",
    ip3: "",
  });
  const router = useRouter();

  const formRef = useRef<any>(null);

  useEffect(() => {
    getWhitelistIps();
  }, []);

  useEffect(() => {}, []);

  const initialValues = {
    country: "",
    state: "",
    city: "",
    isRotating: true,
    generateAmount: 1,
    stickySession: 30,
    protocol: "http",
    format: "hostname:port:username:password",
  };

  async function getWhitelistIps() {
    const response = await fetch("/api/whitelist/core-resi/list");
    const responseData = await response.json();

    setWhitelistIps({
      ip1: responseData?.data?.[0]?.ip || "",
      ip2: responseData?.data?.[1]?.ip || "",
      ip3: responseData?.data?.[2]?.ip || "",
    });
  }

  const onSubmit = async (values: any) => {
    // console.log("PROXY GENERATOR VALUES :", values);

    const {
      format,
      generateAmount,
      isRotating,
      stickySession,
      country,
      state,
      city,
    } = formRef?.current?.values;

    const proxyPassword = userProxyData?.data?.authorization?.password;
    const proxyUsername = userProxyData?.data?.authorization?.username;
    const proxyPort = 9000;
    const proxyHostname = `core.eclipseproxy.com`;
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
            country,
            state,
            city,
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
            country,
            state,
            city,
          })
        );
      }
      setGeneratedProxies(proxyList.join("\n"));
    }
  };

  const handleResetProxyPass = async () => {
    toast.loading("Resetting Proxy Password");
    const response = await fetch("/api/reset-core-resi-pass", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    toast.dismiss();

    // console.log("RESET PROXY PASS RESPONSE :", response);
    if (response?.status == "success") {
      toast.success("Proxy Password Reset Successfully");
      // router refresh to get the new password
      router.refresh();
    } else {
      toast.error("Error While Resetting Proxy Password");
    }
  };

  const addWhitelistIp = async () => {
    for (const key in whitelistIps) {
      const ip = whitelistIps[key];
      if (ip && ip !== "") {
        toast.loading("Whitelisting IP");
        const response = await fetch("/api/whitelist/core-resi/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ip,
          }),
        }).then((res) => res.json());

        toast.dismiss();
        if (response?.status == "success") {
          toast.success("IP Whitelisted Successfully");
          getWhitelistIps();
          router.refresh();
        } else {
          toast.error("Error While Whitelisting IP");
        }
      }
    }
  };

  const removeWhitelistedIp = async (ip: string) => {
    if (ip && ip !== "") {
      toast.loading(`Removing ip ${ip}`);
      const response = await fetch("/api/whitelist/core-resi/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip,
        }),
      }).then((res) => res.json());

      toast.dismiss();
      if (response?.status == "success") {
        toast.success("IP Removed Successfully");
        getWhitelistIps();
        router.refresh();
      } else {
        toast.error("Error While Removing Whitelisted IP");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-[10px]">
        <div className="text-[20px] sm:text-[24px] font-semibold text-gray-900">
          <span>{`Proxy Generator`}</span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-6 w-full">
        {/* Generator Settings */}
        <div className="bg-white rounded-lg py-4 px-5 flex flex-col gap-2 lg:max-w-[400px] w-full border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-gray-900">Generator Settings</div>
          <div className="h-[1px] bg-gray-300"></div>
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
                        "h-[15px] flex flex-row items-center justify-between text-gray-900"
                      )}
                    >
                      <span>Sticky</span>
                    </Label>
                    <Switch
                      defaultChecked={values?.isRotating}
                      onCheckedChange={(eValue) =>
                        setFieldValue("isRotating", eValue)
                      }
                    />
                    <Label
                      className={cn(
                        values?.isRotating ? "opacity-100" : "opacity-40",
                        "h-[15px] flex flex-row items-center justify-between text-gray-900"
                      )}
                    >
                      <span>Rotating</span>
                    </Label>
                  </div>
                  {/* sticky session time */}
                  {values?.isRotating == false && (
                    <div className="grid gap-2">
                      <Label
                        className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                        htmlFor="stickySession"
                      >
                        <span>{`Session Time (in 1-120 Minutes)`}</span>
                      </Label>
                      <Input
                        className="border-gray-300 disabled:opacity-80 focus:ring-brand focus:border-brand"
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
                      />
                    </div>
                  )}
                  {/* Country */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                      htmlFor="email"
                    >
                      <span>Country</span>
                    </Label>
                    <CountryCoreResiSelectField
                      defaultSelectText="Select Country"
                      fieldData={proxySettings}
                      FieldValue={values?.country}
                      setFieldValue={setFieldValue}
                      setStates={setStates}
                    />
                  </div>
                  {/* Region */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                      htmlFor="email"
                    >
                      <span>State</span>
                    </Label>
                    <StateSelectField
                      defaultSelectText="Select State"
                      fieldData={states || []}
                      FieldValue={values?.state}
                      setFieldValue={setFieldValue}
                      setCities={setCities}
                    />
                  </div>
                  {/* City */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                      htmlFor="email"
                    >
                      <span>City</span>
                    </Label>
                    <CityCorResiSelectField
                      defaultSelectText="Select City"
                      fieldData={cities}
                      FieldValue={values?.city}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  {/* Protocol */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                      htmlFor="email"
                    >
                      <span>Protocol</span>
                    </Label>
                    <ProtocolCoreResiSelectField
                      defaultSelectText="Select Protocol"
                      FieldValue={values?.protocol}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  {/* Format */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                      htmlFor="email"
                    >
                      <span>Format</span>
                    </Label>
                    <FormatSelectField
                      defaultSelectText="Select Format"
                      FieldValue={values?.format}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  {/* Amount to generate */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                      htmlFor="generateAmount"
                    >
                      <span>Amount To Generate</span>
                    </Label>
                    <Input
                      className="border-gray-300 disabled:opacity-80 focus:ring-brand focus:border-brand"
                      name="generateAmount"
                      value={values?.generateAmount}
                      onChange={handleChange("generateAmount")}
                      id="generateAmount"
                      type="number"
                    />
                  </div>
                  {/* Generate Button & proxy reset button*/}
                  <div className="flex flex-row gap-4">
                    <Button
                      className="w-full bg-brand text-white hover:bg-brand/90 transition-all duration-300"
                      onClick={handleResetProxyPass}
                    >
                      Reset Password
                    </Button>
                    <Button
                      onClick={() => handleSubmit()}
                      type="submit"
                      className="w-full bg-brand text-white hover:bg-brand/90 transition-all duration-300"
                    >
                      Generate Proxies
                    </Button>
                  </div>
                </div>
              </Fragment>
            )}
          </Formik>

          {/* Whitelist IPs */}
          <div className="my-2">
            <div className="text-[16px] mb-2 text-gray-900">Whitelist IPs</div>
            <div className="h-[1px] bg-gray-300 mb-4"></div>

            <div className="flex flex-col gap-2">
              <div className="grid gap-2">
                <Label
                  className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                  htmlFor="stickySession"
                >
                  <span>{`IP 1`}</span>
                </Label>
                <div className="flex flex-col md:flex-row gap-2">
                  <Input
                    className="border-gray-300 disabled:opacity-80 focus:ring-brand focus:border-brand"
                    value={whitelistIps.ip1}
                    onChange={(e) =>
                      setWhitelistIps({ ...whitelistIps, ip1: e.target.value })
                    }
                  />

                  <Button
                    className="w-1/3"
                    variant={"attention"}
                    onClick={() => {
                      if (whitelistIps.ip1)
                        removeWhitelistedIp(whitelistIps.ip1);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label
                  className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                  htmlFor="stickySession"
                >
                  <span>{`IP 2`}</span>
                </Label>
                <div className="flex flex-col md:flex-row gap-2">
                  <Input
                    className="border-gray-300 disabled:opacity-80 focus:ring-brand focus:border-brand"
                    value={whitelistIps.ip2}
                    onChange={(e) =>
                      setWhitelistIps({ ...whitelistIps, ip2: e.target.value })
                    }
                  />
                  <Button
                    className="w-1/3"
                    variant={"attention"}
                    onClick={() => {
                      if (whitelistIps.ip1)
                        removeWhitelistedIp(whitelistIps.ip1);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label
                  className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                  htmlFor="stickySession"
                >
                  <span>{`IP 3`}</span>
                </Label>
                <div className="flex flex-col md:flex-row gap-2">
                  <Input
                    className="border-gray-300 disabled:opacity-80 focus:ring-brand focus:border-brand"
                    value={whitelistIps.ip3}
                    onChange={(e) =>
                      setWhitelistIps({ ...whitelistIps, ip3: e.target.value })
                    }
                  />
                  <Button
                    className="w-1/3"
                    variant={"attention"}
                    onClick={() => {
                      if (whitelistIps.ip1)
                        removeWhitelistedIp(whitelistIps.ip1);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <Button
                onClick={addWhitelistIp}
                size={"default"}
                type="button"
                className="flex flex-row items-center gap-2 rounded-sm my-2"
              >
                <span>Save</span>
              </Button>
            </div>
          </div>
        </div>
        {/* Generated Proxies */}
        <div className="bg-white rounded-lg py-4 px-5 flex flex-col gap-2 w-full border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-[16px] text-gray-900">Generator Settings</div>
          <div className="h-[1px] bg-gray-300"></div>
          <div className="mt-4 flex flex-col gap-6 h-full">
            {/* Hostname / IP for Pool Access */}
            <div className="grid gap-2">
              <Label
                  className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                  htmlFor="stickySession"
              >
                <span>{`Hostname / IP for Pool Access`}</span>
              </Label>
              <Input
                  className="border-gray-300 disabled:opacity-80 focus:ring-brand focus:border-brand"
                  defaultValue={"core.eclipseproxy.com"}
                  disabled={true}
              />
            </div>
            {/* Port */}
            <div className="grid gap-2">
              <Label
                  className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                  htmlFor="stickySession"
              >
                <span>{`Port`}</span>
              </Label>
              <Input
                  className="border-gray-300 disabled:opacity-80 focus:ring-brand focus:border-brand"
                  defaultValue={`9000/10000/11000/12000`}
                  disabled={true}
              />
            </div>
            {/* Your Username */}
            <div className="grid gap-2">
              <Label
                  className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                  htmlFor="stickySession"
              >
                <span>{`Your Username`}</span>
              </Label>
              <Input
                  className="border-gray-300 disabled:opacity-80 focus:ring-brand focus:border-brand"
                  defaultValue={userProxyData?.data?.authorization?.username}
                  disabled={true}
              />
            </div>
            {/* Your Proxy Password */}
            <div className="grid gap-2">
              <Label
                  className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                  htmlFor="stickySession"
              >
                <span>{`Your Proxy Password`}</span>
              </Label>
              <Input
                  className="border-gray-300 disabled:opacity-80 focus:ring-brand focus:border-brand"
                  value={userProxyData?.data?.authorization?.password}
                  disabled={true}
              />
            </div>
            {/* Generated Proxies */}
            <div className="flex flex-col gap-2 h-full">
              <Label
                  className="h-[15px] flex flex-row items-center justify-between text-gray-900"
                  htmlFor="stickySession"
              >
                <span>{`Generated Proxies`}</span>
                <div className="flex flex-row gap-x-2">
                  <Button
                      onClick={() =>
                          downloadTextFile(
                              generatedProxies,
                              `${userProxyData?.data?.authorization?.username} - Core Resi.txt`
                          )
                      }
                      size={"xs"}
                      type="button"
                      className="flex flex-row items-center gap-2 rounded-sm"
                  >
                    <DownloadCloud size={12}/>
                    <span>Save as file</span>
                  </Button>
                  <Button
                      onClick={() =>
                          copyToClipboard(
                              generatedProxies,
                          )
                      }
                      size={"xs"}
                      type="button"
                      className="flex flex-row items-center gap-2 rounded-sm"
                  >
                    <Clipboard size={12}/>
                    <span>Copy to Clipboard</span>
                  </Button>
                </div>
              </Label>

              <Textarea
                  className="border-gray-300 disabled:opacity-100 lg:h-full min-h-[200px] lg:min-h-fit flex-1 disabled:cursor-text"
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
                                    country,
                                    state,
                                    city,
                                  }: any) {
  switch (protocol) {
    case "http":
      port = 9000;
      break;
    case "https":
      port = 9000;
      break;
    case "socks5":
      port = 11000;
      break;
    default:
      port = 9000; // default to HTTP if no protocol is specified
      break;
  }

  let locationFormat = `-country-${country}-state-${state}-city-${city}`;
  //console.log({country, state, city});
  if (!country) locationFormat = locationFormat.replace("-country-", "");
  if (!state) locationFormat = locationFormat.replace("-state-", "");
  if (!city) locationFormat = locationFormat.replace("-city-", "");
  if (country === "random") locationFormat = locationFormat.replace("-country-random", "");

  switch (format) {
    case "hostname:port:username:password":
      return `${hostname}:${port}:${username}${locationFormat}:${password}`;
    case "username:password@hostname:port":
      return `${username}${locationFormat}:${password}@${hostname}:${port}`;
    case "username:password:hostname:port":
      return `${username}${locationFormat}:${password}:${hostname}:${port}`;
    default:
      return `${hostname}:${port}:${username}${locationFormat}:${password}`;
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
  country,
  state,
  city,
}: any) {
  stickySession = `-lifetime-${stickySession}`;
  let session = `-session-${generateRandomString()}`;
  let locationFormat = `-country-${country}-state-${state}-city-${city}`;
  console.log({ country, state, city });
  if (!country) locationFormat = locationFormat.replace("-country-", "");
  if (!state) locationFormat = locationFormat.replace("-state-", "");
  if (!city) locationFormat = locationFormat.replace("-city-", "");

  switch (protocol) {
    case "http":
      port = 10000;
      break;
    case "https":
      port = 10000;
      break;
    case "socks5":
      port = 12000;
      break;
    default:
      port = 10000; // default to HTTP if no protocol is specified
      break;
  }

  switch (format) {
    case "hostname:port:username:password":
      return `${hostname}:${port}:${username}${locationFormat}${
        session + stickySession
      }:${password}`;
    case "username:password@hostname:port":
      return `${username}${
          locationFormat + session + stickySession
      }:${password}@${hostname}:${port}`;
    case "username:password:hostname:port":
      return `${username}${
          locationFormat + session + stickySession
      }:${password}:${hostname}:${port}`;
    default:
      return `${hostname}:${port}:${username}${locationFormat}${
          session + stickySession
      }:${password}`;
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
function copyToClipboard(content: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(content)
        .then(() => {
          //alert("Content copied to clipboard!");
        })
        .catch((err) => {
          //alert("Failed to copy text: " + err);
        });
  } else {
    //alert("Clipboard API not supported in this environment.");
  }
}
