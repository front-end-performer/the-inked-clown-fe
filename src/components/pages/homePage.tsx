import Video from "@/components/Video/video";
import About from "@/components/About/about";
import Artists from "@/components/Artists/artists";

export default function HomePage() {
  return (
    <div
      id="home"
      className="show-onscroll flex min-h-screen flex-col items-center justify-between pt-0 bg-[url('/artists/artist_bg.jpg')] bg-no-repeat bg-cover"
    >
      <Video />
      <About />
      <Artists />
      {/* <ImageGallery /> */}
    </div>
  );
}
