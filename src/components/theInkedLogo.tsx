import Image from "next/image";

export default function TheInkedLogo() {
  return (
    <Image
      src="/logos/inkedclown-logo-header.png"
      className="w-16"
      width={64}
      height={64}
      alt="The Inked Clown Logo"
    />
  );
}
