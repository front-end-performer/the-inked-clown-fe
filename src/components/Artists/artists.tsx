import Artist from "./artist";
import { useTranslations } from "next-intl";

export default function Artists() {
  const t = useTranslations("HomePage");

  return (
    <section id="artists" className="show-onscroll flex justify-center max-w-full w-full py-28 px-2 bg-[url('/artists/artist_bg.jpg')] bg-cover bg-no-repeat z-0">
      <div className="flex flex-col gap-y-20 max-w-7xl w-full">
        {t.raw("artists").map((artist: any) => {
          return (
            <Artist
              artist={artist}
            />
          );
        })}
      </div>
    </section>
  );
}
