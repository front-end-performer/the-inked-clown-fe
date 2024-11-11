"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Image,
  Button,
} from "@nextui-org/react";
import type { PhotoType } from "@/lib";
import NextImage from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  photos: PhotoType[] | any;
};

export default function ArtistImageGallery({ photos }: Props) {
  const [isHovered, setIsHovered] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isImage, setIsImage] = useState<PhotoType | null>(null);

  const handleImageClick = (imageId: string): void => {
    const image = photos.find((img: PhotoType) => img._id === imageId);
    setIsImage(image);
  };

  const findImage = (id: number): void => {
    const image = photos.find((img: PhotoType, i: number) => i === id);
    setIsImage(image);
  };

  return (
    <section
      id="gallery"
      className="show-onscroll relative"
    >
      <div className="container mx-auto flex flex-wrap">
        {photos &&
          photos.map((img: PhotoType) => {
            const { _id, url, slug } = img;

            return (
              <div
                key={_id}
                className="cursor-pointer relative basis-full md:basis-1/2 lg:basis-1/4"
                onClick={() => handleImageClick(_id)}
                onMouseEnter={() => setIsHovered(_id)}
                onMouseLeave={() => setIsHovered("")}
              >
                <Image
                  isZoomed
                  as={NextImage}
                  src={url}
                  alt={slug}
                  width={768}
                  height={350}
                  radius="none"
                />

                <div
                  className={`${
                    isHovered !== _id ? "hidden" : ""
                  } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-8 border-[#FF0F3D] p-6 hover:bg-[#FF0F3D]/50 z-10 cursor-pointer`}
                  onClick={onOpen}
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlassPlus}
                    size="xl"
                    color="white"
                  />
                </div>
              </div>
            );
          })}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
        className="bg-slate-900 text-white"
        classNames={{
          header: "pl-8",
          closeButton:
            "mr-8 mt-8 border-4 hover:border-[#FF0F3D] rounded-none hover:bg-transparent text-white",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isImage?.slug}
              </ModalHeader>
              <ModalBody className="flex px-0 justify-center items-center">
                <div className="flex justify-center items-center gap-4 w-full h-full">
                  <Button
                    isIconOnly
                    variant="light"
                    color="secondary"
                    className="bg-transparent"
                    disabled={photos.indexOf(isImage) === 0}
                    endContent={
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        color="white"
                        className={`${
                          photos.indexOf(isImage) === 0
                            ? "text-neutral-400"
                            : "text-white hover:text-[#FF0F3D]"
                        } w-[24px] h-[24px]`}
                        size="xl"
                        onClick={() => findImage(photos.indexOf(isImage) - 1)}
                      />
                    }
                  />

                  {isImage && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Image
                        alt={isImage.slug}
                        src={isImage.url}
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                        className="md:max-h-[600px]"
                        sizes="100vw"
                      />
                    </div>
                  )}

                  <Button
                    isIconOnly
                    variant="light"
                    color="secondary"
                    className="bg-transparent"
                    disabled={photos.indexOf(isImage) === photos.length - 1}
                    endContent={
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        color="white"
                        className={`${
                          photos.indexOf(isImage) === photos.length - 1
                            ? "text-neutral-400"
                            : "text-white hover:text-[#FF0F3D]"
                        } w-[24px] h-[24px]`}
                        size="xl"
                        onClick={() => findImage(photos.indexOf(isImage) + 1)}
                      />
                    }
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
