"use client";

import React from "react";
import InvoiceTable from "../../comps/invoices/InvoiceTable";

const InvoicesPage = ({ session, user }: any) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-5 h-full max-w-[1200px] mx-auto p-4">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-300">
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00D4E1]/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#00D4E1"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </div>
            <div className="text-[20px] sm:text-[24px] font-semibold text-gray-900">
              <span>{`Invoices`}</span>
            </div>
          </div>
          <div className="text-[13px] text-gray-500">{`Below is a list of all invoices you have created!`}</div>
        </div>
        <div className="mt-6">
          <InvoiceTable tableData={user.invoices} />
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
