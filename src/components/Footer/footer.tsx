import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const homepage = useTranslations("HomePage");
  const social = useTranslations("SocialMedia");

  return (
    <div className="grid grid-cols-1 grid-rows-[auto] gap-y-12 sm:grid-cols-3 sm:grid-rows-1 gap-4 max-w-7xl m-auto">
      <div className="px-4 text-white">
        <h2 className="text-[#FF0F3D] text-lg font-semibold underline underline-offset-8 decoration-4 decoration-[#FF0F3D]">
          {homepage("footer.about")}
        </h2>

        <p className="text-normal font-light mt-4">
          {homepage("footer.aboutDescription")}
        </p>
      </div>

      <div className="px-4 text-white">
        <h2 className="text-[#FF0F3D] text-lg font-semibold underline underline-offset-8 decoration-4 decoration-[#FF0F3D]">
          {homepage("footer.location")}
        </h2>

        <ul className="mt-4">
          <li className="flex mb-4 gap-x-4">
            <FontAwesomeIcon
              icon={faMapLocationDot}
              color="white"
              size="xl"
              className="max-w-[24px]"
            />
            <address className="font-light">
              {homepage("footer.address")}
            </address>
          </li>
          <li className="flex mb-4 gap-x-4">
            <FontAwesomeIcon
              icon={faEnvelope}
              color="white"
              size="xl"
              className="max-w-[24px]"
            />
            <Link href="mailto:titarevjuggler@gmail.com" className="font-light">
              titarevjuggler@gmail.com
            </Link>
          </li>
          <li className="flex mb-4 gap-x-4">
            <FontAwesomeIcon
              icon={faPhone}
              color="white"
              size="xl"
              className="max-w-[24px]"
            />
            <Link href="tel:4915753638272" className="font-light">
              +49 (157) 53638272
            </Link>
          </li>
        </ul>

        <div className="flex gap-x-4 mt-8">
          <span className="font-light">{social("label")}: </span>

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
          {homepage("footer.hours")}
        </h2>

        <ul className="mt-4">
          {homepage &&
            homepage.raw("footer.hoursList").map((hour: any) => {
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
  );
}
