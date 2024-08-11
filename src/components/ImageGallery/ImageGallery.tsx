"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import NextImage from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function ImageGallery({ images }: any) {
  const [isHovered, setIsHovered] = useState(null);
  const [isImage, setIsImage] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleImageClick = (imageId: any) => {
    console.log("imageId", imageId);
    const image = images.find((img: any) => img.id === imageId);
    console.log(image);

    setIsImage(image);
    // Handle the click event, such as opening a modal with the image
    // return
  };

  const nextImage = (id: any) => {
    console.log("imageId", id);
    const image = images.find((img: any) => img.id === id);

    setIsImage(image);
  };

  const prevImage = (id: any) => {
    console.log("imageId", id);
    const image = images.find((img: any) => img.id === id);

    setIsImage(image);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section
      id="gallery"
      className="show-onscroll flex flex-wrap justify-center relative"
    >
      {images.map((img: any) => {
        const { id, src, alt, width, height } = img;

        return (
          <div
            key={id}
            className={`${
              isHovered === id ? "bg-gradient-to-b from-indigo-500" : ""
            } relative max-w-full w-1/4 h-1/4 z-10 cursor-pointer`}
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isImage.artist.length > 0 ? `Artist ${isImage.artist}` : 'Tatto'}
              </ModalHeader>
              <ModalBody>
                  <FontAwesomeIcon
                    icon={faCircleArrowLeft}
                    onClick={() => prevImage(isImage.id - 1)}
                  />

                  {isImage && (
                    <Image
                      key={isImage.id}
                      as={NextImage}
                      src={isImage.src}
                      alt={isImage.alt}
                      width={isImage.width}
                      height={isImage.height}
                      radius="none"
                      loading="lazy"
                    />
                  )}

                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    onClick={() => nextImage(isImage.id + 1)}
                  />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
