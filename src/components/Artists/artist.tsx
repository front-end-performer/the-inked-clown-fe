"use client";

import { Card, CardBody, Image, Button } from "@nextui-org/react";
import NextImage from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Artist({ artist, socialMedia }: any) {
  return (
    <Card className="border-none bg-transparent max-w-full" shadow="sm">
      <CardBody>
        <div className="grid grid-rows-[auto_auto_1fr] auto-rows-auto md:grid-rows-1 grid-flow-col md:gap-4">
          <Image
            as={NextImage}
            width={255}
            height={255}
            radius="full"
            placeholder="blur"
            blurDataURL="data:application/xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48RXJyb3I+PENvZGU+SHR0cFZlcnNpb25Ob3RTdXBwb3J0ZWQ8L0NvZGU+PE1lc3NhZ2U+VGhlIEhUVFAgdmVyc2lvbiBzcGVjaWZpZWQgaXMgbm90IHN1cHBvcnRlZC48L01lc3NhZ2U+PFJlcXVlc3RJZD43MkQ4NUVCQkMxQjg3QUVGPC9SZXF1ZXN0SWQ+PEhvc3RJZD5FdWxFc05sTWVLYnBHNStSVlc1bWFFTWlENzJNQ1pCTW8zbytGWmJuVnBYVVJrV1RQZkxoZC9iSWpoa0pUWDJ3czBOSVJQQVcyNGY1U3BwdUNEVkQwK25qQVkvbDNsVDQ8L0hvc3RJZD48L0Vycm9yPg=="
            classNames={{
              img: ["origin-center hover:scale-105"],
              wrapper: ["w-full m-auto col-span-3"],
            }}
            src={artist.src}
            alt={artist.alt}
          />

          <div className="text-xl underline underline-offset-4 text-[#FF0F3D] text-center">
            {artist.title}
          </div>

          <div className="flex flex-col gap-y-12 lg:gap-y-6">
            <div className="bg-white p-6">
              <h2 className="text-lg font-semibold font-['abril_fatface_init']">{artist.name}</h2>

              <p className="text-normal text-black font-light">
                {artist.description}
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 w-auto">
              <div className="flex gap-x-6 items-center">
                <span className="hidden lg:block text-white font-normal">
                  {socialMedia}
                </span>
                <Link href={artist.socialUrl}>
                  <FontAwesomeIcon
                    icon={faTwitter}
                    size="xl"
                    color="white"
                    className="w-9 h-9 hover:text-[#FF0F3D]"
                  />
                </Link>

                <Link href={artist.socialUrl}>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="xl"
                    color="white"
                    className="w-9 h-9 hover:text-[#FF0F3D]"
                  />
                </Link>
              </div>

              <Link href={artist.slug}>
                <Button
                  title="See artist gallery"
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
                  {artist.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
