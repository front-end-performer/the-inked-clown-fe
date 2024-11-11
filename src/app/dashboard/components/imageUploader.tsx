"use client";

import { useEffect, useRef, useState } from "react";
import { Image } from "@nextui-org/react";

type Props = {
  onInput: (pickedFile: File) => void;
  itemUrl?: string;
};

export default function ImageUploader({ itemUrl = "", onInput }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [prevPhoto, setPrevPhoto] = useState(itemUrl);

  const filePickerRef = useRef(null);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader: any = new FileReader();
    fileReader.onload = () => {
      setPrevPhoto(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const pickedFile = event.target.files[0];

    if (pickedFile.size > 1000000) {
      alert("Image Size should not be greater than 1mb");
      setFile(null);
      return;
    }

    setFile(pickedFile);
    onInput(pickedFile);
  };

  return (
    <div className="relative">
      <input
        id="photo"
        type="file"
        ref={filePickerRef}
        required
        className="absolute opacity-0 h-full z-10 w-full"
        onChange={pickedHandler}
      />

      <Image
        alt={file?.name}
        className="object-cover relative z-0"
        width="100%"
        height={300}
        shadow="md"
        src={prevPhoto}
      />
    </div>
  );
}
