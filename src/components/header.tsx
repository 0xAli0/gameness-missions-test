import Image from "next/image";
import Link from "next/link";
const menu = [
  { name: "Gameness", link: "https://gameness.app/", target: "_blank" },
  { name: "Twitter", link: "https://twitter.com/Gamenessapp", target: "_blank" },
  { name: "Discord", link: "https://discord.com/invite/gameness", target: "_blank" },
];
export default function Header() {
  return (
    <header className=" h-8 xl:h-auto flex justify-between items-center w-full px-3 md:px-6">
        <Image
          src="/ust.png"
          alt="Hero"
          className=" w-1/3 xl:w-1/4 h-fit absolute left-0 top-0 -z-10"
          quality={100}
          width={500}
          height={500}
        />
        <Image
          src="/ust.png"
          alt="Hero"
          className=" w-1/3 xl:w-1/4 h-fit rotate-180 absolute right-0 bottom-0 -z-10"
          quality={100}
          width={500}
          height={500}
        />
      <Link href={"/"} className="w-full">
        <Image
          src="/logo.png"
          alt="Logo"
          className="xl:h-6 w-fit"
          quality={100}
          width={600}
          height={200}
        />
      </Link>
      <div className="flex gap-2 md:gap-6 items-center font-red_hot_display font-medium text-[10px]  sm:text-xs md:text-sm lg:text-base">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className=""
            target={item.target}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
