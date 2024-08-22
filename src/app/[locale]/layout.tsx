import { Abril_Fatface, Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
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

const abril_fatface_init = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
});
const inter_init = Inter({ subsets: ["latin"] });

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
  const t = await getTranslations({ locale, namespace: "Manifest" });

  return {
    title: t("name"),
  };
}

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
      <body
        className={`${abril_fatface_init.className}, ${inter_init.className}`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider messages={messages}>
          <NextUIProvider>
            <Navigation locale={locale} />
            {children}
            <Footer />
            <Map />
          </NextUIProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
