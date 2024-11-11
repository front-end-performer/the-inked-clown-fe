import { ReactNode } from "react";
import { NextAuthSessionProvider } from "@/providers/index";
import { NextUIProvider } from "@nextui-org/react";
import { abril_fatface_init, inter_init } from "@/configs/fonts";
import "@/app/globals.css";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { type Session } from "@/lib";
import Header from "./components/header";
import { HomePageStoreProvider } from "@/providers/homePageStoreProvider";

type Props = {
  children: ReactNode;
};

export default async function DashBoardLayout({ children }: Readonly<Props>) {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <html lang="de">
      <NextAuthSessionProvider>
        <body
          className={`${abril_fatface_init.className}, ${inter_init.className}`}
          suppressHydrationWarning={true}
        >
          <NextUIProvider>
            <Header session={session} />

            <HomePageStoreProvider>
              <main>{children}</main>
            </HomePageStoreProvider>
          </NextUIProvider>
        </body>
      </NextAuthSessionProvider>
    </html>
  );
}
