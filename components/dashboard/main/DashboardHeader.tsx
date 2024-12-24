"use client";

import React from "react";
import { Button } from "../../ui/button";
import { Menu } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { sidebarOpen } from "@/global/state";
import { modalState } from "@/global/modal-states";

const DashboardHeader = ({ session }: any) => {
  const setSidebar = useSetRecoilState(sidebarOpen);
  const setcurrentModal = useSetRecoilState(modalState);

  const openLogoutModal = () => {
    setcurrentModal({ modalName: "logoutModal" });
  };

  return (
    <div className="h-[60px] bg-brandGray flex items-center border-b sm:border-none border-borderColor">
      <div className="h-full px-3 w-full flex flex-row justify-between sm:justify-end items-center">
        {/* Close sidebar btn */}
        <div className="sm:hidden">
          <Button
            onClick={() => setSidebar(true)}
            variant="ghost"
            className="px-2"
          >
            <Menu size={18} />
          </Button>
        </div>
        {/* profile btn */}
        <div className="h-full">
          <div className="h-full flex items-center">
            <div
              onClick={() => openLogoutModal()}
              className="flex flex-row items-center h-[48px] px-2 rounded-md gap-4 cursor-pointer hover:bg-[#27272a]"
            >
              {/* name and role */}
              <div className="flex flex-col">
                <div className="text-[15px] text-gray-100">
                  {session?.user?.username.replace("eclipse_", "")}
                </div>
                <div className="text-[12px] text-[#979797]">
                  {session?.user?.role}
                </div>
              </div>
              {/* image */}
              <img
                className="h-[35px] w-[35px] rounded-md overflow-hidden"
                alt="user image"
                src={session?.user?.image}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
