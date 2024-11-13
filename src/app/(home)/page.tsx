import { fetchAllData } from "../api/homePage";
import dynamic from "next/dynamic";
import Video from "@/components/Video/video";
import About from "@/components/About/about";
import ArtistsSection from "@/components/Artists/artists";
import { Suspense } from "react";
import LoadingAnimation from "@/components/loading/loadingAnimation";
const HomeImageGallery = dynamic(() => import("@/components/homeImageGallery"));
const Testimonials = dynamic(
  () => import("@/components/Testimonials/testimonials")
);

export default async function RootPage() {
  const allData = await fetchAllData();

  return (
    <div
      id="home"
      className="show-onscroll flex min-h-screen flex-col items-center justify-between pt-0 bg-[url('/artists/artist_bg.jpg')] bg-no-repeat bg-cover"
    >
      <Video />
      <About />
      <Suspense fallback={<LoadingAnimation />}>
        <ArtistsSection allData={allData} />
      </Suspense>
      <HomeImageGallery />
      <Testimonials />
    </div>
  );
}
