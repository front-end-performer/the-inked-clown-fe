import Image from "next/image";
import img from "/public/logos/inkedclown-logo-header.png"

export default function TheInkedLogo() {
  return (
    <Image
      src={img}
      className="w-16 h-18"
      width={16}
      height={18}
      priority
      alt="The Inked Clown Logo"
    />
  );
}
