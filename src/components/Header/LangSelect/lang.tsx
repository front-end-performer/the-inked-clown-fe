import { NavbarContent, Select, SelectItem } from "@nextui-org/react";
import style from  "@/components/Header/LangSelect/lang.module.css";

export default function Lang() {
  const langValues = [
    { key: "de", label: "DE" },
    { key: "en", label: "EN" },
  ];

  return (
    <NavbarContent as="div" justify="end" className={`${style.select} hidden md:flex max-w-[72px]`}>
      <Select
        items={langValues}
        variant="bordered"
        aria-label="lang"
        radius="none"
        defaultSelectedKeys={["de"]}
        className="max-w-xs"
        size="sm"
      >
        {(animal) => <SelectItem key={animal.key}>{animal.label}</SelectItem>}
      </Select>
    </NavbarContent>
  );
}
