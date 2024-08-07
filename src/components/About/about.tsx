"use client";

import { Parallax } from "react-scroll-parallax";
import "./about.css";

export default function About() {
  return (
    <div id="about" className="w-screen h-full py-28">
      <Parallax translateY={[50, -50]}>
        <div className="flex flex-col sm:flex-row justify-center py-20 items-center w-full h-full">
          <div className="hidden md:flex w-1/2 grow justify-end">
            <div className="realtive">
              <div className="relative overflow-hidden origin-center rotate-45 bg-[#FF0F3D] w-[500px] h-[474px] z-0">
                <div className="relative top-0 bg-[url('/about/about.jpeg')] bg-[length:110%] bg-contain bg-no-repeat aboutImage w-[500px] h-[474px] z-10" />

                {/* <div className="absolute drop"></div> */}
              </div>
              <div className="absolute bottom-12 w-28 h-16 px-16 py-12 left-24 border-8 border-[#FF0F3D] z-10" />
            </div>
          </div>

          <div className="flex flex-col w-full md:w-1/2 grow">
            <div className="relative -top-20 flex flex-col w-full justify-start px-20 py-16 border-l-8 border-t-8 border-b-8 border-slate-900">
              <h3 className="text-xl underline underline-offset-4 text-[#FF0F3D] pb-12">
                About us
              </h3>

              <p className="text-5xl font-black">We are</p>
              <p className="text-5xl font-black">Who we are ...</p>
            </div>

            <p className="text-normal font-light w-full md:w-3/4 pl-4 md:pl-24">
              Falls du auf der Suche nach einem Individuellen Tattoo im sterilen
              Umfeld bist, dann bist du bei uns genau richtig!
            </p>
          </div>
        </div>
      </Parallax>
    </div>
  );
}
