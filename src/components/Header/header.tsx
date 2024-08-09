"use client";
import {
  Navbar,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logos/inkedclown-logo-header.png";
import { useHash } from "@/useHash";
import { useTranslations } from "next-intl";
import Lang from "@/components/Header/LangSelect/lang";
import { ChevronDown } from "@/components/Header/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const t = useTranslations("Navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { hash } = useHash();
  const [isOpen, setIsOpen] = useState(false);

  // const [activeSection, setActiveSection] = useState("");
  // const sections = useRef([]);

  // const observerOptions = {
  //   root: null,
  //   rootMargin: "0px",
  //   threshold: 0.37,
  // };

  // useEffect(() => {
  //   const callback = function (entries: any) {
  //     entries.forEach((entry: any) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add("is-visible");
  //       } else {
  //         entry.target.classList.remove("is-visible");
  //       }
  //     });
  //   };

  //   const observer = new IntersectionObserver(callback, observerOptions);
  //   const targets = document.querySelectorAll(".show-onscroll");
  //   targets.forEach((target) => {
  //     observer.observe(target);
  //   });
  // }, []);

  const onScrollHandler = (position: number) => {
    if (position <= 2) {
      setIsScrolled(false);
      return;
    }

    setIsScrolled(true);
  };

  const menuItems = [
    t("home"),
    t("about"),
    t("artists.navItem"),
    t("gallery"),
    t("testimonials"),
    t("contact"),
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className={`${
        isMenuOpen
          ? "bg-[#FF0F3D]"
          : "bg-transparent transition-spacing duration-500 ease-in-out py-0"
      } 
              ${
                isScrolled
                  ? "bg-slate-900/25 transition-spacing duration-500 ease-in-out py-2"
                  : ""
              }
        fixed backdrop-blur-none`}
      height="88px"
      onScrollPositionChange={onScrollHandler}
      classNames={{
        item: [
          "flex",
          "relative",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:bottom-[-6px]",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[4px]",
          `data-[active=true]:after:bg-[#FF0F3D]`,
        ],
      }}
    >
      <NavbarContent className="hidden sm:flex gap-8 flex-1" justify="center">
        <NavbarItem isActive={hash?.length === 0}>
          <Link
            color="foreground"
            href="/"
            className="text-white hover:underline underline-offset-8 decoration-4 decoration-[#FF0F3D]"
          >
            {t("home")}
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={hash?.startsWith("#about")}
          className="text-white"
        >
          <Link
            color="foreground"
            href="/#about"
            className="text-white hover:underline underline-offset-8 decoration-4 decoration-[#FF0F3D]"
          >
            {t("about")}
          </Link>
        </NavbarItem>

        <Dropdown placement="bottom-end" isOpen={isOpen} backdrop="blur" className="mt-8">
          <DropdownTrigger>
            <NavbarItem
              isActive={hash?.startsWith("#artists")}
              className="text-white"
            >
              <Link
                className="text-white hover:underline underline-offset-8 decoration-4 decoration-[#FF0F3D] flex items-center gap-2"
                href="/#artists"
                onMouseEnter={() => {
                  setIsOpen(true);
                }}
              >
                {t("artists.navItem")}
                <ChevronDown fill="currentColor" size={16} />
              </Link>
            </NavbarItem>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            onMouseLeave={() => {
              setIsOpen(false);
            }}
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              as={Link}
              key="artist_dmitriy"
              description={t("artists.description")}
              startContent={<FontAwesomeIcon icon={faDroplet} name="droplet" />}
              href="/artist/dmitriy_liubashenko"
            >
              Dmitriy Liubashenko
            </DropdownItem>
            <DropdownItem
              as={Link}
              key="artist_denis"
              description={t("artists.description")}
              startContent={<FontAwesomeIcon icon={faDroplet} name="droplet" />}
              href="/artist/denis_titarev"
            >
              Denis Titarev
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* </ButtonGroup> */}
        {/* <Link
            color="foreground"
            href="/#artists"
            className="text-white hover:underline underline-offset-8 decoration-4 decoration-[#FF0F3D]"
          >
            {t("artists")}
          </Link> */}
        {/* </NavbarItem> */}
      </NavbarContent>

      <NavbarBrand className="grow-0">
        <Link color="foreground" href="/">
          <Image
            className="max-w-[64px]"
            priority
            src={Logo}
            alt="The Inked Clown"
          />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-8 flex-1" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#" className="text-white">
            {t("gallery")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="text-white">
            {t("testimonials")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="text-white">
            {t("contact")}
          </Link>
        </NavbarItem>
      </NavbarContent>

      <Lang />

      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="text-white sm:hidden"
      />

      <NavbarMenu className="bg-[#FF0F3D] pt-4 items-center gap-y-8">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
