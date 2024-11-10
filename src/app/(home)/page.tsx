import dynamic from "next/dynamic";
import Video from "@/components/Video/video";
import About from "@/components/About/about";
import Artists from "@/components/Artists/artists";
const HomeImageGallery = dynamic(() => import("@/components/homeImageGallery"));
const Testimonials = dynamic(
  () => import("@/components/Testimonials/testimonials")
);

export default async function RootPage() {
  return (
    <div
      id="home"
      className="show-onscroll flex min-h-screen flex-col items-center justify-between pt-0 bg-[url('/artists/artist_bg.jpg')] bg-no-repeat bg-cover"
    >
      <Video />
      <About />
      <Artists />
      <HomeImageGallery />
      <Testimonials />
    </div>
  );
}
