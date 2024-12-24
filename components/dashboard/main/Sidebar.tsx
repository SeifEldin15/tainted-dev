"use client";

import React, { Fragment, useState } from "react";
import { Button } from "../../ui/button";
import { LogOut, Sparkles } from "lucide-react";
import {
  AdminSidebarOptions, AdminSidebarOptions2,
  dashboardSidebarOptionsTypes,
} from "@/constants/DashboardStrings";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import { sidebarOpen } from "@/global/state";
import Link from "next/link";

const Sidebar = ({ oldcustomer }: { oldcustomer: boolean }) => {
  const pathname = usePathname();

  const [sidebar, setSidebar] = useRecoilState(sidebarOpen);
  const [currentPageOpen, setCurrentPage] = useState(pathname);

  const sidebarOptions = oldcustomer ? AdminSidebarOptions2 : AdminSidebarOptions

  const dynamicIndices = oldcustomer ? [1, 2, 4, 6, 8] : [1, 3, 5, 7];

  return (
    <div className="relative">
      {/* Overlay sidebar but only for mobile users */}
      <div
        onClick={() => setSidebar(false)}
        className={cn(
          sidebar
            ? "animate-in fade-in-0 flex sm:hidden"
            : "animate-out fade-out-0 hidden",
          "fixed inset-0 z-[99] bg-background/80 backdrop-blur-sm"
        )}
      ></div>
      {/* main sidebar div contents */}
      <div
        className={cn(
          sidebar ? "left-0 " : "left-[-100%]",
          "sm:left-0 fixed sm:relative top-0 z-[100] w-full sm:w-[260px] max-w-[260px] bg-[#09090b] h-full duration-300 "
        )}
      >
        {/* Logo */}
        <div className="h-[60px] overflow-hidden py-2 flex items-center bg-brandGray border-r sm:border-none border-borderColor">
          <div className="flex flex-row items-center relative justify-between sm:border-r border-borderColor w-full px-3 h-full">
            {/* Logo */}
            <div className="w-[140px]">
              <div className="relative w-fit">
                <a href="https://eclipseproxy.com">
                  <Image
                    alt="Eclipse Logo"
                    className="w-[150px]"
                    src="/logo-text-side.png"
                    width={600}
                    height={160}
                    draggable="false"
                    style={{ paddingLeft: "5px" }} // Adjust the padding value as needed
                  />
                </a>
              </div>
            </div>
            {/* Close Sidebar Button For Mobile */}
            <Button
              onClick={() => setSidebar(false)}
              className="px-2 sm:hidden"
              variant="ghost"
            >
              <LogOut className="rotate-[180deg]" size={18} />
            </Button>
          </div>
        </div>
        <div className="flex flex-col h-full p-3 border-r border-borderColor">
          {/* Buttons Categories */}
          <div className="flex flex-col gap-1">
            {/* catergory */}
            {sidebarOptions?.map(
              (
                {
                  linkName,
                  icon,
                  title,
                  badge,
                  linkOpenInNewTab,
                  willCrispOpen,
                }: dashboardSidebarOptionsTypes,
                index: number
              ) => {
                return (
                  <Fragment key={index}>
                    <Link
                      className="w-full"
                      onClick={() =>
                        willCrispOpen
                          ? window.$crisp.push(["do", "chat:open"])
                          : null
                      }
                      href={linkName}
                      target={linkOpenInNewTab ? "_blank" : "_self"}
                    >
                      <Button
                        onClick={() => {
                          setCurrentPage(linkName);
                          setSidebar(false);
                        }}
                        variant={
                          currentPageOpen === linkName ? "secondary" : "ghost"
                        }
                        className={cn(
                          currentPageOpen == linkName
                            ? "text-gray-100"
                            : "text-[#838383]",
                          "group flex justify-start flex-row items-center gap-2 font-normal duration-100 w-full"
                        )}
                      >
                        <div
                          className={cn(
                            currentPageOpen == linkName ? "text-brand" : "",
                            "duration-0"
                          )}
                        >
                          {icon}
                        </div>
                        <span className="text-[13px] leading-[13px]">
                          {title}
                        </span>
                        {badge && (
                          <span className="flex flex-row items-center gap-1 text-[10px] px-1.5 bg-brand/[0.2] text-brand rounded-full">
                            <span>{badge?.title}</span>
                            {badge?.icon}
                          </span>
                        )}
                      </Button>
                    </Link>
                    {dynamicIndices.includes(index) && (
                      <div className="relative my-1 select-none">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="w-[90%] border-t border-borderColor" />
                        </div>
                      </div>
                    )}
                  </Fragment>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
