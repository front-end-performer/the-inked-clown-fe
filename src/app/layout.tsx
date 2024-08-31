import { Abril_Fatface, Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import {
  getMessages,
  getLocale,
  //   // unstable_setRequestLocale,
} from "next-intl/server";
import "@/app/globals.css";

import Navigation from "@/components/Header/navigation";
import MainFooter from "@/components/Footer/mainFooter";
import Map from "@/components/Map/map";

const abril_fatface_init = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
});
const inter_init = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({
  children,
}: Readonly<Props>) {
  const locale = await getLocale();
  // unstable_setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${abril_fatface_init.className}, ${inter_init.className}`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider messages={messages}>
          <NextUIProvider>
            <Navigation />
            {children}
            <MainFooter />
            <Map />
          </NextUIProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
