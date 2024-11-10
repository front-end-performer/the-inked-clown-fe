import type { ArtistType } from "@/lib";
import { Image, Button } from "@nextui-org/react";
import NextImage from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

type Props = {
  artist: ArtistType;
  socialMedia: string;
};

export default function Artist({ artist, socialMedia }: Props) {
  return (
    <div className="w-full md:px-4 xl:px-0">
      <div className="flex flex-col md:flex-row justify-start gap-2">
        <div className="flex justify-center items-center shrink-0">
          <Image
            as={NextImage}
            width={350}
            height={350}
            radius="full"
            placeholder="blur"
            blurDataURL="data:application/xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48RXJyb3I+PENvZGU+SHR0cFZlcnNpb25Ob3RTdXBwb3J0ZWQ8L0NvZGU+PE1lc3NhZ2U+VGhlIEhUVFAgdmVyc2lvbiBzcGVjaWZpZWQgaXMgbm90IHN1cHBvcnRlZC48L01lc3NhZ2U+PFJlcXVlc3RJZD43MkQ4NUVCQkMxQjg3QUVGPC9SZXF1ZXN0SWQ+PEhvc3RJZD5FdWxFc05sTWVLYnBHNStSVlc1bWFFTWlENzJNQ1pCTW8zbytGWmJuVnBYVVJrV1RQZkxoZC9iSWpoa0pUWDJ3czBOSVJQQVcyNGY1U3BwdUNEVkQwK25qQVkvbDNsVDQ8L0hvc3RJZD48L0Vycm9yPg=="
            classNames={{
              img: ["origin-center hover:scale-105"],
              wrapper: ["w-full m-auto col-span-3"],
            }}
            className="mx-auto max-w-[250px] max-h-[250px] lg:max-w-[350px] lg:max-h-[350px]"
            src={artist.url}
            alt={artist.slug}
          />
        </div>

        <div className="md:max-w-[92px] w-full">
          <h3 className="text-lg py-4 sm:py-0 underline underline-offset-4 text-[#FF0F3D] text-center md:text-right">
            {artist.gender === "female" ? "Künstlerin" : "Künstler"}
          </h3>
        </div>

        <div className="w-full">
          <div className="bg-white p-4">
            <h2 className="text-2xl font-semibold font-['abril_fatface_init'] leading-10">
              {artist.name}
            </h2>

            <p className="text-normal text-black font-light">
              {artist.description}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full mt-2 px-4 xl:px-0">
            <div className="flex gap-x-4 items-center justify-between w-full items-center">
              <div className="flex gap-x-4">
                <span className="hidden lg:inline text-white font-normal">
                  {socialMedia}
                </span>
                <Link href={artist.instagram}>
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="xl"
                    color="white"
                    className="w-9 h-9 hover:text-[#FF0F3D]"
                  />
                </Link>

                <Link href={artist.facebook}>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="xl"
                    color="white"
                    className="w-9 h-9 hover:text-[#FF0F3D]"
                  />
                </Link>
              </div>

              <Link
                href={{
                  pathname: `/artist/${artist.slug}`,
                }}
                className="block"
              >
                <Button
                  title="Siehe Künstlergalerie"
                  radius="none"
                  className="text-normal text-white bg-[#FF0F3D] md:bg-transparent md:hover:bg-[#FF0F3D]"
                  endContent={
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      size="xl"
                      color="white"
                      className="w-6 h-6"
                    />
                  }
                >
                  Mehr anzeigen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
