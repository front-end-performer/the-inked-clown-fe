import Video from "@/components/Video/video";
import About from "@/components/About/about";
import Artists from "@/components/Artists/artists";

export default function Home() {
  return (
    <main
      id="home"
      className="show-onscroll flex min-h-screen flex-col items-center justify-between pt-0"
    >
      <Video />
      <About />
      <Artists />
      <div className="h-screen bg-blue-700"></div>
    </main>
  );
}
