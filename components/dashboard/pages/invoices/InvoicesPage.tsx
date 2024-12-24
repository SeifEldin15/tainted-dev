"use client";

import React from "react";
import InvoiceTable from "../../comps/invoices/InvoiceTable";

const InvoicesPage = async ({ session, user }: any) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-5 h-full">
      <div className="flex flex-col gap-[8px]">
        <div className="text-[20px] sm:text-[24px] font-semibold">
          <span>{`Invoices`}</span>
        </div>
        <div className="text-[13px] text-grayText">{`Below is a list of all invoices you have created!`}</div>
      </div>
      <InvoiceTable tableData={user.invoices} />
    </div>
  );
};

export default InvoicesPage;
