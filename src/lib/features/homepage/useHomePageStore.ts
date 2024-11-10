import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { HomePageStore, ArtistsResponse, PhotosResponse } from "@/lib";
import { fetchAllData } from "@/app/api/homePage";
import {
  createNewArtistApi,
  deleteArtistApi,
  updateArtistApi,
} from "@/app/api/artists/route";
import { createNewPhotoApi, deletePhotoApi } from "@/app/api/photos/route";
import { ArtistFormDataType } from "@/hooks";

export const useHomePageStore = create(
  persist<HomePageStore>(
    (set) => ({
      artists: {} as ArtistsResponse,
      photos: {} as PhotosResponse,
      loadAllData: async () => {
        const allData = await fetchAllData();
        const [a, p] = allData;

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
            data: [
              ...state.artists.data.filter((artist) => artisId !== artist._id),
            ],
          };

          console.log("filteredArtists", filteredArtists);

          return { ...state, artists: filteredArtists };
        });
      },

      createPhoto: async (userId: string, form: FormData) => {
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
          console.log(state.photos.data);
          const filteredPhotos = {
            ...deletedPhoto,
            data: [
              ...state.photos.data.filter((photo) => photoId !== photo._id),
            ],
          };

          return { ...state, photos: filteredPhotos };
        });
      },
    }),
    {
      name: "home-page",
      storage: createJSONStorage(() => localStorage),
      version: 0,
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as HomePageStore),
      }),
    }
  )
);
