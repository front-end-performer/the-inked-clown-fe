import Image from "next/image";
import img from "/public/logos/inkedclown-logo-header.png"

export default function TheInkedLogo() {
  return (
    <Image
      src={img}
      className="w-16 h-18"
      width={64}
      height={64}
      priority
      alt="The Inked Clown Logo"
    />
  );
}
