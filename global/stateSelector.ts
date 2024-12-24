import { selector } from "recoil";
import { sidebarOpen } from "./state";

export const sidebarOpenSelector = selector({
  key: "sidebarOpenSelector",
  get: ({ get }) => {
    return get(sidebarOpen);
  },
});
