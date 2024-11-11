"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Image, Link } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./about.css";

export default function About() {
  const homepage = useTranslations("HomePage");
  const social = useTranslations("SocialMedia");

  return (
    <section
      id="about"
      className="show-onscroll bg-white w-full h-full md:min-h-[800px] relative"
    >
      <div className="hidden md:flex justify-center absolute w-full -top-20 h-[136px]">
        <Image
          src="/about/arrow.png"
          width={40}
          height={136}
          alt="the inked clown - arrow"
          style={{
            margin: "0 auto",
          }}
          className="arrow animated animatedDelay z-20"
        />
      </div>

      <div className="container mx-auto relative py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <div className="hidden md:flex justify-end text-black relative">
            <div className="hidden lg:flex flex-col items-start gap-4 mt-16 mb-8 ">
              <span className="text-nowrap font-light">{social("label")}</span>

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

            <div className="relative top-16 w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] bg-[#FF0F3D] rotate-45 z-0">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-[url('/about/about.jpeg')] bg-[length:100%] bg-cover bg-no-repeat aboutImage w-[350px] h-[350px] z-10"
              />
              <motion.div
                initial="hidden"
                transition={{
                  duration: 0.7,
                  velocity: 3,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                animate={{
                  x: 200,
                  y: 200,
                }}
                className="w-[24px] h-[24px] waterDrop bg-[#FF0F3D] absolute bottom-0 right-0 z-20"
              />

              <div className="absolute -bottom-[100px] -left-[50px] border-8 border-[#FF0F3D] hover:border-slate-900 p-16 md:p-20 -rotate-45" />
            </div>
          </div>

          <div className="text-black z-10">
            <div className="relative flex flex-col w-full justify-start px-8 md:px-16 py-16 border-l-8 border-t-8 border-b-8 border-slate-900 hover:border-[#FF0F3D]">
              <h3 className="text-xl underline underline-offset-4 text-[#FF0F3D] pb-12">
                {homepage("sectionAbout.title")}
              </h3>
              <div className="absolute top-8 left-[75%] border-8 border-[#FF0F3D] hover:border-slate-900 px-4 py-8 z-0" />

              <p className="text-4xl lg:text-5xl font-black font-['abril_fatface_init']">
                {homepage("sectionAbout.subTitle1")}
              </p>
              <p className="text-4xl lg:text-5xl font-black text-nowrap z-10 font-['abril_fatface_init']">
                {homepage("sectionAbout.subTitle2")}
              </p>
            </div>

            <p className="max-w-5xl lg:max-w-2xl text-normal font-light w-full mt-8 md:w-3/4 pl-4 md:pl-20">
              {homepage("sectionAbout.description")}
            </p>

            <div className="flex gap-x-4 mt-16 mb-8 pl-4 md:pl-20 lg:hidden">
              <span className="font-light">{social("label")}</span>

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
      </div>
    </section>
  );
}
