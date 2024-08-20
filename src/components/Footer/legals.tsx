import { useLocale, useTranslations } from "next-intl";
import { Link } from "@nextui-org/react";

export default function Legals() {
  const t = useTranslations("Legals");
  const locale = useLocale();

  return (
    <div className="h-72px flex justify-between items-center pt-16 pb-4 px-4 text-white">
      <p className="text-xs font-light">
        © {new Date().getFullYear()} {t("rights")}
      </p>
      <Link href={`/${locale}/terms`} className="text-xs font-light text-white hover:text-[#FF0F3D]">
        {t("terms")}
      </Link>
    </div>
  );
}
