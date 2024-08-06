"use client";
import {
  Navbar,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { Image } from "@nextui-org/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const onScrollHandler = (position: number) => {
    if (position <= 4) {
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
      // shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      className={`${isMenuOpen ? "bg-[#FF0F3D]" : "bg-transparent transition-spacing duration-300 ease-in-out py-0"} 
              ${isScrolled ? "bg-slate-900/25 transition-spacing duration-300 ease-in-out py-4" : ""}
        fixed backdrop-blur-none`}
      height={isScrolled ? '120px' : 'auto'}
      onScrollPositionChange={onScrollHandler}
      classNames={{
        item: [
          "flex",
          "relative",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-[-2px]",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:hover:h-[4px]",
          "data-[active=true]:after:rounded-[2px]",
          `data-[active=true]:after:bg-[#FF0F3D]`,
        ],
      }}
    >
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link
            color="foreground"
            href="#"
            aria-current="page"
            className="text-white"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="text-white">
            About us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="text-white">
            Artists
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarBrand className="grow-0">
        <Image
          className={isScrolled ? 'max-w-[120px] transition-spacing duration-300 ease-in-out' : 'max-w-[64px]'}
          alt="The Inked Clown"
          src="/logos/inkedclown-logo-header.png"
        />
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
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
