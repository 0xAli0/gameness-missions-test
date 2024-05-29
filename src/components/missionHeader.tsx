'use client';
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function MissionHeader() {
    const router = useRouter();

    const session = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/');
        },
    });

  return (
    <header className="h-8 xl:h-auto mt-2 flex justify-between items-center w-full px-3 md:px-6">
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
          width={500}
          height={200}
        />
      </Link>
      <div className="w-full flex gap-4 justify-end font-red_hot_display">
        <div className='flex items-center gap-4'>
            <div className="flex items-center gap-1">
                <img src={session?.data?.user?.image || '/'} alt='profile_picture' className='rounded-full w-12 h-12' />
                <div className='text-white font-red_hot_display'>{session?.data?.user?.name}</div>
            </div> 
            <button className="py-2 px-3 h-8 items-center flex text-xs md:text-sm  font-red_hot_display rounded-full text-base bg-primary hover:bg-black transition-colors whitespace-nowrap" onClick={() => signOut()}>
                <span>Sign out</span>
            </button>
        </div>
      </div>
    </header>
  );
}