import Image from "next/image";
import { Link } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./about.css";

export default function About({
  title,
  subTitle1,
  subTitle2,
  description,
  socialMedia,
}: any) {
  return (
    <section
      id="about"
      className="show-onscroll flex justify-center pt-28 w-screen md:min-h-[800px] h-full bg-white relative"
    >
      <Image
        src="/about/arrow.png"
        width={40}
        height={136}
        alt="the inked clown arrow"
        className="arrow animated animatedDelay absolute -top-16 z-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="hidden md:flex justify-end text-black relative">
          <div className="hidden lg:flex flex-col items-start gap-4 mt-16 mb-8 ">
            <span className="text-nowrap font-light">{socialMedia}</span>

            <div className="flex gap-4">
              <Link href="#">
                <FontAwesomeIcon
                  icon={faFacebook}
                  color="black"
                  className="hover:text-[#FF0F3D] w-[32px] h-[32px]"
                  size="xl"
                />
              </Link>

              <Link href="#">
                <FontAwesomeIcon
                  icon={faInstagram}
                  color="black"
                  className="hover:text-[#FF0F3D] w-[32px] h-[32px]"
                  size="xl"
                />
              </Link>
            </div>
          </div>

          <div className="relative top-16 overflow-hidden w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] bg-[#FF0F3D] rotate-45 z-0">
            <div className="relative top-0 bg-[url('/about/about.jpeg')] bg-[length:110%] bg-contain bg-no-repeat aboutImage w-[400px] h-[400px] z-10" />
          </div>

          <div className="absolute bottom-20 left-[15%] border-8 border-[#FF0F3D] p-16 md:p-20" />
        </div>

        <div className="text-black z-10">
          <div className="relative flex flex-col w-full justify-start px-8 md:px-16 py-16 border-l-8 border-t-8 border-b-8 border-slate-900">
            <h3 className="text-xl underline underline-offset-4 text-[#FF0F3D] pb-12">
              {title}
            </h3>
            <div className="absolute top-8 left-[75%] border-8 border-[#FF0F3D] px-4 py-8 z-0" />

            <p className="text-4xl lg:text-5xl font-black">{subTitle1}</p>
            <p className="text-4xl lg:text-5xl font-black text-nowrap z-10">
              {subTitle2}
            </p>
          </div>

          <p className="max-w-5xl lg:max-w-2xl text-normal font-light w-full mt-8 md:w-3/4 pl-4 md:pl-20">
            {description}
          </p>

          <div className="flex gap-x-4 mt-16 mb-8 pl-4 md:pl-20 lg:hidden">
            <span className="font-light">{socialMedia}</span>

            <Link href="#">
              <FontAwesomeIcon
                icon={faFacebook}
                color="black"
                className="hover:text-[#FF0F3D] w-[32px] h-[32px]"
                size="xl"
              />
            </Link>

            <Link href="#">
              <FontAwesomeIcon
                icon={faInstagram}
                color="black"
                className="hover:text-[#FF0F3D] w-[32px] h-[32px]"
                size="xl"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
