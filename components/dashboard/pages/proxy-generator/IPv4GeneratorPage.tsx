"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormatSelectField } from "../../comps/proxy-generator/FormatSelectField";
import React, { Fragment, useState, useRef, useEffect, use } from "react";
import { Formik, Form } from "formik";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { DownloadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Clipboard } from "lucide-react";

const IPv4GeneratorPage = ({ userProxyData }: any) => {
  // console.log("PROXY GENERATOR USER PROXY DATA :", userProxyData);

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

    const proxyPassword = userProxyData?.proxy_key;
    const proxyUsername = userProxyData?.username;
    const proxyPort = 9999;
    const proxyHostname = `ipv4dc.eclipseproxy.com`;

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

  const handleResetProxyPass = async () => {
    const response = await fetch("/api/resetipv4proxypass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userProxyData?.username,
      }),
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

  async function getWhitelistIps() {
    try {
      const resp = await fetch("/api/whitelist/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userProxyData?.username,
          product: "dcp",
        }),
      }).then((res) => res.json());
      console.log(resp.data);
      if (resp.status == "success") {
        setWhitelistIps({
          ip1: resp?.data?.[0] || "",
          ip2: resp?.data?.[1] || "",
          ip3: resp?.data?.[2] || "",
        });
      }
    } catch (error) {
      console.log("Error While Getting Whitelist Ips :", error);
    }
  }

  const addWhitelistIp = async () => {
    for (const key in whitelistIps) {
      const ip = whitelistIps[key];
      if (ip && ip !== "") {
        const response = await fetch("/api/whitelist/ipv4_dc/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userProxyData?.username,
            ip,
          }),
        }).then((res) => res.json());

        if (response?.status == "success") {
          toast.success("IP Whitelisted Successfully");
          router.refresh();
        } else {
          toast.error("Error While Whitelisting IP");
        }
      }
    }
  };

  const removeWhitelistedIp = async (ip: string) => {
    if (ip && ip !== "") {
      const response = await fetch("/api/whitelist/ipv4_dc/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userProxyData?.username,
          ip,
        }),
      }).then((res) => res.json());

      if (response?.status == "success") {
        toast.success("IP Removed Successfully");
        router.refresh();
      } else {
        toast.error("Error While Removing Whitelisted IP");
      }
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
        <div className="bg-[#101014] rounded-md py-4 px-5 flex flex-col gap-2 lg:max-w-[400px] w-full shadow-lg shadow-[#00000038]">
          <div className="text-[16px]">Generator Settings</div>
          <div className="h-[1px] bg-borderColor"></div>
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
                        "h-[15px] flex flex-row items-center justify-between"
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
                        "h-[15px] flex flex-row items-center justify-between"
                      )}
                    >
                      <span>Rotating</span>
                    </Label>
                  </div>
                  {/* sticky session time */}
                  {values?.isRotating == false && (
                    <div className="grid gap-2">
                      <Label
                        className="h-[15px] flex flex-row items-center justify-between"
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
                      />
                    </div>
                  )}
                  {/* Format */}
                  <div className="grid gap-2">
                    <Label
                      className="h-[15px] flex flex-row items-center justify-between"
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
                      className="h-[15px] flex flex-row items-center justify-between"
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
                      className="w-full"
                      variant={"brand"}
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
            <div className="text-[16px] mb-2">Whitelist IPs</div>
            <div className="h-[1px] bg-borderColor mb-4"></div>

            <div className="flex flex-col gap-2">
              <div className="grid gap-2">
                <Label
                  className="h-[15px] flex flex-row items-center justify-between"
                  htmlFor="stickySession"
                >
                  <span>{`IP 1`}</span>
                </Label>
                <div className="flex flex-col md:flex-row gap-2">
                  <Input
                    className="disabled:opacity-80"
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
                  className="h-[15px] flex flex-row items-center justify-between"
                  htmlFor="stickySession"
                >
                  <span>{`IP 2`}</span>
                </Label>
                <div className="flex flex-col md:flex-row gap-2">
                  <Input
                    className="disabled:opacity-80"
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
                  className="h-[15px] flex flex-row items-center justify-between"
                  htmlFor="stickySession"
                >
                  <span>{`IP 3`}</span>
                </Label>
                <div className="flex flex-col md:flex-row gap-2">
                  <Input
                    className="disabled:opacity-80"
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
        <div className="bg-[#101014] rounded-md py-4 px-5 flex flex-col gap-2 shadow-lg shadow-[#00000038] w-full">
          <div className="text-[16px]">Generator Settings</div>
          <div className="h-[1px] bg-borderColor"></div>
          <div className="mt-4 flex flex-col gap-6 h-full">
            {/* Hostname / IP for Pool Access */}
            <div className="grid gap-2">
              <Label
                className="h-[15px] flex flex-row items-center justify-between"
                htmlFor="stickySession"
              >
                <span>{`Hostname / IP for Pool Access`}</span>
              </Label>
              <Input
                className="disabled:opacity-80"
                defaultValue={`ipv4dc.eclipseproxy.com`}
                disabled={true}
              />
            </div>
            {/* Port */}
            <div className="grid gap-2">
              <Label
                className="h-[15px] flex flex-row items-center justify-between"
                htmlFor="stickySession"
              >
                <span>{`Port`}</span>
              </Label>
              <Input
                className="disabled:opacity-80"
                defaultValue={`9999`}
                disabled={true}
              />
            </div>
            {/* Your Username */}
            <div className="grid gap-2">
              <Label
                className="h-[15px] flex flex-row items-center justify-between"
                htmlFor="stickySession"
              >
                <span>{`Your Username`}</span>
              </Label>
              <Input
                className="disabled:opacity-80"
                defaultValue={userProxyData?.username}
                disabled={true}
              />
            </div>
            {/* Your Proxy Password */}
            <div className="grid gap-2">
              <Label
                className="h-[15px] flex flex-row items-center justify-between"
                htmlFor="stickySession"
              >
                <span>{`Your Proxy Password`}</span>
              </Label>
              <Input
                className="disabled:opacity-80"
                value={userProxyData?.proxy_key}
                disabled={true}
              />
            </div>
            {/* Generated Proxies */}
            <div className="flex flex-col gap-2 h-full">
              <Label
                  className="h-[15px] flex flex-row items-center justify-between"
                  htmlFor="stickySession"
              >
                <span>{`Generated Proxies`}</span>
                <div className="flex flex-row gap-x-2">
                  <Button
                      onClick={() =>
                          downloadTextFile(
                              generatedProxies,
                              `IPv4 Datacenter.txt`
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
                  className="disabled:opacity-100 lg:h-full min-h-[200px] lg:min-h-[100px] flex-1 disabled:cursor-text"
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

export default IPv4GeneratorPage;

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
  stickySession = `_lifetime-${stickySession}`;
  let session = `_session-${generateRandomString()}`;

  switch (format) {
    case "hostname:port:username:password":
      return `${hostname}:${port}:${username}:${password + session}`;
    case "username:password@hostname:port":
      return `${username}:${password + session}@${hostname}:${port}`;
    case "username:password:hostname:port":
      return `${username}:${password + session}:${hostname}:${port}`;
    default:
      return `${hostname}:${port}:${username}:${password + session}`;
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