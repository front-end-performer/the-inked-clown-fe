import Header from "@/components/Header/header";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header title="Nicht gefunden" />
      <div className="flex flex-col justify-center items-center gap-y-8 py-28 px-16">
        <p>Die angeforderte Ressource konnte nicht gefunden werden.</p>

        <Button
          as={Link}
          className="bg-[#FF0F3D] text-white"
          radius="none"
          variant="flat"
          href="/"
        >
          Zurück zum Home
        </Button>
      </div>
    </>
  );
}
