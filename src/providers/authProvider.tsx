"use client";

import { SessionProvider } from "next-auth/react";

export const NextAuthSessionProvider = ({ children }: any) => {
  return (
    <SessionProvider refetchOnWindowFocus refetchInterval={5 * 60}>
      {children}
    </SessionProvider>
  );
};
