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

interface FaqInterface {
  id: number;
  name: string;
  desx: string;
}
interface SocialsInterface {
  name: string;
  link: string;
}

interface GameInterface {
  name: string;
  genre: string[];
  developer: string;
  releasedOn: string;
  holders: string;
  tokenSymbol: string;
  desc: string;
  image: string;
  slug: string;
  chains: string[];
  logo: string;
  gameBanner: string;
  socials: SocialsInterface[];
  faqMenu: FaqInterface[];
  platform: string[];
  chainIDs: number[];
}

const Games: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ game }: any) => {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

  const [avaGame, setAvaGame] = useState<GameInterface>({
    name: "",
    genre: [""],
    developer: "",
    releasedOn: "",
    holders: "",
    tokenSymbol: "",
    desc: "",
    image: "",
    slug: "",
    chains: [""],
    logo: "",
    gameBanner: "",
    socials: [{ name: "", link: "" }],
    faqMenu: [{ id: 0, name: "", desx: "" }],
    platform: [""],
    chainIDs: [1],
  });
  useEffect(() => {
    setAvaGame(game);
  }, [game]);
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
                src={game.image}
                alt={game.name}
                draggable={false}
              />
            </div>
            <div className="absolute z-10 sm:bottom-5 sm:left-5 top-[40%] left-[10%]  w-full sm:hidden md:flex justify-between   text-white">
              <div className="flex flex-col gap-2">
                <div className="bg-white sm:hidden md:flex text-black flex items-center justify-center py-1 font-Orbitron text-center md:max-w-[20%] rounded-md">
                  {game.genre[0]}
                </div>
                <p className=" text-4xl font-Orbitron md:text-5xl">
                  {game.name}
                </p>
                <div className="text-white sm:hidden md:hidden xl:flex w-[45%]">
                  {game.desc}
                </div>
                <Button
                  as={Link}
                  href={game.socials[4].link}
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
            <div className="bg-white sm:hidden md:flex text-black flex items-center justify-center py-1 font-Orbitron text-center md:max-w-[20%] rounded-md">
              {game.genre[0]}
            </div>
            <p className=" text-4xl font-Orbitron md:text-5xl">{game.name}</p>
            <div className="text-white sm:hidden md:hidden xl:flex w-[45%]">
              {game.desc}
            </div>
            <Button
              as={Link}
              href={game.socials[4].link}
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
                <div className="sm:p-2 md:p-5 flex flex-col gap-5 rounded-lg ">
                  <div className="flex sm:flex-col-reverse sm:gap-10 md:gap-10 xl:gap-0 md:flex-col-reverse xl:flex-row justify-between ">
                    <div className="sm:w-full md:w-full xl:w-[60%] flex flex-col justify-center h-full ">
                      <div className="flex w-full">
                        <ReactPlayer
                          width={"1920vh"}
                          height={"450px"}
                          url={game.gameVideo}
                        />
                      </div>
                      <div className="flex sm:flex-col md:flex-col xl:flex-row text-white justify-between items-center mt-5">
                        <div>
                          <p className="text-2xl">Official Links</p>
                        </div>
                        <div className="flex gap-3 items-center">
                          {game.socials.map((item: any, index: number) => (
                            <div
                              key={"ava_games" + index.toString()}
                              className="flex items-center">
                              <Button
                                as={Link}
                                href={item.link}
                                isExternal={true}
                                isIconOnly
                                className="bg-transparent ">
                                <Image
                                  width={
                                    item.name === "Web"
                                      ? 22
                                      : item.name === "Discord"
                                      ? 25
                                      : item.name === "Whitepaper"
                                      ? 38
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
                                      : item.name === "Whitepaper"
                                      ? "/icons/socials/whitepaper.svg"
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
                          <p className="text-2xl font-SpaceGro">
                            {game.genre[0]}
                          </p>
                          <p className="text-sm text-[#9d9d9d]">Genre</p>
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                          <div className="flex gap-1">
                            <AvatarGroup>
                              {game.chains.map((item: any, index: number) => (
                                <Avatar
                                  size="sm"
                                  key={item.toString() + index.toString() + "_"}
                                  src={item}
                                />
                              ))}
                            </AvatarGroup>
                          </div>
                          <p className="text-sm text-[#9d9d9d]">Network</p>
                        </div>

                        <div className="flex flex-col">
                          <p className="text-2xl font-SpaceGro">
                            {game.releasedOn}
                          </p>
                          <p className="text-sm text-[#9d9d9d]">Released On</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-2xl font-SpaceGro">
                            {game.developer}
                          </p>
                          <p className="text-sm text-[#9d9d9d]">Developer</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-2xl font-SpaceGro">
                            {game.holders}
                          </p>
                          <p className="text-sm text-[#9d9d9d]">Holders</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-2xl font-SpaceGro">
                            {game.tokenSymbol}
                          </p>
                          <p className="text-sm text-[#9d9d9d]">Token Symbol</p>
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
                            {game.faqMenu.map((item: FaqInterface) => (
                              <AccordionItem
                                key={"key_games_slug" + item.id.toString()}
                                title={item.name}>
                                <div className="">{item.desx}</div>
                              </AccordionItem>
                            ))}
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
