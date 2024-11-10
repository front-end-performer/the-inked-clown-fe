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
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { PhotoType, type ArtistType } from "@/lib/features/types";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import { useHomePageStore } from "@/lib";
import usePersistStore from "@/hooks/usePersistStore";

export default function ArtistPage() {
  // const searchparma = useSearchParams();
  const { replace } = useRouter();
  // const pathname = usePathname();

  const { slug } = useParams<{ slug: string }>();
  const [artist, setArtist] = useState<ArtistType | undefined>(undefined);
  const [currentSlideId, setCurrentSlideId] = useState(0);
  const [artistPhotos, setArtistPhotos] = useState<PhotoType[] | undefined>(
    undefined
  );
  // const { allData, loadAllData } = useHomePageStore();
  const store = usePersistStore(useHomePageStore, (state) => state);

  const s = useTranslations("SocialMedia");

  // useEffect(() => {
  // console.log("Artists page effect", store);

  //   if (store && Object.keys(store.artists).length === 0) {
  //     store?.loadAllData();
  //   }
  //   // } else {
  //   //   const artist = store?.artists.data.find(
  //   //     (artist: ArtistType) => artist.slug === slug
  //   //   );
  //   //   console.log("effect", artist);

  //   //   setArtist(artist);
  //   // }
  // }, [store]);

  useEffect(() => {
    // const artist = store.artists.data.find(
    //   (artist: ArtistType) => artist.slug === slug
    // );

    if (store && Object.keys(store.artists).length > 0) {
      const artist = store?.artists.data.find(
        (artist: ArtistType) => artist.slug === slug
      );
      console.log("effect fiter artist by slug", artist);

      setArtist(artist);
      replace(`/artist/${artist?.slug}`);
    }

    if (store && Object.keys(store.photos).length > 0) {
      const artistPhotos = store.photos.data.filter((photo) => {
        return artist?._id === photo._artistId;
      });

      setArtistPhotos(artistPhotos);
    }
  }, [slug, store]);

  return (
    <main className="h-full bg-[url('/artists/artist_bg.jpg')] bg-cover bg-no-repeat">
      <Header title={artist?.name || "no name"} />

      <div className="max-w-7xl flex flex-col sm:flex-row justify-center m-auto py-16">
        <div className="flex flex-1 justify-center sm:justify-end">
          <Image
            isZoomed
            src={artist?.url}
            width={700}
            radius="none"
            className="w-full h-full min-h-[500px]"
            alt={`The Inked Clown artist - ${artist?.name}`}
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4 pl-4 text-white">
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
          </div>

          <div className="bg-white p-8 mt-16">
            <p className="text-xl mb-8 underline underline-offset-4 decoration-2 decoration-[#FF0F3D] text-[#FF0F3D]">
              {artist?.gender.includes("female") ? "Künstlerin" : "Künstler"}
            </p>

            <h2 className="text-4xl mb-4 font-['abril_fatface_init']">
              {artist?.name}
            </h2>
            <p>{artist?.description}</p>
          </div>
        </div>
      </div>

      {/* {artistPhotos && <ImageGallery photos={artistPhotos} />} */}
    </main>
  );
}
