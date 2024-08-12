import Artist from "./artist";
import { useTranslations } from "next-intl";

export default function Artists() {
  const t = useTranslations("HomePage");

  return (
    <section id="artists" className="show-onscroll relative bg-transparent z-0">
      <div className="relative w-screen h-screen bg-[url('/artists/artist_bg.jpg')] bg-cover bg-fixed bg-no-repeat z-10" />

      <div className="absolute m-0 top-[50%] left-[50%] transform-center -translate-x-[50%] -translate-y-[50%]  flex flex-col gap-y-20 max-w-7xl w-full bg-transparent z-20">
        {t.raw("artists").map((artist: any) => {
          return <Artist artist={artist} />;
        })}
      </div>
    </section>
  );
}
