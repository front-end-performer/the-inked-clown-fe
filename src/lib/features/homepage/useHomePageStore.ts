import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  HomePageStore,
  ArtistsResponse,
  PhotosResponse,
  HomePageActions,
  HomePageState,
} from "@/lib/features/types";
import { fetchAllData } from "@/app/api/homePage";
import {
  createNewArtistApi,
  deleteArtistApi,
  updateArtistApi,
} from "@/app/api/artists/route";
import { createNewPhotoApi, deletePhotoApi } from "@/app/api/photos/route";

export const useHomePageStore = create(
  persist<HomePageStore>(
    (set, get) => ({
      artists: {} as ArtistsResponse,
      photos: {} as PhotosResponse,
      loadAllData: async () => {
        // console.log("value", value);
        const persistedData = get().artists;
        console.log("persistedData", persistedData);

        // console.log(JSON.parse(localStorage.getItem("home-page") || "").state.artists);

        // Compare persisted data and new data
        // if (JSON.stringify(persistedData) !== JSON.stringify(value)) {
        //   console.log("call api");

        // if (
        //   JSON.stringify(JSON.parse(localStorage.getItem("home-page") || "").state.artists) !==
        //   JSON.stringify(persistedData)
        // ) {
        //   console.log("not equal");
          const allData = await fetchAllData();
          const [a, p] = allData;

          // console.log("ALL DATA FE", allData);

          return set((state) => ({
            ...state,
            artists: { ...state.artists, ...a },
            photos: { ...state.photos, ...p },
          }));
          // store?.loadAllData();
        // } 
        // else {
        //   console.log(" equal");
        // }

        // const allData = await fetchAllData();
        // const [a, p] = allData;

        // // console.log("ALL DATA FE", allData);

        // return set((state) => ({
        //   ...state,
        //   artists: { ...state.artists, ...a },
        //   photos: { ...state.photos, ...p },
        // }));
        // }
      },
      createArtist: async (artistId: string, form: FormData) => {
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
      updateArtist: async (artistId: string, form: FormData) => {
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
