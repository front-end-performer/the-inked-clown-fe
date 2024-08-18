import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
// import PageLayout from '@/components/PageLayout';
import Video from "@/components/Video/video";
import About from "@/components/About/about";

type Props = {
  params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = useTranslations("HomePage");

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
      />
    </main>
    // <PageLayout title={t('title')}>
    //   <p className="max-w-[590px]">
    //     PAGE
    //   </p>
    // </PageLayout>
  );
}
