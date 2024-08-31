"use client";

// import clsx from "clsx";
// import { NavbarContent, Select, SelectItem } from "@nextui-org/react";
// import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from "react";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Locale } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

import { setUserLocale } from "@/helpers/locale";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

type Props = {
  defaultValue: string;
  items: Array<{ id: number; value: string; label: string }>;
};

export default function LocaleSwitcherSelect(props: Props) {
  // const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState(new Set([props.defaultValue]));
  // const [isPending, startTransition] = useTransition();
  

  useEffect(() => {
    let selectedValue = Array.from(selectedKeys).join(", ").replaceAll("_", " ")
    setUserLocale(selectedValue as Locale);
  },
    [selectedKeys]
  );

  // const pathname = usePathname();
  // const params = useParams();
  // const langValues = [
  //   { key: "de", label: "DE" },
  //   { key: "en", label: "EN" },
  // ];
  // console.log("nextLocale", items);

  // function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
  //   const nextLocale = event.target.value as Locale;
  //   console.log("nextLocale", nextLocale);

  //   // startTransition(() => {
  //   //   router.replace(
  //   //     {
  //   //       pathname,
  //   //       // @ts-expect-error -- TypeScript will validate that only known `params`
  //   //       // are used in combination with a given `pathname`. Since the two will
  //   //       // always match for the current route, we can skip runtime checks.
  //   //       params,
  //   //     },
  //   //     { locale: nextLocale, scroll: false }
  //   //   );
  //   // });
  // }

  return (
    <Dropdown>
      <DropdownTrigger>
        <FontAwesomeIcon icon={faLanguage} color="white" size="xl" className="max-w-[30px]" />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select your language"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(value: any) => setSelectedKeys(value)}
      >
        {props.items.map((item: any): any => {
          return <DropdownItem key={item.label}>{item.label}</DropdownItem>;
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
