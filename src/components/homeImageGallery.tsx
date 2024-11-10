"use client";

import { useEffect, useState } from "react";
import usePersistStore from "@/hooks/usePersistStore";
import { useHomePageStore, type PhotoType } from "@/lib";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function HomeImageGallery() {
  const store = usePersistStore(useHomePageStore, (state) => state);

  const [isHovered, setIsHovered] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [photos, setPhotos] = useState<PhotoType[] | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | undefined>(
    undefined
  );

  useEffect(() => {
    if (store && Object.keys(store.photos).length > 0) {
      setPhotos(store.photos.data);
    }
  }, [store]);

  const selectedPhotoClick = (imageId: string): void => {
    if (!photos || photos?.length === 0) {
      return;
    }

    const photo = photos.find((img: PhotoType) => img._id === imageId);
    setSelectedPhoto(photo);
  };

  const findPhoto = (id: number): void => {
    if (!photos || photos?.length === 0) {
      return;
    }

    const photo = photos?.find((_, i: number) => i === id);
    setSelectedPhoto(photo);
  };

  if (!photos || photos?.length === 0) {
    return null;
  }

  return (
    <section
      id="gallery"
      className="show-onscroll h-auto z-0 relative bg-transparent"
    >
      <div className="w-screen h-full bg-[url('/artists/artist_bg.jpg')] bg-cover bg-fixed bg-no-repeat z-10">
        <div className="container mx-auto flex flex-wrap">
          {photos.map((photo: PhotoType) => {
            const { _id, url, slug } = photo;

            return (
              <div
                key={_id}
                className="basis-full sm:basis-1/2 md:basis-1/3 lx:basis-1/4 cursor-pointer relative"
                onClick={() => selectedPhotoClick(_id)}
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
                    {selectedPhoto?.slug}
                  </ModalHeader>
                  <ModalBody className="flex px-0 justify-center items-center">
                    {selectedPhoto && (
                      <div className="flex justify-center items-center gap-4 w-full h-full">
                        <Button
                          isIconOnly
                          variant="light"
                          color="secondary"
                          className="bg-transparent"
                          disabled={photos.indexOf(selectedPhoto) === 0}
                          endContent={
                            <FontAwesomeIcon
                              icon={faChevronLeft}
                              color="white"
                              className={`${
                                photos.indexOf(selectedPhoto) === 0
                                  ? "text-neutral-400"
                                  : "text-white hover:text-[#FF0F3D]"
                              } w-[24px] h-[24px]`}
                              size="xl"
                              onClick={() =>
                                findPhoto(photos.indexOf(selectedPhoto) - 1)
                              }
                            />
                          }
                        />

                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Image
                            alt={selectedPhoto.slug}
                            src={selectedPhoto.url}
                            style={{
                              width: "100%",
                              height: "auto",
                            }}
                            className="md:max-h-[600px]"
                            sizes="100vw"
                          />
                        </div>

                        <Button
                          isIconOnly
                          variant="light"
                          color="secondary"
                          className="bg-transparent"
                          disabled={
                            photos.indexOf(selectedPhoto) === photos.length - 1
                          }
                          endContent={
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              color="white"
                              className={`${
                                photos.indexOf(selectedPhoto) ===
                                photos.length - 1
                                  ? "text-neutral-400"
                                  : "text-white hover:text-[#FF0F3D]"
                              } w-[24px] h-[24px]`}
                              size="xl"
                              onClick={() =>
                                findPhoto(photos.indexOf(selectedPhoto) + 1)
                              }
                            />
                          }
                        />
                      </div>
                    )}
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </section>
  );
}
