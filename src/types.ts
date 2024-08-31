import { locales } from "@/i18n/configs";

export type Locale = (typeof locales)[number];

export type ArtistImage = {
  id: number;
  artist: string;
  description: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ArtistType = {
  id: number;
  name: string;
  title: string;
  slug: string;
  description: string;
  src: string;
  socialUrl: string;
  buttonText: string;
  images: ArtistImage[];
  alt: string;
};
