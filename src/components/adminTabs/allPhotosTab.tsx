import type { PhotosResponse, PhotoType } from "@/lib/features";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

type Props = {
  photos: PhotosResponse;
  submitDelete: (id: string) => void;
};

export default function AllPhotosTab({ photos, submitDelete }: Props) {
  return (
    <div className="gap-2 grid grid-cols-4">
      {photos.data.map((item: PhotoType) => (
        <Card shadow="sm" key={item._id} className="relative">
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.author}
              className="object-cover"
              width="100%"
              height={300}
              shadow="md"
              src={item.url}
            />

            <div className="p-4">
              <h2 className="capitalize text-lg">{item.title}</h2>
              <p className="text-[10px] text-neutral-500">{item.author}</p>
              <p className="capitalize mt-2">{item.description}</p>
            </div>
          </CardBody>
          <CardFooter className="flex gap-x-4">
            <Button variant="faded" onClick={() => submitDelete(item._id)}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
