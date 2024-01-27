import React, { useState } from "react";
import { Button, Image } from "@nextui-org/react";
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
            <Image
              className="w-screen sm:h-[250px] h-[500px]  object-cover z-0 brightness-75"
              height={280}
              src={game.image}
              alt={game.name}
              draggable={false}
            />
            <div className="absolute z-10 sm:bottom-5 sm:left-5 bottom-16 left-[10%]  w-full flex justify-between   text-white">
              <div className="flex flex-col gap-2">
                <div className="bg-white sm:hidden md:flex text-black flex items-center justify-center sm:px-5 py-1 font-Orbitron text-center md:max-w-[20%] rounded-md">
                  {game.genre[0]}
                </div>
                <p className=" text-4xl md:font-Orbitron md:text-5xl">
                  {game.name}
                </p>
                <div className="text-white sm:hidden md:hidden xl:flex w-[35%]">
                  {game.desc}
                </div>
                <Button
                  radius="sm"
                  className="bg-[#a664fe] text-3xl text-white sm:max-w-[50%] md:max-w-full xl:max-w-[20%]">
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
            <div className="flex sm:justify-between md:justify-between xl:justify-end">
              <Button isIconOnly radius="full" className="bg-transparent">
                <Image src="/icons/web.svg" />
              </Button>
              <Button isIconOnly radius="full" className="bg-transparent">
                <Image src="/icons/web.svg" />
              </Button>
              <Button isIconOnly radius="full" className="bg-transparent">
                <Image src="/icons/web.svg" />
              </Button>
              <Button isIconOnly radius="full" className="bg-transparent">
                <Image src="/icons/web.svg" />
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center p-24 text-white whitespace-nowrap">
            No Available Data
          </div>
        </div>
      </div>
    </>
  );
};
export default Games;
