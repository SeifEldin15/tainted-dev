// @ts-nocheck

import { selector } from "recoil";
import { modalState } from "./modal-states";

export const modalStateSelector = selector({
  key: "modalStateSelector",
  get: ({ get }) => {
    return get(modalStateSelector);
  },
  set: ({ set }, newValue: string) => {
    set(modalState, newValue);
  },
});
