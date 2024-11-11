import { createStore } from "zustand/vanilla";
import type {
  ArtistsResponse,
  HomePageState,
  HomePageStore,
  PhotosResponse,
} from "../types";
import type { ArtistFormDataType } from "@/hooks";

import { fetchAllData } from "@/app/api/homePage";
import {
  createNewArtistApi,
  deleteArtistApi,
  updateArtistApi,
} from "@/app/api/artists/route";
import { createNewPhotoApi, deletePhotoApi } from "@/app/api/photos/route";
import { PhotoFormData } from "@/app/dashboard/components/adminTabs/addNewPhotoTab";

export const defaultInitState: HomePageState = {
  artists: null,
  photos: null,
};

export const createHomePageStore = (initState = defaultInitState) => {
  return createStore<HomePageStore>()((set) => ({
    ...initState,
    loadAllData: async () => {
      const allData = await fetchAllData();
      const [a, p] = allData;

      return set((state) => ({
        ...state,
        artists: { ...state.artists, ...a },
        photos: { ...state.photos, ...p },
      }));
    },
    setAllData: async (data: any) => {
      const [a, p] = data;

      return set((state) => ({
        ...state,
        artists: { ...state.artists, ...a },
        photos: { ...state.photos, ...p },
      }));
    },
    createArtist: async (artistId: string, form: ArtistFormDataType) => {
      const newArtist: ArtistsResponse = await createNewArtistApi(
        artistId,
        form
      );

      return set((state) => {
        return {
          ...state,
          artists: { ...state.artists, ...newArtist },
        };
      });
    },
    updateArtist: async (artistId: string, form: ArtistFormDataType) => {
      const updatedArtists = await updateArtistApi(artistId, form);

      return set((state) => {
        return {
          ...state,
          artists: { ...state.artists, ...updatedArtists },
        };
      });
    },
    deleteArtist: async (artisId: string) => {
      const deletedArtist: ArtistsResponse = await deleteArtistApi(artisId);

      return set((state) => {
        const filteredArtists = {
          ...deletedArtist,
          data: state.artists
            ? [...state.artists.data.filter((artist) => artisId !== artist._id)]
            : [],
        };

        return { ...state, artists: filteredArtists };
      });
    },
    createPhoto: async (userId: string, form: PhotoFormData) => {
      const newPhotos: PhotosResponse = await createNewPhotoApi(userId, form);

      return set((state) => {
        return {
          ...state,
          photos: { ...state.photos, ...newPhotos },
        };
      });
    },
    deletePhoto: async (photoId: string) => {
      const deletedPhoto: PhotosResponse = await deletePhotoApi(photoId);

      return set((state) => {
        const filteredPhotos = {
          ...deletedPhoto,
          data: state.photos
            ? [...state.photos.data.filter((photo) => photoId !== photo._id)]
            : [],
        };

        return { ...state, photos: filteredPhotos };
      });
    },
  }));
};
