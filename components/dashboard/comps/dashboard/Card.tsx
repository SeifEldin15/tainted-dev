import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  value?: string | number | null;
  secondaryValue?: string | null;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  trend?: number;
  subtitle?: string;
}

const DashboardCard = ({
  title = "Loading",
  value = null,
  secondaryValue = null,
  icon,
  children,
  trend,
  subtitle,
}: DashboardCardProps) => {
  return (
    <Card className="bg-white rounded-lg h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <CardHeader className="px-5 pt-5 flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {subtitle && (
            <p className="text-xs text-gray-400">{subtitle}</p>
          )}
        </div>
        <div className="bg-[#00D4E1]/10 p-2.5 rounded-xl">{icon}</div>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        {children ? (
          children
        ) : (
          <div className="space-y-2">
            {value !== null ? (
              <>
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  {trend !== undefined && (
                    <div className={cn(
                      "text-sm font-medium flex items-center gap-0.5",
                      trend > 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
                    </div>
                  )}
                </div>
                {secondaryValue && (
                  <div className="text-sm text-gray-500">{secondaryValue}</div>
                )}
              </>
            ) : (
              <Skeleton className="h-8 w-1/2" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
