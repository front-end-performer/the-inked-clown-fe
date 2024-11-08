"use client";

import { useTranslations } from "next-intl";
import { Button, Link } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";

export default function Legals({ session }: any) {
  const t = useTranslations("Legals");

  const singInOut = () => {
    if (!session) {
      signIn();
    } else {
      signOut();
    }
  };

  return (
    <div className="h-72px flex justify-between items-center pt-16 pb-4 px-4 text-white">
      <p className="text-xs font-light">
        © {new Date().getFullYear()} {t("rights")}
      </p>

      <div className="flex gap-x-2">
        <Link
          href="/terms"
          className="text-xs font-light text-white hover:text-[#FF0F3D]"
        >
          {t("terms")}
        </Link>
        <Button
          onClick={singInOut}
          size="sm"
          variant="light"
          className="text-xs font-light text-white data-[hover=true]:bg-[#ff0f3d] p-0"
        >
          {!session ? t("login") : t("logout")}
        </Button>
      </div>
    </div>
  );
}
