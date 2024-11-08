"use client";

import { useState } from "react";
import { type ArtistFormDataType, useArtistData } from "@/hooks";
import type { ArtistsResponse, ArtistType } from "@/lib/features";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import ImageUploader from "../imageUploader";
import Link from "next/link";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  artists: ArtistsResponse;
  submit: (
    id: string,
    form: ArtistFormDataType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  submitDelete: (id: string) => void;
};

export default function AllArtistsTab({
  artists,
  submit,
  submitDelete,
}: Props) {
  const [touched, setTouched] = useState(false);
  const {
    handleInput,
    setItemId,
    onPressHandler,
    handleImageChange,
    clearInput,
    isRequired,
    formData,
    isInvalid,
    isValid,
    itemId,
  } = useArtistData();

  return (
    <div className="gap-2 grid grid-cols-4">
      {artists.data.map((item: ArtistType) => (
        <Card shadow="sm" key={item._id} className="grow-0 relative">
          <CardBody className="overflow-visible p-0">
            {itemId.localeCompare(item._id) ? (
              <>
                <Image
                  alt={item.slug}
                  className="object-cover"
                  width="100%"
                  height={300}
                  shadow="md"
                  src={item.url}
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground/90">
                    {item.name}
                  </h3>
                  <p className="text-small text-neutral-500 mb-2 capitalize">
                    {item.kind}
                  </p>
                  <p className="text-small mb-4">{item.description}</p>

                  <div className="flex gap-x-4 mb-4">
                    <Link href={item.facebook} target="_blank">
                      <FontAwesomeIcon
                        icon={faFacebook}
                        size="xl"
                        className="hover:text-[#560000]"
                      />
                    </Link>
                    <Link href={item.instagram} target="_blank">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        size="xl"
                        className="hover:text-[#560000]"
                      />
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <ImageUploader
                  onInput={handleImageChange}
                  itemUrl={item.url || ""}
                />

                <div className="flex flex-col gap-y-2 p-4">
                  <Input
                    isClearable
                    value={formData.name}
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : "default"}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    name="name"
                    label="Name"
                    required
                    className="max-w-xs [&_[data-slot='inner-wrapper']]:justify-end"
                    onClear={() => clearInput("name")}
                    variant="bordered"
                  />

                  <Select
                    label="Select gender"
                    className="max-w-xs [&_svg]:hidden"
                    size="sm"
                    name="gender"
                    color="default"
                    variant="bordered"
                    required
                    errorMessage={
                      isValid || !touched ? "" : "You must select a gender"
                    }
                    isInvalid={isValid || !touched ? false : true}
                    selectedKeys={[formData.gender]}
                    onChange={handleInput}
                    onClose={() => setTouched(true)}
                  >
                    {[
                      { name: "Female", value: "female" },
                      { name: "Male", value: "male" },
                    ].map((gender) => (
                      <SelectItem key={gender.value} className="text-black">
                        {gender.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Select kind"
                    className="max-w-xs [&_svg]:hidden"
                    size="sm"
                    name="kind"
                    color="default"
                    variant="bordered"
                    required
                    selectedKeys={[formData.kind]}
                    onChange={handleInput}
                    onClose={() => setTouched(true)}
                  >
                    {[
                      { name: "Tatto Artist", value: "tattoo" },
                      { name: "Nails Artist", value: "nails" },
                    ].map((kind) => (
                      <SelectItem key={kind.value} className="text-black">
                        {kind.name}
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
                  <Input
                    isClearable
                    value={formData.facebook}
                    color="default"
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    name="facebook"
                    label="Facebook Url"
                    className="max-w-xs [&_[data-slot='inner-wrapper']]:justify-end"
                    onClear={() => clearInput("facebook")}
                    variant="bordered"
                  />
                  <Input
                    isClearable
                    value={formData.instagram}
                    color="default"
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    name="instagram"
                    className="max-w-xs [&_[data-slot='inner-wrapper']]:justify-end"
                    label="Instagram Url"
                    onClear={() => clearInput("instagram")}
                    variant="bordered"
                  />
                </div>
              </>
            )}
          </CardBody>
          <CardFooter className="flex gap-x-4">
            <Button
              className={`${itemId.localeCompare(item._id) ? "hidden" : ""}`}
              onClick={() => onPressHandler(null)}
            >
              Cancel
            </Button>

            {itemId.localeCompare(item._id) ? (
              <Button onClick={() => onPressHandler(item)}>Edit</Button>
            ) : null}

            {!itemId.localeCompare(item._id) ? (
              <Button
                disabled={isRequired}
                color={isRequired ? "warning" : "default"}
                onClick={(e: any) => {
                  submit(item._id, formData, e);
                  setItemId("");
                }}
              >
                Save
              </Button>
            ) : null}

            {itemId.localeCompare(item._id) ? (
              <Button variant="faded" onClick={() => submitDelete(item._id)}>
                Delete
              </Button>
            ) : null}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
