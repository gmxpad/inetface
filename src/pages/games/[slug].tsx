import React from "react";
import { Button, Image } from "@nextui-org/react";
import { getStaticProps, getStaticPaths } from "@/framework/rest/game.ssr";
import { NextPageWithLayout } from "@/types";
import { InferGetStaticPropsType } from "next";
export { getStaticPaths, getStaticProps };

const Games: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ game }: any) => {
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
            <div className="absolute z-10 sm:bottom-5 sm:left-5 bottom-16 left-16  w-full flex justify-between   text-white">
              <div className="flex items-center rounded-lg">
                <Image
                  className=" cover-logo sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-cover"
                  width={250}
                  height={350}
                  radius="lg"
                  src={game.logo}
                  alt={game.name}
                  draggable={false}
                />
                <div>
                  <p className="mt-2 ml-2 p-1 px-2 text-4xl md:font-Orbitron md:text-5xl">
                    {game.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute bot-5 h-[20%] w-full bg-gradient-to-t from-black  via-black/25 to-black/0 z-10"></div>
          </div>
        </div>
        <div className="text-white px-[5%]">{game.desc}</div>
      </div>
    </>
  );
};
export default Games;
