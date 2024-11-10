"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { uploadFileHandler } from "@/app/api/upload";
import type { ArtistsResponse, ArtistType } from "@/lib";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import ImageUploader from "../imageUploader";

export type PhotoFormData = {
  title: string;
  description: string;
  artistId: string;
  url: string;
};

type Props = {
  artists: ArtistsResponse;
  submit: (form: PhotoFormData, e: SyntheticEvent) => void;
  cancelHandler: (value: number) => void;
  // slectedKeyHandler: Set<number> | null | undefined;
};

export default function AddNewPhotoTab({
  artists,
  submit,
  cancelHandler,
}: Props) {
  const [selectArtist, setSelectArtist] = useState<
    {
      name: string;
      value: string;
    }[]
  >([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    artistId: "",
    url: "",
  });

  useEffect(() => {
    if (!artists) {
      return;
    }

    const customArray = artists.data.map((item: ArtistType) => ({
      name: item.name,
      value: item._id,
    }));

    setSelectArtist(customArray);
  }, [artists]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleImageChange = async (file: File) => {
    await uploadFileHandler({
      fileName: file.name,
      file,
    }).then((fileUrl: string | undefined) => {
      setFormData((prevState) => ({
        ...prevState,
        url: fileUrl || "",
      }));
    });
  };

  return (
    <div className="w-1/2 xl:w-1/3">
      <Card shadow="sm">
        <CardBody className="overflow-visible p-0">
          <ImageUploader onInput={handleImageChange} />
          <div className="flex flex-col gap-y-2 p-4">
            <Input
              value={formData.title}
              color="default"
              onChange={handleInput}
              type="text"
              size="sm"
              name="title"
              label="Title"
              required
              className="[&_[data-slot='inner-wrapper']]:justify-end"
              variant="bordered"
            />

            <Select
              label="Select artist"
              className="[&_svg]:hidden"
              size="sm"
              name="artistId"
              color="default"
              variant="bordered"
              required
              selectedKeys={[formData.artistId]}
              onChange={handleInput}
            >
              {selectArtist.map((artist: any) => (
                <SelectItem key={artist.value} className="text-black">
                  {artist.name}
                </SelectItem>
              ))}
            </Select>

            <Textarea
              label="Description"
              variant="bordered"
              placeholder="Enter your description"
              disableAnimation
              disableAutosize
              required
              name="description"
              value={formData.description}
              onChange={handleInput}
              type="text"
              classNames={{
                base: "max-w-auto",
                input: "resize-y min-h-[40px]",
              }}
            />
          </div>
        </CardBody>
        <CardFooter className="flex gap-x-4">
          <Button
            onClick={() => {
              setFormData({
                title: "",
                artistId: "",
                description: "",
                url: "",
              });

              cancelHandler(5);
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={(e) => submit(formData, e)}
            color={
              formData.title.length === 0 || formData.url.length === 0
                ? "warning"
                : "default"
            }
            disabled={formData.title.length === 0 || formData.url.length === 0}
          >
            Upload new photo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
