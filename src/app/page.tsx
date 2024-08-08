import Video from "@/components/Video/video";
import About from "@/components/About/about";
// import Artists from "@/components/Artists/artists";
// import { useTranslations } from "next-intl";

export default function Home() {
  // const t = useTranslations("HomePage");

  return (
    <main
      id="home"
      className="show-onscroll flex min-h-screen flex-col items-center justify-between pt-0"
    >
      {/* <div className="h-[200px] bg-grey-300">
      <h1 className="text-blue-800">{t("title")}</h1>
      </div> */}
      <Video />
      <About />
      {/* <Artists /> */}
      <div className="h-screen bg-blue-700"></div>
    </main>
  );
}
