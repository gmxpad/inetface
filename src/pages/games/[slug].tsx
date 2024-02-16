import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Image,
  Link,
  Progress,
} from "@nextui-org/react";
import { getStaticProps, getStaticPaths } from "@/framework/rest/game.ssr";
import { NextPageWithLayout } from "@/types";
import { InferGetStaticPropsType } from "next";
import classNames from "classnames";
export { getStaticPaths, getStaticProps };

const Games: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ game }: any) => {
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
            <div className="w-screen sm:h-[250px] h-[400px]">
              <Image
                className="w-screen z-0 brightness-75"
                height={280}
                src={game.image}
                alt={game.name}
                draggable={false}
              />
            </div>
            <div className="absolute z-10 sm:bottom-5 sm:left-5 bottom-16 left-[10%]  w-full flex justify-between   text-white">
              <div className="flex flex-col gap-2">
                <div className="bg-white sm:hidden md:flex text-black flex items-center justify-center sm:px-5 py-1 font-Orbitron text-center md:max-w-[15%] rounded-md">
                  {game.genre[0]}
                </div>
                <p className=" text-4xl md:font-Orbitron md:text-5xl">
                  {game.name}
                </p>
                <div className="text-white sm:hidden md:hidden xl:flex w-[45%]">
                  {game.desc}
                </div>
                <Button
                  radius="sm"
                  size="sm"
                  className="bg-[#a664fe] sm:max-w-[25%] md:py-6 md:max-w-[25%] font-Orbitron text-white sm:text-sm md:text-lg px-16">
                  Play
                </Button>
              </div>
            </div>
            <div className="absolute bot-5 h-[20%] w-full bg-gradient-to-t from-black  via-black/25 to-black/0 z-10"></div>
          </div>
        </div>
        <div className="flex flex-col gap-12 px-[10%]">
          <div className="flex  md:flex-col-reverse xl:flex-row sm:flex-col-reverse sm:gap-5 md:gap-5 xl:gap-0 xl:justify-between w-full border-b border-gray-800/50">
            <div className="flex gap-2">
              <Button
                onPress={() => setActiveTab(0)}
                className={classNames(
                  "bg-transparent text-lg",
                  activeTab === 0 ? "text-white" : "text-white/50"
                )}>
                Overview
              </Button>
              <Button
                disabled
                onPress={() => setActiveTab(1)}
                className={classNames(
                  "bg-transparent text-lg",
                  activeTab === 1 ? "text-white" : "text-white/50"
                )}>
                NFTs
              </Button>
              <Button
                disabled
                onPress={() => setActiveTab(2)}
                className={classNames(
                  "bg-transparent text-lg",
                  activeTab === 2 ? "text-white" : "text-white/50"
                )}>
                Activity
              </Button>
            </div>
          </div>
          {activeTab === 0 && (
            <div className="flex text-white whitespace-nowrap pb-12">
              <div className="flex flex-col gap-12">
                <div className="p-5 flex flex-col gap-5 rounded-lg">
                  <div className="flex sm:flex-col-reverse sm:gap-10 md:gap-10 xl:gap-0 md:flex-col-reverse xl:flex-row justify-between">
                    <div className="sm:w-full md:w-full xl:w-[60%] flex flex-col justify-center">
                      <Image
                        src={game.image}
                        className="w-full brightness-75"
                      />
                      <div className="flex sm:flex-col md:flex-col xl:flex-row text-white justify-between items-center mt-5">
                        <div>
                          <p className="text-2xl">Official Links</p>
                        </div>
                        <div className="flex gap-3 items-center">
                          {game.socials.map((item: any, index: number) => (
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
                          <p className="text-sm text-[#9d9d9d]">Event date</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-2xl font-SpaceGro">IDO</p>
                          <p className="text-sm text-[#9d9d9d]">Event type</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-2xl font-SpaceGro">0.032 USD</p>
                          <p className="text-sm text-[#9d9d9d]">Token price</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-2xl font-SpaceGro">
                            100,000.0 USD
                          </p>
                          <p className="text-sm text-[#9d9d9d]">
                            Total allocation
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-2xl font-SpaceGro">$LUSSA</p>
                          <p className="text-sm text-[#9d9d9d]">Token symbol</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-2xl font-SpaceGro">SKALE</p>
                          <p className="text-sm text-[#9d9d9d]">Network</p>
                        </div>

                        <div className="flex flex-col">
                          <p className="text-2xl font-SpaceGro">SKALE</p>
                          <p className="text-sm text-[#9d9d9d]">Currency</p>
                        </div>
                      </div>

                      {/* <div className="flex flex-col mt-10 gap-3 pb-12">
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
                </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Games;
