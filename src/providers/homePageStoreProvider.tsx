"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import type { HomePageStore } from "@/lib";
import { createHomePageStore } from "@/lib";

export type HomePageStoreApi = ReturnType<typeof createHomePageStore>;

export const HomePageStoreContext = createContext<HomePageStoreApi | undefined>(
  undefined
);

export interface HomePageStoreProviderProps {
  children: ReactNode;
}

export const HomePageStoreProvider = ({
  children,
}: HomePageStoreProviderProps) => {
  const storeRef = useRef<HomePageStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createHomePageStore();
  }

  return (
    <HomePageStoreContext.Provider value={storeRef.current}>
      {children}
    </HomePageStoreContext.Provider>
  );
};

export const useHomePageStore = <T,>(
  selector: (store: HomePageStore) => T
): T => {
  const homePageStoreContext = useContext(HomePageStoreContext);

  if (!homePageStoreContext) {
    throw new Error(
      `useHomePageStore must be used within HomePageStoreProvider`
    );
  }

  return useStore(homePageStoreContext, selector);
};
