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
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { type Artist } from "@/types";

export default function ArtistPage() {
  const h = useTranslations("HomePage");
  const a = useTranslations("Navigation.artists");
  const s = useTranslations("SocialMedia");

  const [artist, setArtist] = useState<null | Artist>(null);
  const { slug } = useParams<{ slug: string }>();
  const artists = useRef(h.raw("artists"));

  const findArtistById = (id: number) => {
    const [artist] = artists.current.filter(
      (artist: Artist) => artist.id === id
    );

    setArtist(artist);
  };

  useEffect(() => {
    const [artist] = artists.current.filter((artist: Artist) =>
      artist.slug.includes(slug)
    );

    if (!artist) {
      return;
    }

    setArtist(artist);
  }, [slug]);

  return (
      <main className="h-full bg-[url('/artists/artist_bg.jpg')] bg-cover bg-no-repeat">
        <Header title={a("navItem")} />

        <div className="max-w-7xl flex flex-col sm:flex-row justify-center m-auto py-16">
          <div className="flex flex-1 justify-center sm:justify-end">
            {artist && (
              <Image
                isZoomed
                src={artist.src}
                width={700}
                radius="none"
                className="w-full h-full min-h-[500px]"
                alt={`The Inked Clown - ${artist.name}`}
              />
            )}
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

              <div className="flex gap-8 justify-end">
                {artist && (
                  <Button
                    isIconOnly
                    variant="light"
                    color="secondary"
                    className="bg-transparent"
                    disabled={artist.id === 0}
                    endContent={
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        color="white"
                        className={`${
                          artist.id !== 0
                            ? "hover:text-[#FF0F3D]"
                            : "text-neutral-400"
                        } w-[24px] h-[24px]`}
                        size="xl"
                        onClick={() => findArtistById(artist.id - 1)}
                      />
                    }
                  />
                )}
                {artist && (
                  <Button
                    isIconOnly
                    variant="light"
                    color="secondary"
                    disabled={artist.id === 1}
                    endContent={
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        color="white"
                        className={`${
                          artist.id !== 1
                            ? "hover:text-[#FF0F3D]"
                            : "text-neutral-400"
                        } w-[24px] h-[24px]`}
                        size="xl"
                        onClick={() => findArtistById(artist.id + 1)}
                      />
                    }
                  />
                )}
              </div>
            </div>

            <div className="bg-white p-8 mt-16">
              <p className="text-xl mb-8 underline underline-offset-4 decoration-2 decoration-[#FF0F3D] text-[#FF0F3D]">
                {artist?.title}
              </p>

              <h2 className="text-4xl mb-4">{artist?.name}</h2>
              <p>{artist?.description}</p>
            </div>
          </div>
        </div>
      </main>
  );
}
