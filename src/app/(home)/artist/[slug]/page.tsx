"use client";

import Header from "@/components/Header/header";
import { useTranslations } from "next-intl";
import { Button, Link, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { PhotoType, type ArtistType } from "@/lib/features/types";
import usePersistStore from "@/hooks/usePersistStore";
import { useHomePageStore } from "@/lib";
import ArtistImageGallery from "@/app/(home)/artist/components/ArtistImageGallery";

export default function ArtistPage() {
  const store = usePersistStore(useHomePageStore, (state) => state);
  const s = useTranslations("SocialMedia");

  const [artists, setArtists] = useState<ArtistType[]>([]);
  const [artistPhotos, setArtistPhotos] = useState<PhotoType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (
      store &&
      Object.keys(store.artists).length > 0 &&
      Object.keys(store.photos).length > 0
    ) {
      setArtists(store.artists.data);

      const filteredPhotos = store.photos.data.filter((photo) => {
        return store.artists.data[currentIndex]._id === photo._artistId;
      });

      setArtistPhotos(filteredPhotos);
    }
  }, [store]);

  const showNextArtist = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % artists.length);

    if (store && Object.keys(store.photos).length > 0) {
      const filteredPhotos = store.photos.data.filter((photo) => {
        return artists[currentIndex + 1]._id === photo._artistId;
      });

      setArtistPhotos(filteredPhotos);
    }
  };

  // Function to show the previous artist
  const showPreviousArtist = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;

      if (store && Object.keys(store.photos).length > 0) {
        const filteredPhotos = store?.photos.data.filter((photo) => {
          return artists[currentIndex - 1]._id === photo._artistId;
        });

        setArtistPhotos(filteredPhotos);
      }

      return newIndex < 0 ? artists.length - 1 : newIndex;
    });
  };

  // Get the current artist
  const currentArtist: ArtistType = artists[currentIndex];

  return (
    <main className="h-full bg-[url('/artists/artist_bg.jpg')] bg-cover bg-no-repeat">
      <Header title={currentArtist?.name || "no name"} />

      <div className="container mx-auto grid grid-cols-[1fr_2fr] py-16 gap-4">
        <Image
          isZoomed
          src={currentArtist?.url}
          width={500}
          height={350}
          radius="none"
          // className="w-full h-full"
          alt={`The Inked Clown artist - ${currentArtist?.name}`}
        />

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4 text-white">
              <span className="font-light">{s("label")}</span>

              <Link href="#">
                <FontAwesomeIcon
                  icon={faFacebook}
                  color="white"
                  className="hover:text-[#FF0F3D] w-[24px] h-[24px]"
                  size="xl"
                />
              </Link>

              <Link href="#">
                <FontAwesomeIcon
                  icon={faInstagram}
                  color="white"
                  className="hover:text-[#FF0F3D] w-[24px] h-[24px]"
                  size="xl"
                />
              </Link>
            </div>

            <div className="flex gap-8 justify-end">
              <Button
                isIconOnly
                variant="light"
                color="secondary"
                className="bg-transparent"
                disabled={currentIndex === 0}
                endContent={
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    color="white"
                    className={`${
                      currentIndex === 0
                        ? "text-neutral-400"
                        : "text-white hover:text-[#FF0F3D]"
                    } w-[24px] h-[24px]`}
                    size="xl"
                    onClick={showPreviousArtist}
                  />
                }
              />

              <Button
                isIconOnly
                variant="light"
                disabled={currentIndex + 1 === artists.length}
                endContent={
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    color="white"
                    className={`${
                      currentIndex + 1 === artists.length
                        ? "text-neutral-400"
                        : "text-white hover:text-[#FF0F3D]"
                    } w-[24px] h-[24px]`}
                    size="xl"
                    onClick={showNextArtist}
                  />
                }
              />
            </div>
          </div>

          <div className="bg-white p-8 mt-4 text-black">
            <p className="text-xl mb-8 underline underline-offset-4 decoration-2 decoration-[#FF0F3D] text-[#FF0F3D]">
              {currentArtist?.gender.includes("female")
                ? "Künstlerin"
                : "Künstler"}
            </p>

            <h2 className="text-4xl mb-4 font-['abril_fatface_init']">
              {currentArtist?.name}
            </h2>
            <p className="text-normal">{currentArtist?.description}</p>
          </div>
        </div>
      </div>

      <ArtistImageGallery photos={artistPhotos} />
    </main>
  );
}
