"use client";

import { Card, CardBody, Image, Button } from "@nextui-org/react";
import NextImage from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Artist(props: any) {
  const { artist } = props;

  return (
    <Card className="border-none bg-transparent max-w-full" shadow="sm">
      <CardBody>
        <div className="grid grid-rows-[auto_auto_1fr] auto-rows-auto md:grid-rows-1 grid-flow-col gap-4">
          <Image
            as={NextImage}
            width={255}
            height={255}
            radius="full"
            classNames={{
              img: ["origin-center hover:scale-105"],
              wrapper: ["w-full m-auto col-span-3"],
            }}
            src={artist.image}
            alt="The Inked Clown Artist"
          />

          <div className="text-xl underline underline-offset-4 text-[#FF0F3D] text-center">
            {artist.title}
          </div>

          <div className="flex flex-col gap-y-12 lg:gap-y-6">
            <div className="bg-white p-6">
              <h2 className="text-lg font-semibold">{artist.name}</h2>

              <p className="text-normal text-black font-light">
                {artist.description}
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 w-auto">
              <div className="flex gap-x-6 items-center">
                <span className="hidden lg:block text-white font-normal">
                  {artist.socialMediaText}
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