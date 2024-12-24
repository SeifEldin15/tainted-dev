import { Loader } from "lucide-react";
import React from "react";

const DashboardLoading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2">
      <Loader size={40} color="#cacaca" className="animate-spin" />
      <div>Loading</div>
    </div>
  );
};

export default DashboardLoading;
