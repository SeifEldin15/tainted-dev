import React from "react";
import {
  dashboardAnnoucement,
  dashboardAnnoucementTypes,
} from "@/constants/DashboardStrings";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Annoucements = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      {dashboardAnnoucement.length > 0 &&
        dashboardAnnoucement.map(
          (annoucement: dashboardAnnoucementTypes, index: number) => (
            <div key={index}>
              <div className="flex flex-col gap-2 rounded-lg p-3 bg-brand/[0.1] dark:bg-brand/[0.2]">
                <div className="font-semibold text-brand">
                  {annoucement?.title}
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  {annoucement?.description}
                </div>
                <Link href={annoucement?.link}>
                  <Button
                    className="w-fit rounded-sm !text-black"
                    size={"xs"}
                    variant={"brand"}
                  >
                    {annoucement?.buttonTitle}
                  </Button>
                </Link>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default Annoucements;
