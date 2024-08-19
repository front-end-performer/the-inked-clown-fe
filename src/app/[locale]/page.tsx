import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Video from "@/components/Video/video";
import About from "@/components/About/about";
import Artists from "@/components/Artists/artists";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import images from "@/app/api/images";

type Props = {
  params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = useTranslations("HomePage");
  const s = useTranslations("SocialMedia");

  return (
    <main
      id="home"
      className="show-onscroll flex min-h-screen flex-col items-center justify-between pt-0"
    >
      <Video />
      <About
        title={t("sectionAbout.title")}
        subTitle1={t("sectionAbout.subTitle1")}
        subTitle2={t("sectionAbout.subTitle2")}
        description={t("sectionAbout.description")}
        socialMedia={s('label')}
      />
      {/* <Artists 
        artists={t.raw("artists")}
        socialMedia={s('label')}
      /> */}
      {/* <ImageGallery images={images} />  */}
    </main>
  );
}
