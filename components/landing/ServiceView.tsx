import { AudioLines, ChevronRight, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const ServiceView = () => {
  return (
    <div id="about" className="pt-20 relative">
      <div className="hidden md:block top-gradient-shadow-blue absolute top-0 left-52 h-[500px] w-[500px] opacity-60" />
      <div className="px-4 overflow-hidden ">
        <div className="middle px-4">
          <div className="flex flex-col md:flex-row gap-5">
            {/* Left container */}
            <div className="min-w-[50%] md:w-1/2 flex flex-col z-10">
              <div className="mt-10 flex flex-col gap-5">
                {/* Top Thingy */}
                <div className="flex flex-row items-center gap-3">
                  <div className="flex flex-row items-center">
                    <AudioLines className="mr-2 text-brand" />
                    <div className="text-brand font-semibold tracking-tighter">
                      Dashboard
                    </div>
                  </div>
                  <div className="w-[1px] h-[14px] bg-gray-500" />
                  <div className="text-brand/80 text-sm">Eclipse Proxy</div>
                </div>
                {/* Main Title */}
                <div className="flex flex-col text-[35px] sm:text-[50px]  sm:leading-[65px] font-semibold">
                  <div className="tracking-tighter">With a </div>
                  <div className="tracking-tighter">
                    <span className="text-brand ml-1">Sleek</span>
                    {" Dashboard"}
                  </div>
                </div>
                {/* description */}
                <div className="text-gray-500 max-w-[500px] tracking-tight">
                  {`Experience a sleek, modern, and organized dashboard interface designed to streamline your navigation through proxies and payments. Our user-friendly design ensures effortless usability.`}
                </div>
                {/* explore */}
                <Link href="/login">
                  <Button color="primary" variant={"brand"}>
                    Explore Dashboard
                  </Button>
                </Link>
              </div>
              <div className="mt-5 flex flex-col sm:flex-row gap-5">
                <div className="shadow-lg bg-brandBg sm:w-1/2 border border-gray-800 rounded-xl flex flex-col p-5 gap-4">
                  <div className="text-brand">
                    <Settings />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">Simplified Navigation</div>
                    <div className="text-gray-500">{`Effortlessly centralize, store, and search through your proxies at lightning speed.`}</div>
                  </div>
                </div>
                <div className="shadow-lg bg-brandBg sm:w-1/2 border border-gray-800 rounded-xl flex flex-col p-5 gap-4">
                  <div className="text-brand">
                    <AudioLines />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">
                      Comprehensive Observability
                    </div>
                    <div className="text-gray-500">{`Efficiently summarize metrics from various sources into beautifully crafted dashboards for enhanced observability.`}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right container */}
            <div className="w-full relative flex items-center">
              {/* Image for mobile screens */}
              <Image
                className="h-full md:max-w-max md:hidden rounded-md"
                alt="placeholder dashboard image"
                src="/placerholder-dashboard.png"
                width={1280}
                height={720}
              />
              {/* Image for Pc Screens */}
              <div className="hidden md:block md:absolute h-full top-0 left-5 w-full">
                <div className="h-full w-full bg-gradient-to-tr from-brand via-transparent to-transparent rounded-xl p-[1px] ">
                  <div className="h-full w-full bg-brandBg rounded-xl">
                    <div className="h-full w-full p-3 bg-gradient-to-tr from-black  via-transparent to-transparent rounded-xl">
                      <div className="h-full w-full relative min-w-min">
                        <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-brandBg/50 to-brandBg" />
                        <Image
                          className="h-full max-w-max shadow-md"
                          alt="placeholder dashboard image"
                          src="/placerholder-dashboard.png"
                          width={1920}
                          height={1080}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceView;
