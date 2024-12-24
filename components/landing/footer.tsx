import { DiscordIcon, Logo, TelegramIcon, TwitterIcon } from "@/assests/SVGs";
import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const LandingPageLinks = [
  {
    name: "Home",
    link: "/#home",
  },
  {
    name: "About",
    link: "/#features",
  },
  {
    name: "Pricing",
    link: "/#pricing",
  },
  {
    name: "Telegram",
    link: "https://t.me/eclipseproxy",
  },
  {
    name: "Discord",
    link: "https://discord.gg/eclipseproxy",
  },
];

const Footer = () => {
  return (
    <div className="flex flex-col">
      {/* Upper Footer */}
      <div className="middle flex flex-row justify-between px-4 xl:px-0">
        <div className="flex flex-col gap-5">
          {/* Logo */}
          <div className="w-[140px]">
            <div className="relative w-fit">
              <a href="https://eclipseproxy.com">
                <Image
                    alt="Eclise Logo"
                    className="w-[150px]"
                    src="/logo-text-side.png"
                    width={600}
                    height={160}
                    draggable="false"
                />
              </a>
            </div>
          </div>
          <div className="max-w-[550px] text-sm text-[#96969e]">
            {`Eclipse Proxy offers top-notch proxy solutions tailored to your requirements. Our range includes residential proxies to suit diverse needs. Additionally, we provide a user-friendly dashboard for seamless proxy management and usage tracking.`}
          </div>
          <div className="text-sm text-brand">
            {`Please read our terms and conditions before purchasing.`}
          </div>
          <div className="mt-3 flex flex-row items-center gap-2">
            <Link href={`https://discord.gg/eclipseproxy`} target="_blank">
              <Button
                variant={"outline"}
                className="flex flex-row items-center gap-2"
              >
                <DiscordIcon className="h-[18px] w-[18px]" />
              </Button>
            </Link>
            <Link href={`https://t.me/eclipseproxy`} target="_blank">
              <Button
                variant={"outline"}
                className="flex flex-row items-center gap-2"
              >
                <TelegramIcon className="h-[18px] w-[18px]" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden h-full w-[100px] flex-col gap-2 sm:flex">
          <div className="ml-1 font-semibold">Links</div>
          <div className="flex flex-col gap-2 text-sm text-[#96969e]">
            {LandingPageLinks?.map((link, index) => (
              <Link href={link?.link} key={index}>
                <div className="flex cursor-pointer flex-row items-center gap-1 duration-200 hover:text-white">
                  <ChevronRight className="w-4" />
                  <span>{link?.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="my-4 border-t border-[#96969e] border-opacity-20 "></div>
      {/* Bottom Footer */}
      <div className="middle flex flex-row items-center justify-between px-4 pb-6 pt-2 xl:px-0">
        <div className="text-sm text-[#96969e]">&copy; Eclipse Proxy</div>
        <Link href="https://eclipseproxy.com" target="_blank">
          <div className="flex cursor-pointer flex-col rounded-md px-2 py-2">
            <div className="relative z-10 text-[11px] leading-[14px]">
              Owned By
            </div>
            <div className="relative font-bold leading-[16px] text-brand">
              <div className="absolute left-0 top-0 h-full w-full bg-brand opacity-70 blur-lg" />
              <div className="relative z-10">{`Eclipse Group`}</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
