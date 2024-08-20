import { locales } from "./config";

export type Locale = (typeof locales)[number];

export type Artist = {
  id: number;
  name: string;
  title: string;
  slug: string;
  description: string;
  src: string;
  socialUrl: string;
  buttonText: string;
  alt: string;
};
