import type { PhotoFormDataType } from "@/app/dashboard/components/adminTabs/addNewPhotoTab";
import type { ArtistFormDataType } from "@/hooks";
import { locales } from "@/i18n/configs";
export type Locale = (typeof locales)[number];

type Gender = "male" | "female";
type Status = "success" | "failure";

export type Session = {
  user: {
    _id: string;
    email: string;
    role: string;
    name: string;
    avatar: string;
  };
  accessToken: string;
};

export type ArtistType = {
  _id: string;
  name: string;
  gender: Gender;
  description: string;
  kind: string;
  instagram: string;
  facebook: string;
  slug: string;
  url: string;
  _lastUpdatedBy: string;
  lastUpdated: string;
  __v: number;
};

export type PhotoType = {
  _id: string;
  title: string;
  author: string;
  description: string;
  url: string;
  slug: string;
  _artistId: string;
  _lastUpdatedBy: string;
  lastUpdated: string;
  __v: number;
};

export type ArtistsResponse = {
  data: ArtistType[];
  count: number;
  status: Status;
};

export type PhotosResponse = {
  data: PhotoType[];
  count: number;
  status: Status;
};

export type HomePageState = {
  artists: ArtistsResponse | null;
  photos: PhotosResponse | null;
};

export type HomPageActions = {
  loadAllData: () => Promise<void>;
  setAllData: (data: [ArtistsResponse, PhotosResponse]) => Promise<void>;
  createArtist: (artistId: string, form: ArtistFormDataType) => Promise<any>;
  updateArtist: (artistId: string, form: ArtistFormDataType) => Promise<void>;
  deleteArtist: (id: string, artist: ArtistsResponse) => Promise<void>;
  createPhoto: (photosId: string, form: PhotoFormDataType) => Promise<any>;
  deletePhoto: (photosId: string) => Promise<void>;
};

export type HomePageStore = HomePageState & HomPageActions;

export type HomePageStoreSet = (
  partial:
    | HomePageStore
    | Partial<HomePageStore>
    | ((state: HomePageStore) => HomePageStore | Partial<HomePageStore>),
  replace?: boolean | undefined
) => void;
