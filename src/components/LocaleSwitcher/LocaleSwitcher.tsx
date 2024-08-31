import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
// import { locales } from "@/i18n/configs";

export default function LocaleSwitcher(props: any) {
  const locale = useLocale();
  // const lang = new Set(['de', 'en']);
  // const t = useTranslations("LocaleSwitcher");

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          id: 0,
          value: "en",
          label: "en",
        },
        {
          id: 1,
          value: "de",
          label: "de",
        },
      ]}
    />
  );
}

{
  /* {locales.map((cur) => (
  <option key={cur} value={cur}>
    {t("locale", { locale: cur })}
  </option>
))} */
}
{
  /* </LocaleSwitcherSelect> */
}
