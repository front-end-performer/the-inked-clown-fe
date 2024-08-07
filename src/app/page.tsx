import Video from "@/components/Video/video";
import About from "@/components/About/about";
import Artists from "@/components/Artists/artists";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-0">
      <Video />
      <About />
      <Artists />
    </main>
  );
}
