"use client";

import { Session } from "@/lib";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Button,
  Avatar,
} from "@nextui-org/react";
import styles from "../dashboard.module.css";
import TheInkedLogo from "@/components/theInkedLogo";
import { signOut } from "next-auth/react";

type Props = {
  session: Session | null;
};

export default function Header({ session }: Props) {
  return (
    <Navbar className={`${styles.bgGradient} h-32 [&_header]:max-w-full`}>
      <NavbarBrand>
        <TheInkedLogo />
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <Button
          onClick={() => signOut()}
          size="sm"
          variant="light"
          className="text-xs font-light text-white data-[hover=true]:bg-[#ff0f3d] p-0"
        >
          Abmelden
        </Button>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="danger"
          name={session?.user.name}
          size="sm"
          src={session?.user.avatar}
        />
      </NavbarContent>
    </Navbar>
  );
}
