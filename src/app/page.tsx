import { useLocale, useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import Video from "@/components/Video/video";
import About from "@/components/About/about";
import Artists from "@/components/Artists/artists";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import images from "@/app/api/images";

export default function IndexPage() {
  const locale = useLocale();
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const homepage = useTranslations("HomePage");
  const social = useTranslations("SocialMedia");
  const contact = useTranslations("Contact");

  return (
    <main
      id="home"
      className="show-onscroll flex min-h-screen flex-col items-center justify-between pt-0"
    >
      <Video
        part1={homepage("hero.part1")}
        part2={homepage("hero.part2")}
        part3={homepage("hero.part3")}
        part4={homepage("hero.part4")}
        description1={homepage("hero.description1")}
        description2={homepage("hero.description2")}
        contact={contact("contact")}
      />
      <About
        title={homepage("sectionAbout.title")}
        subTitle1={homepage("sectionAbout.subTitle1")}
        subTitle2={homepage("sectionAbout.subTitle2")}
        description={homepage("sectionAbout.description")}
        socialMedia={social("label")}
      />
      <Artists
        artists={homepage.raw("artists")}
        socialMedia={social("label")}
      />
      <ImageGallery images={images} />
    </main>
  );
}
