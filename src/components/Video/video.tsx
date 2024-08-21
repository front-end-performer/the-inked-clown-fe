import { Button, Link } from "@nextui-org/react";
import "./video.css";

export default function Video({
  part1,
  part2,
  part3,
  part4,
  description1,
  description2,
  contact
}: any) {
  return (
    <div className="parallaxEffect w-screen bg-hero-section bg-no-repeat h-screen md:h-auto bg-center bg-cover relative">
      <div className="absolute centerBlock top-[50%] left-[50%] landscape:min-[769px]:top-[60%]:max-[932px] landscape:max-[932px]:top-[60%] w-full max-w-6xl z-10 text-center p-4">
        <h1 className="text-2xl font-black landscape:min-[769px]:text-3xl:max-[932px] landscape:max-[932px]:text-3xl sm:text-6xl md:text-5xl lg:text-6xl  text-white leading-relaxed font-['abril_fatface_init']">
          <span key="1" className="text-white">
            {part1}
          </span>
          <span
            key="2"
            className="text-white underline underline-offset-4 decoration-[#FF0F3D] decoration-4"
          >
            {part2},
          </span>{" "}
          <br />
          <span key="3" className="text-white">
            {part3}
          </span>
          <span
            key="4"
            className="text-white underline underline-offset-4 decoration-[#FF0F3D] decoration-4"
          >
            {part4}
          </span>
        </h1>

        <p className="text-normal text-white mt-8 mx-auto max-w-[600px]">
          {description1}
          <span className="underline underline-offset-4 decoration-[#FF0F3D] decoration-4">
            {part2}.{" "}
          </span>
          {description2}
        </p>

        <Button as={Link} size="lg" className="mt-8 bg-[#FF0F3D] uppercase text-white" radius="none" href="/en#footer">
          {contact}
        </Button>
      </div>

      <video
        aria-label="Video"
        height="600"
        width="768"
        loop
        // autoPlay
        className="w-screen inset-0 object-cover h-screen xl:h-auto"
        playsInline
        muted
        poster="/video/poster/poster.jpg"
      >
        <source src="/video/theinkedclown_video-hero.mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
