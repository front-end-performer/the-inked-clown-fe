import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const locale = useLocale();

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
