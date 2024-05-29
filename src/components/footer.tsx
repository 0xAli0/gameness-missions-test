import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <footer className="flex justify-end items-end  p-3 md:p-6 w-full h-[20vh] bg-white">
      <Image
        src="/logo.png"
        alt="Logo"
        className="h-fit  w-1/3 md:w-1/4"
        quality={100}
        width={1000}
        height={500}
      />
    </footer>
  );
}
