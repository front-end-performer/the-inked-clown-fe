import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "./providers";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import Map from "@/components/Map/map";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Inked Clown Tattoo Studio",
  description: "Tattoo Studio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}>
          <NextUIProvider>
            <Header />

            <Providers>{children}</Providers>
            
            <Footer />
            <Map />
          </NextUIProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
