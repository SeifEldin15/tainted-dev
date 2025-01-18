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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Clipboard } from "lucide-react";

const IPv6GeneratorPage = ({ userProxyData }: any) => {
  // console.log("PROXY GENERATOR USER PROXY DATA :", userProxyData);

  const [generatedProxies, setGeneratedProxies] = useState<any>(``);
  const [whitleListedIps, setWhitleListedIps] = useState<any>([]);
  const updateWhitelistIpsRef = useRef<any>(null);
  const router = useRouter();

  const formRef = useRef<any>(null);

  useEffect(() => {
    getWhiteListedIps();
  }, []);

  const initialValues = {
    isRotating: true,
    generateAmount: 1,
    stickySession: 30,
    format: "hostname:port:username:password",
  };

  const onSubmit = async (values: any) => {
    // console.log("PROXY GENERATOR VALUES :", values);

    const { format, generateAmount, isRotating, stickySession } =
      formRef?.current?.values;
    const proxyPassword = userProxyData?.password;
    const proxyUsername = userProxyData?.username;
    const proxyPort = 23468;
    const proxyHostname = `ipv6.eclipseproxy.com`;

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
          })
        );
      }
      setGeneratedProxies(proxyList.join("\n"));
    }
  };

  const getWhiteListedIps = async () => {
    const response = await fetch("/api/whitelist/ipv6/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planId: userProxyData?.planId,
      }),
    }).then((res) => res.json());

    // console.log("RESET PROXY PASS RESPONSE :", response);
    if (response?.status == "success") {
      // router refresh to get the new password
      const ips = response.data;
      setWhitleListedIps(ips);
      router.refresh();
    } else {
      toast.error("Error While Resetting Proxy Password");
    }
  };

  console.log("whitleListedIps", whitleListedIps);

  const updateWhitelistIps = async () => {
    try {
      const addIps = [];
      const removeIps = [];
      const updatedIps = updateWhitelistIpsRef.current?.value?.split("\n");
      const allIps = whitleListedIps.map((ips: any) => ips.ip);

      toast.loading("Updating your whitelist ips");
      // add
      if (updatedIps.length > allIps.length) {
        for (const ip of updatedIps) {
          if (allIps.includes(ip)) continue;

          addIps.push(ip);
        }

        // sequentially adding whitelisted ips
        const addPromise = addIps.map(async (ip) => {
          const response = await fetch("/api/whitelist/ipv6/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              planId: userProxyData?.planId,
              ip,
            }),
          });

          return response;
        });
        await Promise.all(addPromise);
      } else {
        //remove
        for (const fullIp of whitleListedIps) {
          console.log("ip", fullIp);
          if (updatedIps.includes(fullIp.ip)) continue;

          removeIps.push(fullIp);
        }

        // sequentially deleting whitelisted ips
        const addPromise = removeIps.map(async (ip) => {
          const response = await fetch("/api/whitelist/ipv6/remove", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ipId: ip.id,
            }),
          });

          return response;
        });

        await Promise.all(addPromise);
      }

      // console.log("RESET PROXY PASS RESPONSE :", response);
      toast.dismiss();
      toast.success("Successfully updated your whitelist ips");
      getWhiteListedIps();
      router.refresh();
    } catch (error) {
      console.log("ERROR WHILE UPDATING WHITELIST IPS :", error);
      toast.error("Error While Updating Whitelist IPs");
    }
  };

  const handleResetProxyPass = async () => {
    const response = await fetch("/api/resetipv6proxypass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: userProxyData?.password,
        planId: userProxyData?.planId,
      }),
    }).then((res) => res.json());

    // console.log("RESET PROXY PASS RESPONSE :", response);
    if (response?.status == "success") {
      toast.success("Proxy Password Reset Successfully");
      if (typeof window !== "undefined") {
        location.reload();
      }
      // router refresh to get the new password
      router.refresh();
    } else {
      toast.error("Error While Resetting Proxy Password");
    }
  };

  return (
    <div className="mb-10">
      <div className="flex flex-col gap-[10px]">
        <div className="text-[20px] sm:text-[24px] font-semibold py-2">
          <span>{`Proxy Generator`}</span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-2 w-full">
        {/* Generator Settings */}
        <div className="bg-white rounded-md py-4 px-5 flex flex-col gap-2 lg:max-w-[400px] w-full shadow-lg shadow-[#00000038]">
          <div className="text-[16px] text-black">Generator Settings</div>
          <div className="h-[1px] bg-gray-200"></div>
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
                        "h-[15px] flex flex-row items-center justify-between text-black"
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
                        "h-[15px] flex flex-row items-center justify-between text-black"
                      )}
                    >
                      <span>Rotating</span>
                    </Label>
                  </div>
                  {/* sticky session time */}
                  {values?.isRotating == false && (
                    <div className="grid gap-2">
                      <Label
                        className="h-[15px] flex flex-row items-center justify-between text-black"
                        htmlFor="stickySession"
                      >
                        <span>{`Session Time (in 1-720 Minutes)`}</span>
                      </Label>
                      <Input
                        value={values?.stickySession}
                        name="stickySession"
                        onChange={(event) => {
                          // @ts-ignore
                          if (event?.target?.value > 720) {
                            // set the formik value to 120
                            setFieldValue("stickySession", 720);
                          }
                          // @ts-ignore
                          if (event?.target?.value <= 720) {
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
                        className="border-gray-200"
                      />
                    </div>
                  )}
                  {/* Format */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between text-black"
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
                      className="h-[15px] flex flex-row items-center justify-between text-black"
                      htmlFor="generateAmount"
                    >
                      <span>Amount To Generate</span>
                    </Label>
                    <Input
                      name="generateAmount"
                      value={values?.generateAmount}
                      onChange={handleChange("generateAmount")}
                      id="generateAmount"
                      type="number"
                      className="border-gray-200"
                    />
                  </div>
                  {/* Generate Button & proxy reset button*/}
                  <div className="flex flex-row gap-4">
                    <Button
                      className="w-full"
                      variant={"attention"}
                      onClick={handleResetProxyPass}
                    >
                      Reset Password
                    </Button>
                    <Button
                      onClick={() => handleSubmit()}
                      type="submit"
                      className="w-full text-white"
                      variant={"brand"}
                    >
                      Generate Proxies
                    </Button>
                  </div>
                </div>

                {/* whitelist ips */}
                <div className="flex flex-col gap-2 h-full mt-4">
                  <Label
                    className="h-[15px] flex flex-row items-center justify-between text-black"
                    htmlFor="stickySession"
                  >
                    <span>{`Whiltelist IPs`}</span>
                  </Label>
                  <Textarea
                    className="disabled:opacity-100 lg:h-full min-h-[200px] lg:min-h-[100px] flex-1 disabled:cursor-text bg-gray-50 text-black border-gray-200"
                    defaultValue={whitleListedIps
                      .map((ips: any) => ips.ip)
                      .join("\n")}
                    placeholder="Add whitelist IPs sperated by line"
                    ref={updateWhitelistIpsRef}
                  />

                  <div className="flex flex-row gap-4">
                    <Button
                      onClick={updateWhitelistIps}
                      type="submit"
                      className="w-full text-white"
                      variant={"brand"}
                    >
                      Update Whitelist IPs
                    </Button>
                  </div>
                </div>
              </Fragment>
            )}
          </Formik>
        </div>
        {/* Generated Proxies */}
        <div className="bg-white rounded-md py-4 px-5 flex flex-col gap-2 shadow-lg shadow-[#00000038] w-full">
          <div className="text-[16px] text-black">Generator Settings</div>
          <div className="h-[1px] bg-gray-200"></div>
          <div className="mt-4 flex flex-col gap-6 h-full">
            {/* Hostname / IP for Pool Access */}
            <div className="grid gap-2">
              <Label
                className="h-[15px] flex flex-row items-center justify-between text-black"
                htmlFor="stickySession"
              >
                <span>{`Hostname / IP for Pool Access`}</span>
              </Label>
              <Input
                className="disabled:opacity-80 bg-gray-50 text-black border-gray-200"
                defaultValue={`ipv6.eclipseproxy.com`}
                disabled={true}
              />
            </div>
            {/* Port */}
            <div className="grid gap-2">
              <Label
                className="h-[15px] flex flex-row items-center justify-between text-black"
                htmlFor="stickySession"
              >
                <span>{`Port`}</span>
              </Label>
              <Input
                className="disabled:opacity-80 bg-gray-50 text-black border-gray-200"
                defaultValue={`23468`}
                disabled={true}
              />
            </div>
            {/* Your Username */}
            <div className="grid gap-2">
              <Label
                className="h-[15px] flex flex-row items-center justify-between text-black"
                htmlFor="stickySession"
              >
                <span>{`Your Username`}</span>
              </Label>
              <Input
                className="disabled:opacity-80 bg-gray-50 text-black border-gray-200"
                defaultValue={userProxyData?.username}
                disabled={true}
              />
            </div>
            {/* Your Proxy Password */}
            <div className="grid gap-2">
              <Label
                className="h-[15px] flex flex-row items-center justify-between text-black"
                htmlFor="stickySession"
              >
                <span>{`Your Proxy Password`}</span>
              </Label>
              <Input
                className="disabled:opacity-80 bg-gray-50 text-black border-gray-200"
                value={userProxyData?.password}
                disabled={true}
              />
            </div>
            {/* Generated Proxies */}
            <div className="flex flex-col gap-2 h-full">
              <Label
                className="h-[15px] flex flex-row items-center justify-between text-black"
                htmlFor="stickySession"
              >
                <span>{`Generated Proxies`}</span>
                <div className="flex flex-row gap-x-2">
                  <Button
                    onClick={() =>
                      downloadTextFile(
                        generatedProxies,
                        `IPv6 Datacenter`
                      )
                    }
                    size={"xs"}
                    type="button"
                    className="flex flex-row items-center gap-2 rounded-sm"
                  >
                    <DownloadCloud size={12} />
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
                    <Clipboard size={12} />
                    <span>Copy to Clipboard</span>
                  </Button>
                </div>
              </Label>
              <Textarea
                className="disabled:opacity-100 lg:h-full min-h-[200px] lg:min-h-[100px] flex-1 disabled:cursor-text bg-gray-50 text-black border-gray-200"
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

export default IPv6GeneratorPage;

function getRotatingFormatedProxy({
  hostname,
  port,
  username,
  password,
  format,
}: any) {
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
}: any) {
  const stickyTime = stickySession;
  stickySession = `_lifetime-${stickySession}`;
  let session = `_session-${generateRandomString()}`;

  switch (format) {
    case "hostname:port:username:password":
      session = `_sticky=${generateRandomString(10)}_time=${stickyTime}m`;
      return `${hostname}:${port}:${username}:${password + session}`;
    case "username:password@hostname:port":
      session = `_sticky=${generateRandomString(10)}_time=${stickyTime}m`;
      return `${username}:${password + session}@${hostname}:${port}`;
    case "username:password:hostname:port":
      session = `_sticky=${generateRandomString(10)}_time=${stickyTime}m`;
      return `${username}:${password + session}@${hostname}:${port}`;
    default:
      session = `_sticky=${generateRandomString(10)}_time=${stickyTime}m`;
      return `${hostname}:${port}:${username}:${password + session}`;
  }
}

function generateRandomString(length: number = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
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