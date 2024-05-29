"use client"
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from "next/image";
import Header from "@/components/header";
import { HRust } from "@/components/icons";
import { FaXTwitter } from "react-icons/fa6";
import useUser from '@/hooks/useGetUser';
import Link from 'next/link';
import { BiWorld } from 'react-icons/bi';
import Head from 'next/head';


interface SessionUser {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

interface CustomSession {
  expires: string;
  user: SessionUser;
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const { user, error, isLoading, getUser } = useUser(userId);

  useEffect(() => {
    if (session) {
      const customSession = session as unknown as CustomSession; 
      setUserId(customSession.user.id);
    }
  }, [session, userId]);

  useEffect(() => {
    if (status === 'authenticated') {
      setTimeout(() => {
        router.push('/missions');
      }, 500);
    }
  }, [status, session, userId, router.query.ref]);

  const twitterSignIn = async () => {
    signIn('twitter');
  }

  return (
    <>
      <Head>
        <title>Gameness</title>
      </Head>
      <main className="w-full h-full flex justify-start items-center flex-col min-h-screen max-w-[100vw] overflow-x-hidden text-white relative top-0">
        <Image
          src="/main-bg.png"
          alt="Hero"
          className=" w-2/3 xl:w-1/2 h-fit absolute right-0 top-[8vh] xl:top-[5vh] -z-10"
          quality={100}
          width={500}
          height={500}
        />
        <div className=" gap-6 xl:gap-10 flex flex-col  w-full  h-full container py-3 pb-10 2xl:px-12">
          <Header />
          <div className="flex gap-3 justify-between items-center w-full md:pt-40 xl:h-[50vh] max-h-[450px] px-3 ">
            <div className=" pt-3 w-1/2  ">
              <p className="text-textGray text-xs md:text-base font-light font-red_hot_display pb-4 md:pb-6 2xl:pb-8">
                Claim, Compete, Conquer – Your Gameness Airdrop Awaits!
              </p>
              <h1 className="leading-7">GAMENESS</h1>
              <h1 className="leading-7">AIRDROP</h1>
              <HRust />
              <div className="flex gap-3 pt-3">
                <button
                  onClick={twitterSignIn}
                  className=" flex gap-1 bg-primary hover:bg-black transition-colors items-center font-red_hot_display text-white font-bold py-2 px-3 md:px-5 rounded-full h-8 md:h-10 text-xs md:text-sm "
                >
                  <FaXTwitter size={20} />
                  Sign in with X
                </button>
              </div>
            </div>
            <div className="w-1/2 flex md:justify-center   md:items-end h-full  md:pt-40 "></div>
          </div>
        </div>
      </main>
    </>
  );
}
