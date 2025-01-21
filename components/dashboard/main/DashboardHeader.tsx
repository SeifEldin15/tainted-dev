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
    <div className="h-[60px] bg-white flex items-center border-b border-gray-300">
      <div className="h-full px-4 w-full flex flex-row justify-between sm:justify-end items-center">
        {/* Close sidebar btn */}
        <div className="sm:hidden">
          <Button
            onClick={() => setSidebar(true)}
            variant="ghost"
            className="px-2 hover:bg-gray-100"
          >
            <Menu size={20} />
          </Button>
        </div>
        {/* profile btn */}
        <div className="h-full">
          <div className="h-full flex items-center">
            <div
              onClick={() => openLogoutModal()}
              className="flex flex-row items-center h-[48px] px-3 rounded-lg gap-3 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {/* image */}
              <img
                className="h-[38px] w-[38px] rounded-full border border-gray-300"
                alt="user image"
                src={session?.user?.image}
              />
              {/* name and role */}
              <div className="flex flex-col">
                <div className="text-[15px] font-medium text-gray-900">
                  {session?.user?.username.replace("eclipse_", "")}
                </div>
                <div className="text-[13px] text-gray-500">
                  {session?.user?.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
