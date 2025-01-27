"use client";

import React from "react";
import { Button } from "../../ui/button";
import { Menu } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { sidebarOpen } from "@/global/state";
import { modalState } from "@/global/modal-states";
import { useTheme } from "@/contexts/ThemeContext";

const DashboardHeader = ({ session }: any) => {
  const setSidebar = useSetRecoilState(sidebarOpen);
  const setcurrentModal = useSetRecoilState(modalState);
  const { theme, toggleTheme } = useTheme();

  const openLogoutModal = () => {
    setcurrentModal({ modalName: "logoutModal" });
  };

  return (
    <div className="h-[60px] bg-white dark:bg-gray-900 flex items-center border-b border-gray-300 dark:border-transparent">
      <div className="h-full px-4 w-full flex flex-row justify-between sm:justify-end items-center">
        {/* Close sidebar btn */}
        <div className="sm:hidden">
          <Button
            onClick={() => setSidebar(true)}
            variant="ghost"
            className="px-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu size={20} />
          </Button>
        </div>
        {/* Add theme toggle button */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
            aria-label="Toggle theme"
          >
            <div className="absolute inset-y-0 left-0 w-7 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            </div>
            <div className="absolute inset-y-0 right-0 w-7 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            </div>
            <div 
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
                theme === 'dark' ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>

          {/* profile btn */}
          <div className="h-full">
            <div className="h-full flex items-center">
              <div
                onClick={() => openLogoutModal()}
                className="flex flex-row items-center h-[48px] px-3 rounded-lg gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {/* image */}
                <img
                  className="h-[38px] w-[38px] rounded-full border border-gray-300 dark:border-gray-700"
                  alt="user image"
                  src={session?.user?.image}
                />
                {/* name and role */}
                <div className="flex flex-col">
                  <div className="text-[15px] font-medium text-gray-900 dark:text-white">
                    {session?.user?.username.replace("eclipse_", "")}
                  </div>
                  <div className="text-[13px] text-gray-500 dark:text-gray-400">
                    {session?.user?.role}
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

export default DashboardHeader;
