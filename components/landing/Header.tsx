import { HeaderOptions, HeaderOptionTypes } from "@/constants/Strings";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div id="home" className="px-2 z-40 relative">
      <div className="mx-auto w-full max-w-[1400px] px-2">
        <div className="h-[60px] flex flex-row items-center justify-between">
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
          {/* Options */}
          <div className="text-sm flex-row items-center gap-4 hidden sm:flex">
            {HeaderOptions?.map(
              ({ name, path }: HeaderOptionTypes, index: number) => (
                <Link key={index} href={path}>
                  <div className="hover:text-brand">{name}</div>
                </Link>
              )
            )}
          </div>
          {/* Login / Register */}
          <div className="flex flex-row justify-between w-[140px]">
            <Link href="/register">
              <Button variant="ghost" size="sm">
                Register
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="brand" size="sm">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
