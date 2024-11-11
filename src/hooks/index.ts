import { useMemo, useState } from "react";
import type { ArtistType } from "@/lib";
import { uploadFileHandler } from "@/app/api/upload";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

export type ArtistFormDataType = {
  name: string;
  gender: string;
  kind: string;
  description: string;
  url: string;
  facebook: string;
  instagram: string;
};

export const useAuthUser = (url = "/") => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isUnAuthenticated = status === "unauthenticated";

  return { session, isLoading, isAuthenticated, isUnAuthenticated };
};

export const useArtistData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [itemId, setItemId] = useState<string>("");
  const [formData, setFormData] = useState<ArtistFormDataType>({
    name: "",
    gender: "",
    kind: "",
    description: "",
    url: "",
    facebook: "",
    instagram: "",
  });

  const isRequired = useMemo(() => {
    return Object.values(formData).some((item) => item.length === 0);
  }, [formData]);

  const isValid = formData.gender.length !== 0;
  const textValidate = z.string().min(1).max(50);
  const isInvalid = useMemo(() => {
    if (formData.name === "") return false;

    return textValidate.safeParse(formData.name).success ? false : true;
  }, [formData.name, textValidate]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearInput = (type: string): void => {
    setFormData((prevState) => ({
      ...prevState,
      [type]: "",
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

  const onPressHandler = (item: ArtistType | null): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (!item) {
      setItemId("");
      setFormData({
        name: "",
        gender: "",
        kind: "",
        description: "",
        url: "",
        facebook: "",
        instagram: "",
      });

      params.delete("name");
      router.replace(`/`);
      return;
    }

    params.set("name", item.slug);
    router.replace(`/?${params.toString()}`);

    setFormData({
      name: item.name,
      gender: item.gender,
      kind: item.kind,
      description: item.description,
      url: item.url,
      facebook: item.facebook,
      instagram: item.instagram,
    });

    setItemId(item._id);
  };

  return {
    setFormData,
    handleInput,
    handleImageChange,
    onPressHandler,
    setItemId,
    clearInput,
    isRequired,
    formData,
    isValid,
    isInvalid,
    itemId,
  };
};
