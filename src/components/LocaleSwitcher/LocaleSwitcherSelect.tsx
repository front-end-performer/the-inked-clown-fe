"use client";

import { useState, useEffect } from "react";
import { Locale } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { setUserLocale } from "@/helpers/locale";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

type Props = {
  defaultValue: string;
  items: Array<{ id: number; value: string; label: string }>;
};

export default function LocaleSwitcherSelect(props: Props) {
  const [selectedKeys, setSelectedKeys] = useState(
    new Set([props.defaultValue])
  );

  useEffect(() => {
    let selectedValue = Array.from(selectedKeys)
      .join(", ")
      .replaceAll("_", " ");
    setUserLocale(selectedValue as Locale);
  }, [selectedKeys]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <FontAwesomeIcon
          icon={faLanguage}
          color="white"
          size="xl"
          className="max-w-[30px]"
        />
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
