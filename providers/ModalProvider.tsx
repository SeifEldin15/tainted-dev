"use client";
import React, { Fragment, useState, useEffect } from "react";
import { LogoutModal } from "@/components/modals/LogoutModal";
import { PurchaseModal } from "@/components/modals/PurchaseModal";
import { PurchaseIPV6Modal } from "@/components/modals/PurchaseIPV6Modal";
import { PurchaseIPV4Modal } from "@/components/modals/PurchaseIPV4Modal";
import { PurchaseCoreResiModal } from "@/components/modals/PurchaseCoreResiModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Fragment>
      {/* Logout Modal so user can logout from the dashboard */}
      <LogoutModal />
      {/* Purchase Modal so user can create an invoice according to which plan he want to buy */}
      <PurchaseModal />
      {/* IPv6 Purchase Modal */}
      <PurchaseIPV6Modal />
      {/* IPv4 Purchase Modal */}
      <PurchaseIPV4Modal />
      {/* Purchase Core Residential Modal */}
      <PurchaseCoreResiModal />
    </Fragment>
  );
};
