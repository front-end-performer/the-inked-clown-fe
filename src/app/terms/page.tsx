import Header from "@/components/Header/header";
import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("Terms");

  return (
    <main className="h-full bg-grey-800">
      <Header title={t("header")} />

      <div className="max-w-5xl m-auto px-4 py-8 h-full">
        <h2 className="text-xl underline underline-offset-4">{t("label")}</h2>
        <address className="text-normal mt-4">
          {t("address.street")} <br /> 
          {t("address.zipCity")} <br />
          {t("address.tel")} <br />
          {t("address.email")} <br />
        </address>

        <p className="mt-4">{t("address.extra")}</p>

        <h3 className="mt-12 text-lg font-semibold">{t("disclaimer")}</h3>
        <h4 className="mt-4 font-semibold">{t("disclaimerLabel")}</h4>
        <p className="mt-4">{t("disclaimerText")}</p>

        <h3 className="mt-12 font-semibold">{t("copyrightLabel")}</h3>
        <p className="mt-4">{t("copyrightText")}</p>
      </div>
    </main>
  );
}
