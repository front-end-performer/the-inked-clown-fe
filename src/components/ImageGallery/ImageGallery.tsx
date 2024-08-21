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
import NextImage from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import { ArtistImage } from "@/types";

export default function ImageGallery({ images }: any) {
  const [isHovered, setIsHovered] = useState(null);
  const [isImage, setIsImage] = useState<null | ArtistImage>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleImageClick = (imageId: number) => {
    const image = images.find((img: ArtistImage) => img.id === imageId);

    setIsImage(image);
    // Handle the click event, such as opening a modal with the image
    // return
  };

  const findImage = (id: number) => {
    const image = images.find((img: ArtistImage) => img.id === id);

    setIsImage(image);
  };

  return (
    <section
      id="gallery"
      className="show-onscroll flex flex-col sm:flex-row flex-wrap justify-center relative"
    >
      {images.map((img: any) => {
        const { id, src, alt, width, height } = img;

        return (
          <div
            key={id}
            className={`${
              isHovered === id ? "bg-gradient-to-b from-indigo-500" : ""
            } relative max-w-full w-full h-full sm:w-1/4 sm:h-1/4 z-10 cursor-pointer`}
            onClick={() => handleImageClick(id)}
            onMouseEnter={() => setIsHovered(id)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <Image
              isZoomed
              as={NextImage}
              src={src}
              alt={alt}
              width={width}
              height={height}
              radius="none"
              loading="lazy"
            />

            <div
              className={`${
                isHovered !== id ? "hidden" : ""
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
        {isImage && (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {isImage.artist.length > 0
                    ? `Artist ${isImage.artist}`
                    : "Tatto"}
                </ModalHeader>
                <ModalBody className="flex justify-center items-center">
                  <div className="flex justify-center items-center gap-4 w-full h-full">
                    {/* <FontAwesomeIcon
                      icon={faChevronLeft}
                      onClick={() => findImage(isImage.id - 1)}
                      size="xl"
                      className="hover:text-[#FF0F3D] hover:cursor-pointer"
                    /> */}
                    <Button
                      isIconOnly
                      variant="light"
                      color="secondary"
                      className="bg-transparent"
                      disabled={isImage.id === 0}
                      endContent={
                        <FontAwesomeIcon
                          icon={faChevronLeft}
                          onClick={() => findImage(isImage.id - 1)}
                          size="xl"
                          color="white"
                          className={`${
                            isImage.id !== 0
                              ? "hover:text-[#FF0F3D]"
                              : "text-neutral-400"
                          } w-[24px] h-[24px]`}
                        />
                      }
                    />

                    {isImage && (
                      <Image
                        key={isImage.id}
                        as={NextImage}
                        src={isImage.src}
                        alt={isImage.alt}
                        width={isImage.width}
                        height={isImage.height}
                        className="flex-1 min-h-[350px] min-h-max"
                        radius="none"
                        loading="lazy"
                      />
                    )}

                    <Button
                      isIconOnly
                      variant="light"
                      color="secondary"
                      className="bg-transparent"
                      disabled={isImage.id === images.length - 1}
                      endContent={
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          onClick={() => findImage(isImage.id + 1)}
                          size="xl"
                          color="white"
                          className={`${
                            isImage.id !== images.length - 1
                              ? "hover:text-[#FF0F3D]"
                              : "text-neutral-400"
                          } w-[24px] h-[24px]`}
                        />
                      }
                    />
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        )}
      </Modal>
    </section>
  );
}
