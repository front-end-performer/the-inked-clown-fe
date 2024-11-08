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
import { type ArtistImage } from "@/types";
// import { useAppContext } from "@/app/context/context";

export default function ImageGallery({photos} : any) {
  const [isHovered, setIsHovered] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(photos);
  
  // const [isImage, setIsImage] = useState<ArtistImage | null>(null);
  // const data: any = useAppContext();

  // if (!data) {
  //   return null;
  // }

  // const handleImageClick = (imageId: string) => {
  //   const image = data.images.find((img: ArtistImage) => img._id === imageId);

  //   setIsImage(image);
  //   // Handle the click event, such as opening a modal with the image
  //   // return
  // };

  // const findImage = (id: number) => {
  //   const image = data.images.find((img: ArtistImage, i: number) => i === id);
  //   setIsImage(image);
  // };

  return (
    <section
      id="gallery"
      className="show-onscroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative"
    >
      PHOTOS
      {/* {photos && photos.data.map((img: ArtistImage) => {
        const { _id, url, slug } = img;

        return (
          <div
            key={_id}
            className="cursor-pointer relative"
            // onClick={() => handleImageClick(_id)}
            onMouseEnter={() => setIsHovered(_id)}
            onMouseLeave={() => setIsHovered("")}
          >
            <Image
              isZoomed
              as={NextImage}
              src={url}
              alt={slug}
              width={350}
              height={350}
              radius="none"
              className="max-w-[350px] max-h-[350px]"
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
      })} */}

      {/* <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
        className="bg-slate-900 text-white"
        classNames={{
          header: "pl-8",
          closeButton:
            "mr-8 mt-8 border-4 hover:border-[#FF0F3D] rounded-none hover:bg-transparent text-white",
        }}
      > */}
        {/* {isImage && (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {isImage.slug}
                </ModalHeader>
                <ModalBody className="flex px-0 justify-center items-center">
                  <div className="flex justify-center items-center gap-4 w-full h-full">
                    <Button
                      isIconOnly
                      variant="light"
                      color="secondary"
                      className="bg-transparent"
                      disabled={data.images.indexOf(isImage) === 0}
                      endContent={
                        <FontAwesomeIcon
                          icon={faChevronLeft}
                          onClick={() =>
                            findImage(data.images.indexOf(isImage) - 1)
                          }
                          size="xl"
                          color={`${
                            data.images.indexOf(isImage) === 0
                              ? "black"
                              : "white"
                          }`}
                          className={`w-[24px] h-[24px]`}
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
                      disabled={
                        data.images.indexOf(isImage) === data.images.length - 1
                      }
                      endContent={
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          onClick={() =>
                            findImage(data.images.indexOf(isImage) + 1)
                          }
                          size="xl"
                          color={`${
                            data.images.indexOf(isImage) ===
                            data.images.length - 1
                              ? "black"
                              : "white"
                          }`}
                          className={` w-[24px] h-[24px]`}
                        />
                      }
                    />
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        )} */}
      {/* </Modal> */}
    </section>
  );
}
