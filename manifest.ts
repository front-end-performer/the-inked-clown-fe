import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = "de";
  const t = await getTranslations({ locale, namespace: "Manifest" });

  return {
    name: t("name"),
    start_url: "/",
    theme_color: "#101E33",
    icons: [
        {
          src: './favicon.ico',
          sizes: 'any',
          type: 'image/x-icon',
        },
      ],
  };
}
