import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import moment from "moment";
import Link from "next/link";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const t = useTranslations("HomePage.footer");

  return (
    <section className="bg-black py-28 px- w-full">
      <div className="grid grid-cols-1 grid-rows-[auto] gap-y-12 sm:grid-cols-3 sm:grid-rows-1 gap-4 max-w-7xl m-auto">
        <div className="px-4 text-white">
          <h2 className="text-[#FF0F3D] text-lg font-semibold underline underline-offset-8 decoration-4 decoration-[#FF0F3D]">
            About us
          </h2>

          <p className="text-normal font-light mt-4">
            Das Inked Clown Tattoo ist ein von XXX gegründetes Tattoostudio und
            eine Galerie mit Sitz in Brühl. Wir haben dies und das gemacht, dies
            und das erreicht und sind deshalb auf dies und das spezialisiert.
            Jetzt sind Sie an der Reihe, in einem unserer Künstlerstühle Platz
            zu nehmen und dieses Maß an Fachwissen zu erleben.
          </p>
        </div>

        <div className="px-4 text-white">
          <h2 className="text-[#FF0F3D] text-lg font-semibold underline underline-offset-8 decoration-4 decoration-[#FF0F3D]">
            Location
          </h2>

          <ul className="mt-4">
            <li className="flex mb-4 gap-x-4">
              <FontAwesomeIcon
                icon={faMapLocationDot}
                color="white"
                size="xl"
              />
              <address className="font-light">
                Carl-Schurz-Straße 15 50321 Brühl, Deutschland
              </address>
            </li>
            <li className="flex mb-4 gap-x-4">
              <FontAwesomeIcon icon={faEnvelope} color="white" size="xl" />
              <Link
                href="mailto:titarevjuggler@gmail.com"
                className="font-light"
              >
                titarevjuggler@gmail.com
              </Link>
            </li>
            <li className="flex mb-4 gap-x-4">
              <FontAwesomeIcon icon={faPhone} color="white" size="xl" />
              <Link href="tel:4915753638272" className="font-light">
                +49 (157) 53638272
              </Link>
            </li>
          </ul>

          <div className="flex gap-x-4 mt-8">
            <span className="font-light">Check social media: </span>

            <Link href="#">
              <FontAwesomeIcon
                icon={faFacebook}
                color="white"
                className="hover:text-[#FF0F3D]"
                size="xl"
              />
            </Link>

            <Link href="#">
              <FontAwesomeIcon
                icon={faInstagram}
                color="white"
                className="hover:text-[#FF0F3D]"
                size="xl"
              />
            </Link>
          </div>
        </div>

        <div className="px-4 text-white">
          <h2 className="text-[#FF0F3D] text-lg font-semibold underline underline-offset-8 decoration-4 decoration-[#FF0F3D]">
            Hours
          </h2>

          <ul className="mt-4">
            {t &&
              t.raw("hours").map((hour: any) => {
                return (
                  <li key={hour.id} className="mb-4">
                    <span
                      className={`${
                        moment().format("dddd") === hour.id
                          ? "text-[#FF0F3D] font-normal"
                          : ""
                      } font-light`}
                    >
                      {hour.day} - {hour.time}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
}
