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
import {
  getStaticProps,
  getStaticPaths,
} from "@/framework/rest/inoLaunchpad.ssr";
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
      name: "Introduction",
      desx: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae necessitatibus iure vero, autem, dolor natus tempora cupiditate reiciendis nostrum pariatur consectetur at dicta accusantium nesciunt.",
    },
    {
      id: 1,
      name: "Box Information",
      desx: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae necessitatibus iure vero, autem, dolor natus tempora cupiditate reiciendis nostrum pariatur consectetur at dicta accusantium nesciunt.",
    },
    {
      id: 2,
      name: "Timeline",
      desx: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae necessitatibus iure vero, autem, dolor natus tempora cupiditate reiciendis nostrum pariatur consectetur at dicta accusantium nesciunt.",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-10 h-full pb-24">
        <div className="w-screen flex  sm:h-[250px]  overflow-hidden ">
          <div className="relative w-full h-full">
            <div className="absolute h-full left-0 w-[10%] bg-gradient-to-r from-dark  via-dark/50 to-dark/0 z-10"></div>
            <div className="absolute h-full right-0 w-[10%] bg-gradient-to-l from-dark  via-dark/50 to-dark/0 z-10"></div>
            <div className="absolute h-[5%] bottom-0 w-full bg-gradient-to-t from-dark  via-dark/50 to-dark/0 z-10"></div>
            <div className="absolute h-[5%] top-0 w-full  bg-gradient-to-b from-dark  via-dark/50 to-dark/0 z-10"></div>
            <div className="overflow-hidden sm:h-[250px] h-[400px]">
              <Image
                className="w-screen z-0 brightness-75"
                height={280}
                src={avaLaunchpads.image}
                alt={avaLaunchpads.name}
                draggable={false}
              />
            </div>
            <div className="absolute z-10 sm:bottom-16 sm:left-5 bottom-16 left-[10%]  w-full flex justify-between   text-white">
              <div className="flex flex-col gap-2">
                <p className=" text-4xl font-Orbitron sm:text-3xl md:text-5xl">
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
        <div className="flex flex-col gap-12 sm:px-[5%] md:px-[10%]">
          <div className="text-3xl text-white">{avaLaunchpads.name}</div>
          <div className="bg-dark-gray p-5 flex flex-col gap-5 rounded-lg">
            <div className="flex sm:flex-col-reverse md:flex-col-reverse xl:flex-row sm:gap-10 md:gap-10 xl:gap-0 justify-between">
              <div className="sm:w-full md:w-full xl:w-[60%] flex flex-col justify-center">
                <Image
                  src={avaLaunchpads.image}
                  className="w-full brightness-75"
                />
                <div className="flex sm:flex-col md:flex-col xl:flex-row text-white justify-between items-center mt-5">
                  <div>
                    <p className="text-2xl">Official Links</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    {avaLaunchpads.socials.map((item: any, index: number) => (
                      <div
                        key={"ava_s_launch_" + index.toString()}
                        className="flex items-center">
                        <Button
                          as={Link}
                          href={item.link}
                          isIconOnly
                          className="bg-transparent ">
                          <Image
                            width={
                              item.name === "Web"
                                ? 22
                                : item.name === "Discord"
                                ? 25
                                : item.name === "Youtube"
                                ? 40
                                : 30
                            }
                            radius="none"
                            className="bg-transparent"
                            src={
                              item.name === "Twitter"
                                ? "/icons/socials/twitter.svg"
                                : item.name === "Discord"
                                ? "/socials/discord-border.svg"
                                : item.name === "Telegram"
                                ? "/icons/socials/telegram.svg"
                                : item.name === "Web"
                                ? "/icons/socials/website.svg"
                                : item.name === "Youtube"
                                ? "/icons/socials/youtube.svg"
                                : ""
                            }
                          />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-6 text-white mt-10 gap-5 whitespace-nowrap">
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">23 Jan 2024</p>
                    <p className="text-sm text-[#9d9d9d]">Event Date</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">INO</p>
                    <p className="text-sm text-[#9d9d9d]">Event Type</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">FREE MINT</p>
                    <p className="text-sm text-[#9d9d9d]">Event Price</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">7.777 NFTs</p>
                    <p className="text-sm text-[#9d9d9d]">Total Sales</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">SKALE</p>
                    <p className="text-sm text-[#9d9d9d]">Network</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">SKALE</p>
                    <p className="text-sm text-[#9d9d9d]">Currency</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">GIVEAWAY</p>
                    <p className="text-sm text-[#9d9d9d]">Type</p>
                  </div>
                </div>

                <div className="flex flex-col mt-10 gap-3 pb-12">
                  <div className="text-2xl text-white">FAQs</div>

                  <Accordion
                    variant="light"
                    showDivider={false}
                    itemClasses={{
                      base: "w-full py-1",
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
              <div className="sm:w-full md:w-full xl:w-[37%] h-full border border-gray-800/50 rounded-lg flex flex-col justify-between  overflow-hidden">
                <div>
                  <div className="p-5 text-white/75 text-xl font-sans border-b border-gray-800/50 bg-[#1d1d1d]">
                    <p>INO</p>
                  </div>
                  <div>
                    <div className="flex flex-col p-3 gap-2">
                      <div className="flex justify-between w-full">
                        <p className=" text-3xl font-SpaceGro text-white">
                          {avaLaunchpads.name}
                        </p>
                        <Image width={35} src={avaLaunchpads.chains[0]} />
                      </div>
                      <p className="text-[#9d9d9d] text-xs">
                        5.832 of total goal of 7.777 NFTs
                      </p>
                      <Progress
                        aria-label="Loading..."
                        value={75}
                        color="secondary"
                        className="w-full"
                      />
                      <div>
                        <div className="flex justify-between items-center w-full text-white mt-1">
                          <div className="flex gap-2 items-center">
                            <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                              1
                            </div>
                            <p>Event complate</p>
                          </div>
                          <Image width={30} src="/icons/success.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-full flex p-3">
                    <div className=" w-1/2 flex flex-col">
                      <p className="text-3xl font-SpaceGro text-white">
                        74.99%
                      </p>
                      <p className="text-[#9d9d9d]">Sold</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-3xl font-SpaceGro text-white">1297</p>
                      <p className="text-[#9d9d9d]">Participants</p>
                    </div>
                  </div>
                  <div className="p-3 w-full flex justify-center py-8">
                    <Button
                      radius="sm"
                      className="bg-[#a664fe] text-white px-8">
                      Claim
                    </Button>
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
