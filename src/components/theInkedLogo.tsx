import Image from "next/image";

export default function TheInkedLogo() {
  return (
    <Image
      src="/logos/inkedclown-logo-header.png"
      className="w-16 h-18"
      width={64}
      height={64}
      priority
      alt="The Inked Clown Logo"
    />
  );
}
