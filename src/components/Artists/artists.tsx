"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { ArtistsResponse, PhotosResponse, type ArtistType } from "@/lib";
import { useHomePageStore } from "@/providers/homePageStoreProvider";
import Artist from "./artist";

type Props = {
  allData: [ArtistsResponse, PhotosResponse] | null;
};

export default function ArtistsSection({ allData }: Props) {
  const social = useTranslations("SocialMedia");
  const { setAllData } = useHomePageStore((state) => state);

  useEffect(() => {
    if (!allData) {
      return;
    }
    
    setAllData(allData);
  }, [allData, setAllData]);

  if (!allData) {
    return;
  }

  return (
    <section id="artists" className="show-onscroll bg-transparent h-auto z-0">
      <div className="w-screen h-full bg-[url('/artists/artist_bg.jpg')] bg-cover bg-fixed bg-no-repeat z-10">
        <div className="flex flex-col items-center justify-center relative container w-full h-full mx-auto gap-16 py-28 px-4">
          {allData[0].data.map((artist: ArtistType) => {
            return (
              <Artist
                key={artist._id}
                artist={artist}
                socialMedia={social("label")}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
