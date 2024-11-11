import { ReactNode, Suspense } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { NextAuthSessionProvider } from "@/providers/index";
import { abril_fatface_init, inter_init } from "@/configs/fonts";
import "@/app/globals.css";

import Navigation from "@/components/Header/navigation";
import MainFooter from "@/components/Footer/mainFooter";
import { HomePageStoreProvider } from "@/providers/homePageStoreProvider";
import LoadingAnimation from "@/components/loading/loadingAnimation";
const Map = dynamic(() => import("@/components/Map/map"));

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "The Inked Clown Tattoo Studio",
  description: "The Inked Clown Tattoo Studio",
};

export default async function RootLayout({ children }: Readonly<Props>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang="de">
      <HomePageStoreProvider>
        <NextAuthSessionProvider>
          <body
            className={`${abril_fatface_init.className}, ${inter_init.className}`}
            suppressHydrationWarning={true}
          >
            <NextIntlClientProvider messages={messages}>
              <NextUIProvider>
                <Navigation />

                <Suspense fallback={<LoadingAnimation />}>
                  <main>{children}</main>
                </Suspense>

                <MainFooter />
                <Map />
              </NextUIProvider>
            </NextIntlClientProvider>
          </body>
        </NextAuthSessionProvider>
      </HomePageStoreProvider>
    </html>
  );
}
