import "./video.css";

export default function Video() {
  return (
    <div className="parallaxEffect w-screen bg-hero-section bg-no-repeat h-screen md:h-auto bg-center bg-cover">
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
