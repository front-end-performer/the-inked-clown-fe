import { fetchAllData } from "../api/homePage";
import dynamic from "next/dynamic";
import Video from "@/components/Video/video";
import About from "@/components/About/about";
import ArtistsSection from "@/components/Artists/artists";
import { ArtistsResponse, PhotosResponse } from "@/lib";
const HomeImageGallery = dynamic(() => import("@/components/homeImageGallery"));
const Testimonials = dynamic(
  () => import("@/components/Testimonials/testimonials")
);

export default async function RootPage() {
  const allData: [ArtistsResponse, PhotosResponse] = await fetchAllData();

  return (
    <div
      id="home"
      className="show-onscroll flex min-h-screen flex-col items-center justify-between pt-0 bg-[url('/artists/artist_bg.jpg')] bg-no-repeat bg-cover"
    >
      <Video />
      <About />
      <ArtistsSection allData={allData} />
      <HomeImageGallery />
      <Testimonials />
    </div>
  );
}
