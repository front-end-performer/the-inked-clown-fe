import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/header";
import { Providers } from './providers';
import "./globals.css";
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

// library.add(faTwitter, faFontAwesome);



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Front end performer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextUIProvider>
          <Header />

          <Providers>{children}</Providers>
        </NextUIProvider>
      </body>
    </html>
  );
}
