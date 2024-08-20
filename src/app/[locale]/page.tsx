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

  const homepage = useTranslations("HomePage");
  const social = useTranslations("SocialMedia");

  return (
    <main
      id="home"
      className="show-onscroll flex min-h-screen flex-col items-center justify-between pt-0"
    >
      <Video />
      <About
        title={homepage("sectionAbout.title")}
        subTitle1={homepage("sectionAbout.subTitle1")}
        subTitle2={homepage("sectionAbout.subTitle2")}
        description={homepage("sectionAbout.description")}
        socialMedia={social('label')}
      />
      <Artists 
        artists={homepage.raw("artists")}
        socialMedia={social('label')}
      />
      <ImageGallery images={images} /> 
    </main>
  );
}
