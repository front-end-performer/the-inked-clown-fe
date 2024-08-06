import Link from "next/link";
import Video from "@/components/video";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-0">
      <Video />

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left border-2 border-red-900">
        <Link href="/learn">
          <h2 className="mb-3 text-2xl font-semibold">Learn library</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Library!
          </p>
        </Link>
      </div>
    </main>
  );
}
