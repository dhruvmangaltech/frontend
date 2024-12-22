import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useUserStore = create(
  devtools((set) => ({
    userDetails: null,
    permissions: null,
    setUserDetails: (data) =>
      set(() => ({
        userDetails: data,
        permissions: data?.userPermission?.permission,
      })),
  }))
);

export const useSelectedPackageStore = create((set) => ({
  selectedPackage: null,
  setSelectedPackage: (data) => set(() => ({ selectedPackage: data })),
}));

export const useFooterTabStore = create((set) => ({
  selectedTab: "redemption",
  setSelectedTab: (data) => set(() => ({ selectedTab: data })),
}));

export const useRedeemNotification = create((set) => ({
  redeemNotification: null,
  setRedeemNotification: (data) => set(() => ({ redeemNotification: data })),
}));
