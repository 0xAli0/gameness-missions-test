"use client";
import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Header from "@/components/header";
import { HRust } from "@/components/icons";

export default function Home() {
  return (
    <>
      <main className="w-full h-full flex justify-start items-center flex-col min-h-screen max-w-[100vw] overflow-x-hidden text-white     relative">
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

          <div className="flex gap-3 justify-between items-center w-full md:pt-40 xl:h-[50vh] max-h-[450px] px-3">
            <div className=" pt-3 w-2/3  ">
              <p className="text-textGray text-xs md:text-sm font-light font-red_hot_display pb-3 md:pb-6 2xl:pb-8">
                YOU'VE EARNED GMNS POINTS JUST BY BEING HERE!
              </p>
              <h1 className="leading-7">CONGRATULATIONS</h1>
              <h2 className="leading-7">+200 GMNS POINTS</h2>
              <HRust />
              <p className="text-textGray text-xs md:text-sm font-light font-red_hot_display pt-3">
                For more GMNS Points, input a referral code below!
              </p>
              <div className="flex gap-3 w-full xl:w-2/3 pb-6 pt-6 text-xs md:text-sm">
                <input
                  type="text"
                  placeholder="Referral Code"
                  className="bg-white/80 rounded-full shadow-lg font-bold outline-primary shadow-primary/60 placeholder:text-primary text-black text-center  w-full px-3 py-2 "
                />
                <button className=" flex gap-2 shrink-0 shadow-lg shadow-primary/60 bg-primary items-center font-red_hot_display text-white font-bold py-2 px-3 md:px-5 rounded-full h-8 md:h-10 text-xs md:text-sm hover:bg-black hover:text-white  ">
                  ENTER
                </button>
              </div>
              <Link
                href={"#"}
                className=" flex gap-2 shrink-0 bg-[#292A2E] w-full text-center justify-center items-center font-red_hot_display text-white font-bold py-2 md:py-3 px-3 md:px-5 rounded-full h-8 md:h-10 text-xs md:text-sm hover:bg-white hover:text-primary transition-colors  shadow-lg shadow-primary/60"
              >
                PROCEED TO MISSIONS
              </Link>
            </div>
            <div className="w-1/2 flex md:justify-center   md:items-end h-full  md:pt-40 "></div>
          </div>
        </div>
      </main>
    </>
  );
}
