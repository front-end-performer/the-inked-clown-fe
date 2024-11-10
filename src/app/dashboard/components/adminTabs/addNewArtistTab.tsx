"use client";

import { useState } from "react";
import { useArtistData } from "@/hooks";
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

export default function AddNewArtistTab({ submit, slectedKeyHandler }: any) {
  const [touched, setTouched] = useState(false);
  const {
    handleInput,
    clearInput,
    onPressHandler,
    handleImageChange,
    formData,
    isInvalid,
    isValid,
    isRequired,
  } = useArtistData();

  return (
    <div className="w-1/2 xl:w-1/3">
      <Card shadow="sm">
        <CardBody className="overflow-visible p-0">
          <ImageUploader onInput={handleImageChange} />
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
              className="[&_[data-slot='inner-wrapper']]:justify-end"
              onClear={() => clearInput("name")}
              variant="bordered"
            />

            <Select
              label="Select gender"
              className="[&_svg]:hidden"
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
              className="[&_svg]:hidden"
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
              className="[&_[data-slot='inner-wrapper']]:justify-end"
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
              className="[&_[data-slot='inner-wrapper']]:justify-end"
              label="Instagram Url"
              onClear={() => clearInput("instagram")}
              variant="bordered"
            />
          </div>
        </CardBody>
        <CardFooter className="flex gap-x-4">
          <Button
            onClick={() => {
              slectedKeyHandler(new Set([1]));
              onPressHandler(null);
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={(e) => submit(formData, e)}
            color={isRequired ? "warning" : "default"}
            disabled={isRequired}
          >
            Create new artist
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
