"use client";

import React from "react";
import { Button } from "../ui/button";
import { ChevronRight, Unlink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
      <div className="px-4">

        {/* Updated Banner for Residential Proxies (Bigger, White Text, Translucent Background, Clickable) */}
        <Link href="/dashboard/core-residential-proxies">
          <div className="bg-brand/50 text-white py-4 text-center text-xl font-semibold mb-4 rounded-xl max-w-lg mx-auto cursor-pointer">
            As low as $1/GB Residential Proxies
          </div>
        </Link>

        {/* Small Text under the banner */}
        <Link href="https://discord.gg/EclipseProxy">
          <div className="text-white text-center text-sm mb-6">
            On Bulk Purchases - Contact Support
          </div>
        </Link>

        {/* Content Section - Adjusted margin-top here */}
        <div className="middle relative z-50"> {/* Reduced margin-top to move content up */}
          <div className="flex w-full flex-col items-center gap-4 py-5 lg:flex-row z-20"> {/* Adjust padding-top here as well */}
            {/* Left Container */}
            <div className="flex flex-col items-center gap-4 text-center w-full">
              <div className="text-sm font-semibold tracking-widest text-white/50 opacity-40">
                Eclipse Proxy
              </div>
              <div className="flex flex-col text-4xl font-semibold sm:text-5xl md:text-7xl lg:text-8xl space-y-4">
                <span>Leading Residential & IPv6 Proxies</span>
                <span className="discord-shadow text-brand">Eclipse Proxy</span>
              </div>
              <div className="max-w-[550px] text-center text-white/30">
                {`EclipseProxy is a leading proxy provider that offers high quality and affordable residential IPv4 and datacenter IPv6 proxies. We offer a wide range of locations and subnets to choose from. Our proxies are perfect for any use case, whether it be for website automation, web scraping, or any other use case.`}
              </div>
              <div className="mt-3 flex flex-row items-center gap-4">
                <Link href={`/#pricing`}>
                  <Button
                      variant={"brand"}
                      className="flex flex-row items-center gap-2"
                  >
                    <span>Shop Now</span>
                    <ChevronRight size={16} />
                  </Button>
                </Link>
                <Link href={`https://t.me/eclipseproxy`} target="_blank">
                  <Button
                      variant={"outline"}
                      className="flex flex-row items-center gap-2"
                  >
                    <span>Join our Telegram</span>
                    <Unlink size={16} />
                  </Button>
                </Link>
              </div>
              <div className="mt-5 flex w-fit flex-row items-center gap-10 py-5">
                <div className="flex h-full flex-col items-center gap-2">
                  <div className="text-3xl font-medium sm:text-4xl">{`0.5M+`}</div>
                  <span className="text-white/30">Requests Served</span>
                </div>
                <div className="flex h-full flex-col items-center gap-2">
                  <div className="text-3xl font-medium sm:text-4xl">{`100+`}</div>
                  <span className="text-white/30">Invoices Created</span>
                </div>
                <div className="flex h-full flex-col items-center gap-2">
                  <div className="text-3xl font-medium sm:text-4xl">{`5 ⭐`}</div>
                  <span className="text-white/30">Customer Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Hero;