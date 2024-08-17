import Video from "@/components/Video/video";
import About from "@/components/About/about";
import Artists from "@/components/Artists/artists";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import images from "@/app/api/images";
// import Testimonials from "@/components/Testimonials/testimonials";

export default function Home() {
  return (
    <main
      id="home"
      className="show-onscroll flex min-h-screen flex-col items-center justify-between pt-0"
    >
      <Video />
      <About />
      <Artists />
      <ImageGallery images={images} />
      {/* <Testimonials /> */}
      {/* <div className="w-[900px] h-[900px]"></div> */}
    </main>
  );
}
