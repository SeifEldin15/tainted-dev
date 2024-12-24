import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardCardProps {
  title?: string;
  value?: string | number | null;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const DashboardCard = ({
  title = "Loading",
  value = null,
  icon,
  children,
}: DashboardCardProps) => {
  return (
    <Card className="bg-brandGray rounded-[8px] h-full border-none shadow-lg">
      <CardHeader className="px-[18px] pt-[18px] flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        <div className="text-grayText">{icon}</div>
      </CardHeader>
      <CardContent className="px-[18px] pb-[18px]">
        {children ? (
          children
        ) : (
          <div>
            {value !== null ? (
              <div className="text-2xl font-normal h-[32px]">{value}</div>
            ) : (
              <Skeleton className="h-[32px] w-1/2" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
