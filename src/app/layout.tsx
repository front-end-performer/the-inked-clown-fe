import type { Metadata } from "next";
import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getLocale,
  unstable_setRequestLocale,
} from "next-intl/server";
import { abril_fatface_init, inter_init } from "@/configs/fonts";
import "@/app/globals.css";

import Navigation from "@/components/Header/navigation";
import MainFooter from "@/components/Footer/mainFooter";
import Map from "@/components/Map/map";
import { NextAuthSessionProvider } from "@/providers";
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/authOptions";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "The Inked Clown Tattoo Studio",
  description: "The Inked Clown Tattoo Studio",
};

export default async function LocaleLayout({ children }: Readonly<Props>) {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();
  unstable_setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
        <NextAuthSessionProvider>
          <body
            className={`${abril_fatface_init.className}, ${inter_init.className}`}
            suppressHydrationWarning={true}
          >
            <NextIntlClientProvider messages={messages}>
              <NextUIProvider>
                <Navigation session={session} />

                <main>{children}</main>

                {!session && <MainFooter />}
                {!session && <Map />}
              </NextUIProvider>
            </NextIntlClientProvider>
          </body>
        </NextAuthSessionProvider>
    </html>
  );
}
