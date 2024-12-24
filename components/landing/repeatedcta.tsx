import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Clock, ShoppingCart } from "lucide-react";

const RepeatedCta = () => {
  return (
        <div className="px-4">
          <div className="middle pb-[100px] pt-24">
            <div className="mx-auto flex w-fit flex-row items-center gap-2 text-sm text-brand">
              <Clock size={16}/>
              <div className="">Why Are You Waiting?</div>
            </div>
            <div className="relative mt-4 pb-14">
              <Image
                  className="pointer-events-none absolute top-[-150px] z-0 opacity-60"
                  src="/PNG/gridbg.png"
                  width={1216}
                  height={600}
                  alt="cta-bg"
              />
              <div className="flex w-full flex-col items-center gap-4">
                <div className="text-center">
                  <div className="text-[26px] font-bold sm:text-[50px] sm:leading-[60px]">
                    Get Your Top-tier Proxies
                  </div>
                  <div className="text-[40px] font-bold leading-[50px]">
                    Today!
                  </div>
                </div>
                <div className="mt-5 max-w-[500px] text-center text-gray-500">
                  {`Our proxies feature fast speeds, massive pools, and high-quality IPs, guaranteeing seamless control and effortless progress through your work.`}
                </div>
                <div className="mt-10">
                  <div className="relative">
                    <div
                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded bg-gradient-to-tr from-brand to-purple-500 blur-2xl"></div>
                    <div className="relative rounded-lg bg-white bg-opacity-15 p-1">
                      <Link href={``}>
                        <Button color="default">Get Started</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
        };

        export default RepeatedCta;
