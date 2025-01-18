"use client";

import { Invoices } from "@prisma/client";
import React from "react";
import moment from "moment";

const InvoiceTable = ({ tableData }: any) => {
  let reverseTableData = [...tableData].reverse();

  return (
    <div className="flex flex-row w-full overflow-x-scroll noscrollbar">
      <div className="flex flex-col text-sm w-full">
        {/* Table Top Bar */}
        <div className="flex flex-row bg-[#00D4E1]/10 py-3 rounded-tr-md rounded-tl-md border border-gray-100 px-3 min-w-min text-gray-900 font-medium">
          <div className="w-[50px]">{`No.`}</div>
          <div className="min-w-[300px] flex-1">{`Invoice ID`}</div>
          <div className="min-w-[150px] w-[150px] text-center">{`Date`}</div>
          <div className="min-w-[150px] w-[150px] text-center">{`Plan Name`}</div>
          <div className="min-w-[100px] w-[100px] text-center">{`Plan Price`}</div>
          <div className="min-w-[150px] w-[150px] text-center">{`Status`}</div>
        </div>
        {/* data */}
        {reverseTableData.map((invoice: Invoices, index: number) => {
          return (
            <div
              key={index}
              className="flex flex-row py-3 border-l border-r border-b border-gray-100 px-3 min-w-min hover:bg-gray-50 transition-colors"
            >
              <div className="w-[50px] text-gray-900">{`${index + 1}`}</div>
              <div className="min-w-[300px] flex-1 text-gray-900">{`${invoice?.uniqid}`}</div>
              <div className="min-w-[150px] w-[150px] text-center text-gray-500">
                {moment(invoice?.created_at * 1000).calendar()}
              </div>
              <div className="min-w-[150px] w-[150px] text-center text-gray-500">
                {invoice?.planName === "Core Residential Proxies" ? "Core Resi Proxies" : invoice?.planName}
              </div>
              <div className="min-w-[100px] w-[100px] text-center text-gray-900">{`$${invoice?.planPrice}`}</div>
              <div className="min-w-[150px] w-[150px] text-center text-xs flex items-center justify-center">
                {returnStatusColor(invoice?.status)}
              </div>
            </div>
          );
        })}
        {tableData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 border-l border-r border-b border-gray-100 px-3 min-w-min">
            <div className="text-gray-500">No Invoices Found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceTable;

const returnStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return (
        <div className="bg-[#00D4E1]/10 h-full flex items-center justify-center w-fit px-3 text-[#00D4E1] rounded-full pt-1">
          {status}
        </div>
      );
    case "PENDING":
      return (
        <div className="bg-yellow-400/10 h-full flex items-center justify-center w-fit px-3 text-yellow-500 rounded-full pt-1">
          {status}
        </div>
      );
    case "CANCELLED":
      return (
        <div className="bg-red-400/10 h-full flex items-center justify-center w-fit px-3 text-red-500 rounded-full pt-1">
          {status}
        </div>
      );
    case "VOIDED":
      return (
        <div className="bg-red-400/10 h-full flex items-center justify-center w-fit px-3 text-red-500 rounded-full pt-1">
          {status}
        </div>
      );
    default:
      return (
        <div className="bg-gray-400/10 h-full flex items-center justify-center w-fit px-3 text-gray-500 rounded-full pt-1">
          {status}
        </div>
      );
  }
};
