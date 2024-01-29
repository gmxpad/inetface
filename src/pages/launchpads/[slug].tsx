import React, { useEffect, useState } from "react";

import {
  Avatar,
  AvatarGroup,
  Button,
  Image,
  Link,
  Progress,
  button,
} from "@nextui-org/react";
import { getStaticProps, getStaticPaths } from "@/framework/rest/launchpad.ssr";
import { NextPageWithLayout } from "@/types";
import { InferGetStaticPropsType } from "next";
import classNames from "classnames";
import {
  NextButton,
  PrevButton,
} from "@/scripts/EmblaCarouselArrowsDotsButtons";
export { getStaticPaths, getStaticProps };

interface LaunchpadsInterface {
  name: string;
  genre: string[];
  desc: string;
  image: string;
  slug: string;
  chains: string[];
  logo: string;
  status: string;
  launchStatus: string;
  eventName: string;
  eventValue: string;
  tokenAllo: string;
  tokenPrice: string;
  socials: any;
}

const Launchpad: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ launch }: any) => {
  const [avaLaunchpads, setAvaLaunchpads] = useState<LaunchpadsInterface>({
    name: "",
    genre: ["", "", ""],
    desc: "",
    image: "",
    slug: "",
    chains: [""],
    logo: "",
    status: "",
    launchStatus: "",
    eventName: "",
    eventValue: "",
    tokenAllo: "",
    tokenPrice: "",
    socials: [
      {
        twitter: "/",
      },
      {
        discord: "/",
      },
      {
        telegram: "/",
      },
      {
        web: "/",
      },
    ],
  });

  useEffect(() => {
    setAvaLaunchpads(launch);
  }, []);
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <div className="flex flex-col gap-10 h-full">
        <div className="w-screen flex  sm:h-[250px]  overflow-hidden ">
          <div className="relative w-full h-full">
            <div className="absolute h-full left-0 w-[10%] bg-gradient-to-r from-dark  via-black/50 to-dark/0 z-10"></div>
            <div className="absolute h-full right-0 w-[10%] bg-gradient-to-l from-dark  via-black/50 to-dark/0 z-10"></div>
            <div className="absolute h-[5%] bottom-0 w-full bg-gradient-to-t from-dark  via-dark/50 to-black/0 z-10"></div>
            <div className="absolute h-[5%] top-0 w-full  bg-gradient-to-b from-dark  via-dark/50 to-black/0 z-10"></div>
            <Image
              className="w-screen sm:h-[250px] h-[500px]  object-cover z-0 brightness-75"
              height={280}
              src={avaLaunchpads.image}
              alt={avaLaunchpads.name}
              draggable={false}
            />
            <div className="absolute z-10 sm:bottom-5 sm:left-5 bottom-16 left-[10%]  w-full flex justify-between   text-white">
              <div className="flex flex-col gap-2">
                <div className="bg-white sm:hidden md:flex text-black flex items-center justify-center sm:px-5 py-1 font-Orbitron text-center md:max-w-[20%] rounded-md">
                  {avaLaunchpads.genre[0]}
                </div>
                <p className=" text-4xl md:font-Orbitron md:text-5xl">
                  {avaLaunchpads.name}
                </p>
                <div className="text-white sm:hidden md:hidden xl:flex w-[35%]">
                  {avaLaunchpads.desc}
                </div>
                <Button
                  radius="sm"
                  size="sm"
                  className="bg-[#a664fe] sm:max-w-[25%] md:py-6 md:max-w-[25%] font-Orbitron text-white sm:text-sm md:text-lg px-16">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="absolute bot-5 h-[20%] w-full bg-gradient-to-t from-black  via-black/25 to-black/0 z-10"></div>
          </div>
        </div>
        <div className="flex flex-col gap-12 px-[10%]">
          <div className="bg-dark-gray p-5 flex flex-col gap-5 rounded-lg">
            <div className="flex justify-between">
              <div className="w-[60%] relative flex justify-center">
                <Image
                  src={avaLaunchpads.image}
                  className="w-full brightness-75"
                />
                <div className="absolute bottom-5 z-10 text-white flex gap-5">
                  {avaLaunchpads.socials.map((item: any, index: number) => (
                    <div>
                      <Button
                        as={Link}
                        href={item.link}
                        className="bg-gray-800/50 text-white">
                        <Image
                          width={20}
                          src={
                            item.name === "Twitter"
                              ? "/socials/twitter-border.svg"
                              : item.name === "Discord"
                              ? "/socials/discord-border.svg"
                              : item.name === "Telegram"
                              ? "/socials/medium-border.svg"
                              : "/icons/web.svg"
                          }
                        />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-[37%] border border-gray-800/50 rounded-lg flex flex-col justify-between  overflow-hidden">
                <div>
                  <div className="p-5 text-white/75 text-xl font-sans border-b border-gray-800/50 bg-[#1d1d1d]">
                    <p>Strategic Sale</p>
                  </div>
                  <div>
                    <div className="flex flex-col p-3 gap-2">
                      <div className="flex justify-between w-full">
                        <p className=" text-3xl font-SpaceGro text-white">
                          100,00,0 USDT
                        </p>
                        <Image width={35} src={avaLaunchpads.chains[0]} />
                      </div>
                      <p className="text-[#9d9d9d] text-xs">
                        75.0% of total goal of 100,000,0 USDT
                      </p>
                      <Progress
                        aria-label="Loading..."
                        value={75}
                        color="secondary"
                        className="w-full"
                      />
                      <div className="flex justify-between w-full items-center text-white mt-1">
                        <div className="flex gap-2 items-center">
                          <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                            1
                          </div>
                          <p>Register for an allocation</p>
                        </div>
                        <Image width={30} src="/icons/success.svg" />
                      </div>
                      <div className="flex justify-between w-full items-center text-white mt-1">
                        <div className="flex gap-2 items-center">
                          <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                            2
                          </div>
                          <p>Guaranteed allocation</p>
                        </div>
                        <Image width={30} src="/icons/success.svg" />
                      </div>
                      <div className="flex justify-between w-full items-center text-white mt-1">
                        <div className="flex gap-2 items-center">
                          <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                            3
                          </div>
                          <p>FCFS round one</p>
                        </div>
                        <Image width={30} src="/icons/success.svg" />
                      </div>
                      <div className="flex justify-between items-center w-full text-white mt-1">
                        <div className="flex gap-2 items-center">
                          <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                            4
                          </div>
                          <p>Event complate</p>
                        </div>
                        <Image width={30} src="/icons/success.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-full flex p-3">
                    <div className="w-1/2 flex flex-col">
                      <p className="text-3xl font-SpaceGro text-white">
                        100.00%
                      </p>
                      <p className="text-[#9d9d9d]">Funded</p>
                    </div>
                    <div className="w-1/2 flex flex-col">
                      <p className="text-3xl font-SpaceGro text-white">1297</p>
                      <p className="text-[#9d9d9d]">Participants</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Launchpad;
