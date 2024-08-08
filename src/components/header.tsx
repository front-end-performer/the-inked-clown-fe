"use client";
import {
  Navbar,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logos/inkedclown-logo-header.png";
import { useHash } from "@/useHash";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { hash } = useHash();
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
    "Home",
    "About us",
    "Artists",
    "Gallery",
    "Testimonials",
    "Contact us",
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
          "data-[active=true]:after:rounded-[2px]",
          `data-[active=true]:after:bg-[#FF0F3D]`,
        ],
      }}
    >
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={hash?.length === 0}>
          <Link color="foreground" href="/" className="text-white hover:underline underline-offset-8 decoration-4 decoration-[#FF0F3D]">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={hash?.startsWith("#about")}
          className="text-white"
        >
          <Link color="foreground" href="/#about" className="text-white hover:underline underline-offset-8 decoration-4 decoration-[#FF0F3D]">
            About us
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={hash?.startsWith("#artists")}
          className="text-white"
        >
          <Link color="foreground" href="/#artists" className="text-white hover:underline underline-offset-8 decoration-4 decoration-[#FF0F3D]">
            Artists
          </Link>
        </NavbarItem>
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

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#" className="text-white">
            Gallery
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="text-white">
            Testimonials
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="text-white">
            Contact us
          </Link>
        </NavbarItem>
      </NavbarContent>

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
