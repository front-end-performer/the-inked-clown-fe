"use client";

import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useState } from "react";

export default function ImageGallery({ images }: any) {
  const [isHovered, setIsHovered] = useState(null);
  const handleImageClick = (imageId: any) => {
    console.log("imageId", imageId);

    // Handle the click event, such as opening a modal with the image
  };
  const handleStyling = (imageId: any) => {
    console.log("imageId", imageId);
    setIsHovered(imageId);
    // const id = imageId;
    
    // if (imageId === 0) {
    //     setIsHovered(imageId);
    // }
    // Handle the click event, such as opening a modal with the image
  };

  return (
    <section
      id="gallery"
      className="show-onscroll flex flex-wrap justify-center"
    >
      {images.map((img: any) => {
        const { id, src, alt, width, height } = img;

        return (
          <div
            key={id}
            className="max-w-full w-1/4 h-1/4"
            onClick={() => handleImageClick(id)}
            onMouseEnter={() => setIsHovered(id)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <Image
            isZoomed
              as={NextImage}
              src={src}
              alt={alt}
              width={700}
              height={350}
              radius="none"
              loading="lazy"
            />
          </div>
        );
      })}
    </section>
  );
}
