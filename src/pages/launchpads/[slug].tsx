import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionItem,
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
  const FAQ_ITEMS = [
    {
      id: 0,
      name: "Vesting/Unlock",
      desx: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae necessitatibus iure vero, autem, dolor natus tempora cupiditate reiciendis nostrum pariatur consectetur at dicta accusantium nesciunt.",
    },
    {
      id: 1,
      name: "Type of Sale/Round",
      desx: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae necessitatibus iure vero, autem, dolor natus tempora cupiditate reiciendis nostrum pariatur consectetur at dicta accusantium nesciunt.",
    },
  ];

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
          <div className="text-3xl text-white">{avaLaunchpads.name}</div>
          <div className="bg-dark-gray p-5 flex flex-col gap-5 rounded-lg">
            <div className="flex justify-between">
              <div className="w-[60%] flex flex-col justify-center">
                <Image
                  src={avaLaunchpads.image}
                  className="w-full brightness-75"
                />
                <div className="flex text-white justify-between items-center mt-5">
                  <div>
                    <p className="text-2xl">Official links</p>
                  </div>
                  <div className="flex gap-3">
                    {avaLaunchpads.socials.map((item: any, index: number) => (
                      <div key={"ava_s_launch_" + index.toString()}>
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
                <div className="grid grid-cols-4 text-white mt-10 gap-5 whitespace-nowrap">
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">23 Jan,2024</p>
                    <p className="text-sm text-[#9d9d9d]">Event date</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">IDO</p>
                    <p className="text-sm text-[#9d9d9d]">Event type</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">0.032 USD</p>
                    <p className="text-sm text-[#9d9d9d]">Event token price</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">1000000 USD</p>
                    <p className="text-sm text-[#9d9d9d]">Total allocation</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">$COD</p>
                    <p className="text-sm text-[#9d9d9d]">Token symbol</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">SKALE</p>
                    <p className="text-sm text-[#9d9d9d]">Network</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">TBA</p>
                    <p className="text-sm text-[#9d9d9d]">
                      CEX Listing date/time
                    </p>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-10">
                  <div className="w-[60%] border flex flex-col gap-4 p-3 overflow-hidden border-gray-800/50">
                    <p className="text-xl text-white">Website</p>
                    <Link href="/" isExternal>
                      <Image isZoomed isBlurred src={avaLaunchpads.image} />
                    </Link>
                  </div>
                  <div className="w-[39%] border flex flex-col gap-4 p-3 overflow-hidden relative border-gray-800/50">
                    <p className="text-xl text-white">Roadmap</p>
                    <Link
                      href="/"
                      isExternal
                      className="absolute bottom-10 right-0">
                      <Image isZoomed isBlurred src={avaLaunchpads.image} />
                    </Link>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-10">
                  <div className="w-[39%] border flex flex-col gap-4 p-3 overflow-hidden relative border-gray-800/50">
                    <p className="text-xl text-white">Team</p>
                    <Link
                      href="/"
                      isExternal
                      className="absolute bottom-10 right-0">
                      <Image isZoomed isBlurred src={avaLaunchpads.image} />
                    </Link>
                  </div>
                  <div className="w-[60%] border flex flex-col gap-4 p-3 overflow-hidden relative border-gray-800/50">
                    <p className="text-xl text-white">Tokenomics</p>
                    <Link href="/" isExternal>
                      <Image isZoomed isBlurred src={avaLaunchpads.image} />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col mt-10 gap-3 pb-12">
                  <div className="text-2xl text-white">
                    {avaLaunchpads.name} Games Token Sale FAQs
                  </div>
                  <div className="border border-gray-800/50 relative overflow-hidden">
                    <div className="absolute top-3 left-3 z-10 text-white text-2xl font-SpaceGro">
                      How to participate
                    </div>
                    <Image
                      radius="none"
                      className=" brightness-50 z-0"
                      src={avaLaunchpads.image}
                    />
                  </div>
                  <Accordion
                    variant="light"
                    showDivider={false}
                    itemClasses={{
                      base: "w-full py-2",
                      heading:
                        " data-[open=true]:bg-dark  bg-dark px-4 py-2 rounded",
                      indicator: " text-white data-[open=true]:text-white",
                      content: "px-3 rounded mt-2 bg-dark text-[#9d9d9d]",
                      trigger: "mt-2",
                      title: " text-white text-sm data-[open=true]:text-white",
                    }}>
                    {FAQ_ITEMS.map((item) => (
                      <AccordionItem
                        key={"key" + item.id.toString()}
                        title={item.name}>
                        <div>{item.desx}</div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
              <div className="w-[37%] h-full border border-gray-800/50 rounded-lg flex flex-col justify-between  overflow-hidden">
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
