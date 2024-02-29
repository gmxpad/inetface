import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Avatar,
  AvatarGroup,
  Button,
  Image,
  Link,
} from "@nextui-org/react";
import { getStaticProps, getStaticPaths } from "@/framework/rest/game.ssr";
import { NextPageWithLayout } from "@/types";
import { InferGetStaticPropsType } from "next";
import classNames from "classnames";
import dynamic from "next/dynamic";
export { getStaticPaths, getStaticProps };

const Games: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ game }: any) => {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <div className="flex flex-col sm:gap-5 md:gap-10">
        <div className="w-screen flex  sm:h-[250px]  overflow-hidden ">
          <div className="relative w-full h-full">
            <div className="w-screen sm:h-[250px] h-[400px]">
              <Image
                className="w-screen z-0 brightness-75"
                height={280}
                radius="none"
                src={game[3][4]}
                alt={game[3][1]}
                draggable={false}
              />
            </div>
            <div className="absolute z-10 sm:bottom-5 sm:left-5 top-[40%] left-[10%]  w-full sm:hidden md:flex justify-between   text-white">
              <div className="flex flex-col gap-2">
                <div className="bg-white sm:hidden md:flex text-black flex items-center justify-center py-1 font-Orbitron text-center md:max-w-[20%] rounded-md">
                  {game[3][10][0]}
                </div>
                <p className=" text-4xl font-Orbitron md:text-5xl">
                  {game[3][1]}
                </p>
                <div className="text-white sm:hidden md:hidden xl:flex w-[45%]">
                  {game[3][3]}
                </div>
                <Button
                  as={Link}
                  href={game[3][8][0]}
                  isExternal={true}
                  radius="sm"
                  size="sm"
                  className="bg-[#a664fe] sm:max-w-[25%] md:py-6 md:max-w-[25%] font-Orbitron text-white sm:text-sm md:text-lg px-16">
                  Play
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className=" z-10 p-5 w-full sm:flex md:hidden justify-between   text-white">
          <div className="flex flex-col gap-2">
            <div className="bg-white sm:hidden md:flex text-black flex items-center justify-center sm:px-5 py-1 font-Orbitron text-center md:max-w-[10%] rounded-md">
              {game[3][10][0]}
            </div>
            <p className=" text-4xl font-Orbitron md:text-5xl">{game[3][1]}</p>
            <div className="text-white sm:hidden md:hidden xl:flex w-[45%]">
              {game[3][3]}
            </div>
            <Button
              as={Link}
              href={game[3][8][0]}
              isExternal={true}
              radius="sm"
              size="sm"
              className="bg-[#a664fe] sm:max-w-[25%] md:py-6 md:max-w-[25%] font-Orbitron text-white sm:text-sm md:text-lg px-16">
              Play
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-12 sm:px-[2%] md:px-[10%]">
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
                onPress={() => setActiveTab(1)}
                className={classNames(
                  "bg-transparent text-lg",
                  activeTab === 1 ? "text-white" : "text-white/50"
                )}>
                NFTs
              </Button>
              <Button
                onPress={() => setActiveTab(2)}
                className={classNames(
                  "bg-transparent text-lg",
                  activeTab === 2 ? "text-white" : "text-white/50"
                )}>
                Activity
              </Button>
            </div>
          </div>

          {activeTab === 0 ? (
            <div className="flex text-white w-full ">
              <div className="flex flex-col gap-12 w-full">
                <div className="sm:p-2 flex flex-col gap-5 rounded-lg ">
                  <div className="flex sm:flex-col-reverse sm:gap-10 md:gap-10 xl:gap-0 md:flex-col-reverse xl:flex-row justify-between ">
                    <div className="sm:w-full md:w-full xl:w-[60%] flex flex-col justify-center h-full ">
                      <div className="flex w-full">
                        <ReactPlayer
                          width={"1920vh"}
                          height={"450px"}
                          url={game[3][7]}
                        />
                      </div>
                      <div className="flex sm:flex-col md:flex-col xl:flex-row text-white justify-between items-center mt-5">
                        <div>
                          <p className="text-2xl">Official Links</p>
                        </div>
                        <div className="flex gap-3 items-center">
                          {game[3][8]
                            .filter((item: string) => item !== "")
                            .map((item: string, index: number) => (
                              <div
                                key={"ava_s_game_" + index.toString()}
                                className="flex items-center">
                                <Button
                                  as={Link}
                                  href={item}
                                  isIconOnly
                                  isExternal={true}
                                  className="bg-transparent flex">
                                  <Image
                                    width={
                                      item.startsWith("https://docs")
                                        ? 40
                                        : item.startsWith("https://t.me")
                                        ? 30
                                        : item.startsWith("https://twitter.com")
                                        ? 30
                                        : item.startsWith(
                                            "https://www.youtube.com"
                                          )
                                        ? 35
                                        : 24
                                    }
                                    radius="none"
                                    className="bg-transparent"
                                    src={
                                      item.startsWith("https://twitter.com")
                                        ? "/icons/socials/twitter.svg"
                                        : item.startsWith("https://t.me")
                                        ? "/icons/socials/telegram.svg"
                                        : item.startsWith(
                                            "https://www.youtube.com"
                                          )
                                        ? "/icons/socials/youtube.svg"
                                        : item.startsWith("https://docs")
                                        ? "/icons/socials/whitepaper.svg"
                                        : item.startsWith("https://discord.com")
                                        ? "/socials/discord-border.svg"
                                        : item !== ""
                                        ? "/icons/socials/website.svg"
                                        : ""
                                    }
                                    alt="images"
                                  />
                                </Button>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-6 text-white mt-10 gap-5 whitespace-nowrap">
                        <div className="flex flex-col">
                          <p className="text-2xl font-SpaceGro">
                            {game[3][10][0]}
                          </p>
                          <p className="text-sm text-[#9d9d9d]">Genre</p>
                        </div>

                        <div className="flex flex-col">
                          <p className="text-2xl font-SpaceGro">{game[3][2]}</p>
                          <p className="text-sm text-[#9d9d9d]">Developer</p>
                        </div>
                      </div>
                      <div className="gap-3  sm:w-full md:w-full  flex flex-col justify-center pb-24">
                        <div className="flex flex-col mt-10 gap-3 ">
                          <div className="text-2xl text-white">FAQs</div>

                          <Accordion
                            variant="light"
                            showDivider={false}
                            itemClasses={{
                              base: "w-full py-1",
                              heading:
                                " data-[open=true]:bg-dark-gray  bg-dark-gray px-4 py-2 rounded",
                              indicator:
                                " text-white data-[open=true]:text-white",
                              content:
                                "px-3 rounded mt-2 bg-dark text-[#9d9d9d]",
                              trigger: "mt-2",
                              title:
                                " text-white text-sm data-[open=true]:text-white",
                            }}>
                            <AccordionItem
                              key={"key_game_about"}
                              title={`About ${game[3][1]}`}>
                              <div className="">{game[3][3]}</div>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 1 ? (
            <div className="flex w-full h-[400px] justify-center items-center text-white">
              No Available Data
            </div>
          ) : (
            <div className="flex w-full h-[400px] justify-center items-center text-white">
              No Available Data
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Games;
