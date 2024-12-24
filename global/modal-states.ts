import { atom } from "recoil";

export type modalNameTypes =
  | null
  | "logoutModal"
  | "purchaseModal"
  | "PurchaseIPV4Modal"
  | "PurchaseIPV6Modal"
  | "PurchaseCoreResiModal";

export interface modalStateType {
  modalName: modalNameTypes;
  modalData?: {} | any;
}

export const modalState = atom({
  key: "modalState",
  default: { modalName: null, modalData: {} } as modalStateType,
});
