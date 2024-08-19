import Artist from "./artist";

export default function Artists({ artists, socialMedia }: any) {
  return (
    <section id="artists" className="show-onscroll bg-transparent h-auto z-0">
      <div className="w-screen min-h-[700px] h-full bg-[url('/artists/artist_bg.jpg')] bg-cover bg-fixed bg-no-repeat z-10">
        <div className="flex flex-col items-center justify-center relative max-w-7xl w-full h-full m-auto gap-16 py-28">
          {artists.map((artist: any) => {
            return <Artist artist={artist} socialMedia={socialMedia} />;
          })}
        </div>
      </div>
    </section>
  );
}

{/* <div className="absolute m-0 top-[50%] left-[50%] transform-center -translate-x-[50%] -translate-y-[50%] flex flex-col gap-y-20 max-w-7xl w-full bg-transparent z-20"> */}
{/* </div> */}