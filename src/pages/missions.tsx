"use client";
import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { HR, HRust } from "@/components/icons";
import { useEffect, useState } from "react";
import Modal from "@/components/tailwind/Modal";
import MissionHeader from "@/components/missionHeader";
import useTasks from '@/hooks/useTasks'; 
import { useSession } from "next-auth/react";
import useUser from "@/hooks/useGetUser";
import { usePointUser } from '@/hooks/usePointUser'; 
import { Task } from "@/hooks/useTasks";
import toast, { Toaster } from 'react-hot-toast';
import ConnectButton from "@/components/ConnectButton";
import { useAccount } from "wagmi";
import { useInformation } from "@/hooks/useInformation";
import ProgressBar from "@/components/progressBar";
import { FaCheck } from "react-icons/fa6";
import Head from "next/head";
import axios from "axios";

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
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState<Task | null>(null);
  const [email, setEmail] = useState('');
  const [ref, setRef] = useState('');
  const [telegramCode, setTelegramCode] = useState('');
  const [discordCode, setDiscordCode] = useState('');
  const [keyword, setKeyword] = useState('');
  const { address: account, isConnected } = useAccount();
  const [userId, setUserId] = useState('');
  const { user, error, isLoading: loadingUser, getUser } = useUser(userId);
  const { tasks, isLoading: loadingTask  } = useTasks();
  const { loading, response, triggerPointUser } = usePointUser();
  const { loading: informationLoading, response: informationResponse, trigerInformation } = useInformation();
  const { data: session, status } = useSession();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (session) {
      const customSession = session as unknown as CustomSession; 
      setUserId(customSession.user.id);
    }
  }, [session, userId]);

  useEffect(() => {
    if (response && response.error) {
    } else if (response && !response.error) {
      console.log("Response:", response);
      getUser(userId);
      setModal(false);
    }
  }, [response]);

  useEffect(() => {
    if (informationResponse && informationResponse.error) {
    } else if (informationResponse && !informationResponse.error) {
      console.log("Response:", informationResponse);
      getUser(userId);
      setModal(false);
    }
  }, [informationResponse]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  }

  const handleRefChange = (e: any) => {
    setRef(e.target.value);
  }

  const handleTelegramCodeChange = (e: any) => {
    setTelegramCode(e.target.value);
  }

  const handleDiscordCodeChange = (e: any) => {
    setDiscordCode(e.target.value);
  }

  const handleKeywordChange = (e: any) => {
    setKeyword(e.target.value);
  }

  if (loadingUser || loadingTask || status === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Gameness</title>
      </Head>
      <Toaster position="bottom-right" />
      <main className="w-full h-full flex justify-start items-center flex-col min-h-screen max-w-[100vw] overflow-x-hidden text-white   gap-6 xl:gap-10  relative">
        <Image
          src="/head-bg.png"
          alt="Hero"
          className=" w-1/2 xl:w-1/3 h-fit absolute right-0 top-[8vh] xl:top-[5vh] -z-10"
          quality={100}
          width={500}
          height={500}
        />
        <div className=" gap-6 xl:gap-10 flex flex-col  w-full  h-full container py-3 pb-10 2xl:px-12">
          <MissionHeader />
          <div className="flex gap-3 justify-between items-end w-full  xl:h-[40vh] px-3">
            <div className=" pt-3 w-1/2 md:w-2/3 ">
              <h1 className="leading-7">GAMENESS</h1>
              <h1 className="leading-7">AIRDROP</h1>
              <h2 className="leading-7 py-2 text-primary">{user?.totalPoints} <span className="text-white">GNESS POINTS</span></h2>
              <HRust />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full px-3">
            {[
              {
                title: "MISSIONS  COMPLETED",
                value: user?.finishedMissions.length,
              },
              {
                title: "TOTAL REFERRALS",
                value: user?.refList.length,
              },
              {
                title: "REFERRAL POINTS",
                value: user?.refPoints,
              },
              {
                title: "REFERRAL MULTIPLER",
                value: `${user?.refMultiplier}x`
              }              
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col text-[10px] md:text-sm py-2 rounded-full gap-0 bg-primary items-center"
              >
                <span className="text-gray-100 font-red_hot_display font-light w-full text-center">
                  {item.title}
                </span>
                <h3>{item.value}</h3>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 px-3">
            <span className="text-gray-100 text-[10px] md:text-sm  font-red_hot_display font-light text-center">
              Invite friends using Referral Code for bonus points!
            </span>
            <div className=" bg-primary py-2 md:py-3 px-6 rounded-full flex items-center gap-2 md:gap-3 text-sm relative">
              <span>{user?.screenName}</span>
              <Tippy trigger="click" content="Copied">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(user?.screenName ?? "");
                  }}
                  type="button"
                  data-trigger="mouseenter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                  >
                    <path d="M320 448v40c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V120c0-13.3 10.7-24 24-24h72v296c0 30.9 25.1 56 56 56h168zm0-344V0H152c-13.3 0-24 10.7-24 24v368c0 13.3 10.7 24 24 24h272c13.3 0 24-10.7 24-24V128H344c-13.2 0-24-10.8-24-24zm121-31L375 7A24 24 0 0 0 358.1 0H352v96h96v-6.1a24 24 0 0 0 -7-17z" />
                  </svg>
                </button>
              </Tippy>
            </div>
          </div>
          <ProgressBar totalReferrals={user?.refList.length || 0} />
          <Image
            src="/mid-bg.png"
            width={1000}
            height={200}
            alt="Hero"
            className="h-fit w-full"
          />
          <div className="flex flex-col gap-2 w-full items-center pt-4 md:pt-10 ">
            <h1 className="leading-7 mb-2 xl:mb-6 2xl:mb-8">MISSION BOARD</h1>
            <HR />
            <div className="grid gap-3 w-full py-2 md:py-4 overflow-y-auto px-3 ">
              {Array.isArray(tasks) && tasks.filter(task => !user?.finishedMissions.includes(task._id)).length > 0 ? (
                tasks.filter(task => !user?.finishedMissions.includes(task._id))
                  .sort((a, b) => {
                    const typeA = a.mission_type === "dailyCheck" || a.mission_title.includes("Daily Post") ? "dailyCheck" : a.mission_type;
                    const typeB = b.mission_type === "dailyCheck" || b.mission_title.includes("Daily Post") ? "dailyCheck" : b.mission_type;
                    const order = ["ref", "email", "wallet", "dailyCheck", "joinTelegram", "joinDiscord", "twitter", "visit_website"];
                    const indexA = order.indexOf(typeA);
                    const indexB = order.indexOf(typeB);
                    if (indexA === indexB) {
                      return parseInt(a._id) - parseInt(b._id);
                    }
                    return indexA - indexB;
                  })
                  .map((item: Task) => (
                    <div
                      key={item._id}
                      className={`flex justify-between shadow shadow-white/10 gap-2 w-full items-center ${item.mission_type === 'dailyCheck' || item.mission_title.includes('Daily Post') ? 'bg-gradient-to-r from-green-700 from-10% via-[#2F3136] via-30%' : 'bg-gradient-to-r from-primary from-10% via-[#2F3136] via-30%'} rounded-lg px-3 md:px-6 py-2 h-32 sm:h-28`}
                    >
                      <div className="flex flex-col gap-0.5 w-1/2">
                        <h5 className="text-xs sm:text-base text-white">{item.mission_title}</h5>
                        <span className="text-gray-300 text-[10px] md:text-sm font-extralight">
                          {item.mission_description}
                        </span>
                      </div>
                      <div className="flex gap-2 md:gap-4 items-center">
                        <span className="text-white text-[10px] shrink-0 md:text-sm font-extralight">
                          +{item.mission_point} GNESS Point
                        </span>
                        <button
                          onClick={() => {
                            setSelected(item);
                            setModal(true);
                          }}
                          className="bg-white/5 rounded-full text-xs py-2 px-6"
                        >
                          START
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col justify-center py-12">
                  <span className="font-red_hot_display text-white text-center text-base">You finished the entire tasks!</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full items-center pt-4 md:pt-10 ">
            <h1 className="leading-7 mb-2 xl:mb-6 2xl:mb-8">FINISHED MISSION</h1>
            <HR />
            <div className="grid gap-3 w-full py-2 md:py-4 overflow-y-auto px-3 ">
              {Array.isArray(tasks) && tasks.filter(task => user?.finishedMissions.includes(task._id)).length > 0 ? (
                tasks.filter(task => user?.finishedMissions.includes(task._id))
                  .sort((a, b) => {
                    const typeA = a.mission_type === "dailyCheck" || a.mission_title.includes("Daily Post") ? "dailyCheck" : a.mission_type;
                    const typeB = b.mission_type === "dailyCheck" || b.mission_title.includes("Daily Post") ? "dailyCheck" : b.mission_type;
                    const order = ["ref", "email", "wallet", "dailyCheck", "joinTelegram", "joinDiscord", "twitter", "visit_website"];
                    const indexA = order.indexOf(typeA);
                    const indexB = order.indexOf(typeB);
                    if (indexA === indexB) {
                      return parseInt(a._id) - parseInt(b._id);
                    }
                    return indexA - indexB;
                  })
                  .map((item: Task) => (
                    <div
                      key={item._id}
                      className={`flex justify-between shadow shadow-white/10 gap-2 w-full items-center ${item.mission_type === 'dailyCheck' || item.mission_title.includes('Daily Post') ? 'bg-gradient-to-r from-primary from-10% via-[#2F3136] via-30%' : 'bg-gradient-to-r from-primary from-10% via-[#2F3136] via-30%'} rounded-lg px-3 md:px-6 py-2 h-28 sm:h-24`}
                    >
                      <div className="flex flex-col gap-0.5 w-1/2">
                        <h5 className="text-sm sm:text-base text-white">{item.mission_title}</h5>
                        <span className="text-gray-300 text-[10px] md:text-sm font-extralight">
                          {item.mission_description}
                        </span>
                      </div>
                      <div className="flex gap-2 md:gap-4 items-center">
                        <span className="text-green-500 text-[10px] shrink-0 md:text-sm font-extralight">
                          +{item.mission_point} GNESS Point
                        </span>
                        <div className="bg-white/5 rounded-full text-xs py-2 px-4" >
                          <FaCheck className="text-green-500" size={14} />
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col justify-center py-12">
                  <span className="font-red_hot_display text-white text-center text-base">Your finished task will be visiable here!</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Modal modal={modal} setModal={setModal} title="">
          <div className=" max-w-[80vw] w-[600px] flex flex-col gap-6 text-xs md:text-sm 2xl:text-base font-red_hot_display relative">
              {selected && (
                <>
                  <div className="flex flex-col gap-1">
                    <h2 className="mb-0 text-white">{selected.mission_title}</h2>
                    <HRust />
                    <span className="text-white/60">{selected.mission_description}</span>
                  </div>
                  {selected.mission_link ? (
                    <Link
                      href={isMobile ? selected.mobile_mission_link : selected.mission_link}
                      target="_blank"
                      className={`text-center text-white rounded-full py-3 w-full font-bold ${!loading ? 'bg-primary' : 'cursor-not-allowed bg-white/50'}`}
                      onClick={() => {
                        {!loading ? triggerPointUser(userId, selected._id) : null}
                      }}
                    >
                      <span>{selected.mission_title}</span>
                    </Link>
                  ) : (
                    <>
                      {selected.mission_type === "ref" && (
                        <form className="py-2 space-y-4">
                          <input
                            id="ref"
                            className="no-zoom w-full px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/30 bg-white/10 text-white/90"
                            placeholder={`${selected.mission_title}...`}
                            onChange={handleRefChange}
                            type="text"
                            required
                          /> 
                          <button
                            onClick={() => {trigerInformation(userId, selected._id, ref)}}
                            className={`text-center text-white rounded-full py-3 w-full font-bold ${!informationLoading && ref ? 'bg-primary' : 'cursor-not-allowed bg-white/50'}`}
                            disabled={informationLoading || !ref}
                          >
                            <span>{selected.mission_title}</span>
                          </button>
                        </form>
                      )}
                      {selected.mission_type === "email" && (
                        <form
                            className="py-2 space-y-4"
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (email.trim() === '') {
                                toast.error('Please enter your email');
                                return;
                              }
                              trigerInformation(userId, selected._id, email);
                            }}
                          >
                          <input
                            id="email"
                            className="no-zoom w-full px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/30 bg-white/10 text-white/90"
                            placeholder={`${selected.mission_title}...`}
                            onChange={handleEmailChange}
                            type="email"
                            required
                          />
                          <button
                            type="submit"
                            className={`text-center text-white rounded-full py-3 w-full font-bold ${!informationLoading && email ? 'bg-primary' : 'cursor-not-allowed bg-white/50'}`}
                            disabled={informationLoading || !email}
                          >
                            <span>{selected.mission_title}</span>
                          </button>
                        </form>
                      )}
                      {selected.mission_type === "joinTelegram" && (
                        <form className="py-2 space-y-4">
                          <div className="flex flex-col space-y-2">
                            <span className="text-white/60">1. Join the <a className="text-primary" href="https://t.me/GamenessApp" target="_blank">Gameness Telegram group</a> then come back to mission page.</span>
                            <span className="text-white/60">2. Ask new mission page code from <a className="text-primary" href="https://t.me/GamenessBot" target="_blank">@GamenessBot</a></span>
                            <span className="text-white/60">3. Fill the input with code and done the mission.</span>
                          </div>
                          <input
                            id="telegramCode"
                            className="no-zoom w-full px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/30 bg-white/10 text-white/90"
                            placeholder="Mission page Telegram code..."
                            onChange={handleTelegramCodeChange}
                            type="text"
                            required
                          /> 
                          <button
                            onClick={() => {trigerInformation(userId, selected._id, telegramCode)}}
                            className={`text-center text-white rounded-full py-3 w-full font-bold ${!informationLoading && telegramCode ? 'bg-primary' : 'cursor-not-allowed bg-white/50'}`}
                            disabled={informationLoading || !telegramCode}
                          >
                            <span>Done the task</span>
                          </button>
                        </form>
                      )}
                      {selected.mission_type === "joinDiscord" && (
                        <form className="py-2 space-y-4">
                          <div className="flex flex-col space-y-2">
                            <span className="text-white/60">1. Join the <a className="text-primary" href="https://discord.gg/gameness" target="_blank">Gameness Discord Server</a>.</span>
                            <span className="text-white/60">2. Request the mission page code from the <a className="text-primary" target="_blank">#code-request</a> chat on Discord by clicking the <a className="text-primary" target="_blank">"Get your mission code ⚡"</a> button.</span>
                            <span className="text-white/60">3. Fill the input with code and done the mission.</span>
                          </div>
                          <input
                            id="discordCode"
                            className="no-zoom w-full px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/30 bg-white/10 text-white/90"
                            placeholder="Mission page Discord code..."
                            onChange={handleDiscordCodeChange}
                            type="text"
                            required
                          /> 
                          <button
                            onClick={() => {trigerInformation(userId, selected._id, discordCode)}}
                            className={`text-center text-white rounded-full py-3 w-full font-bold ${!informationLoading && discordCode ? 'bg-primary' : 'cursor-not-allowed bg-white/50'}`}
                            disabled={informationLoading || !discordCode}
                          >
                            <span>Done the task</span>
                          </button>
                        </form>
                      )}
                      {selected.mission_type === "wallet" && (
                        <div className="py-2 space-y-4">
                          <ConnectButton />
                          <button
                            onClick={() => {trigerInformation(userId, selected._id, account as string)}}
                            className={`text-center text-white rounded-full py-3 w-full font-bold ${isConnected ? 'bg-primary' : 'bg-white/50 cursor-not-allowed'}`}
                            disabled={!isConnected}
                          >
                            <span>Done the task</span>
                          </button>
                        </div>
                      )}
                      {selected.mission_type === "dailyCheck" && (
                        <div className="py-2 space-y-4">
                          <div className="flex flex-col space-y-2">
                            <span className="text-white/60">You don't need to do anything other than a simple button click, just let us know you're here!</span>
                          </div>
                          <button
                            onClick={() => {
                              {!loading ? triggerPointUser(userId, selected._id) : null}
                            }}
                            className={`text-center text-white rounded-full py-3 w-full font-bold ${!informationLoading ? 'bg-primary' : 'cursor-not-allowed bg-white/50'}`}
                            disabled={informationLoading}
                          >
                            <span>I am here!</span>
                          </button>
                        </div>
                      )}
                      {selected.mission_type === "checkKeyword" && (
                        <div className="py-2 space-y-4">
                          <div className="flex flex-col space-y-2">
                            <span className="text-white/60">Get your <span className="text-primary">"Secret code"</span> from <a className="text-primary" href="https://x.com/i/spaces/1kvJpvePRXbKE/peek" target="_blank">Gameness AMA</a> then done the task!</span>
                          </div> 
                          <input
                            id="discordCode"
                            className="no-zoom w-full px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/30 bg-white/10 text-white/90"
                            placeholder="Secret code..."
                            onChange={handleKeywordChange}
                            type="text"
                            required
                          /> 
                          <button
                            onClick={() => {trigerInformation(userId, selected._id, keyword)}}
                            className={`text-center text-white rounded-full py-3 w-full font-bold ${!informationLoading && keyword ? 'bg-primary' : 'cursor-not-allowed bg-white/50'}`}
                            disabled={informationLoading || !keyword}
                          >
                            <span>I was there!</span>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
          </div>
        </Modal>
        <footer className="fixed bottom-0 left-0 w-full py-2 bg-gray-800 text-center text-white text-sm sm:text-base">
          Need help? Create a ticket in <a href="https://discord.gg/gameness" target="_blank" className="text-primary">Gameness Discord</a>
        </footer>
      </main>
    </>
  );
}
