// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
// import { Providers } from "../providers";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { locales } from "@/config";

import Navigation from "@/components/Header/navigation";
import Footer from "@/components/Footer/footer";
import Map from "@/components/Map/map";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    title: t("tabTitle"),
  };
}

// export const metadata: Metadata = {
//   title: "The Inked Clown Tattoo Studio",
//   description: "Tattoo Studio",
// };

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<Props>) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}>
          <NextUIProvider>
            <Navigation locale={locale} />

            {/* <Providers> */}
            {children}
            {/* </Providers> */}

            <Footer />
            <Map />
          </NextUIProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
