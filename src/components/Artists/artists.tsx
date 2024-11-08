"use client";

import usePersistStore from "@/hooks/usePersistStore";
import { ArtistType, useHomePageStore } from "@/lib/features";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Artist from "./artist";

export default function Artists() {
  const store = usePersistStore(useHomePageStore, (state) => state);
  const social = useTranslations("SocialMedia");

  useEffect(() => {
    if (store && Object.keys(store.artists).length === 0) {
      store?.loadAllData();
    }
  }, [store]);

  if (store && Object.keys(store.artists).length === 0) {
    return null;
  }

  return (
    <section id="artists" className="show-onscroll bg-transparent h-auto z-0">
      <div className="w-screen h-full bg-[url('/artists/artist_bg.jpg')] bg-cover bg-fixed bg-no-repeat z-10">
        <div className="flex flex-col items-center justify-center relative max-w-7xl w-full h-full m-auto gap-16 py-28">
          {store?.artists.data.map((artist: ArtistType) => {
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
