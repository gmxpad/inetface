import React from "react";

import { Image } from "@nextui-org/react";

const HowToJoin = () => {
  const SLIDES = [
    {
      image: "/icons/trigger-1.svg",
      name: "Get $GMXP",
      desx: "Get $GMXP on Cex, participate in IDOs on GameXPad.",
      link: "/",
    },
    {
      image: "/icons/trigger-1.svg",
      name: "Stake $GMXP",
      desx: "Access GMXP/Staking to stake $GMXP for participating IDOs.",
      link: "/",
    },
    {
      image: "/icons/trigger-1.svg",
      name: "Apply IDO",
      desx: "Apply IDO pool(s) for determining the participation amount.",
      link: "/",
    },
    {
      image: "/icons/trigger-1.svg",
      name: "Join IDO",
      desx: "Purchase tokens & Claim your tokens.",
      link: "/",
    },
  ];
  return (
    <>
      <div className=" flex flex-col gap-5">
        <div className="text-4xl text-white font-semibold">
          <p>HOW TO JOIN?</p>
        </div>
        <div className="grid grid-cols-2 gap-12 text-white">
          {SLIDES.map((item: any, index: number) => (
            <div
              key={"how_to_join_key_" + index.toString()}
              className="bg-dark-gray rounded-lg ">
              <div className="flex p-5">
                <div className="w-1/2 flex flex-col gap-7">
                  <p className="text-2xl">{item.name}</p>
                  <p className="text-[#9d9d9d]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Ea, distinctio. Molestiae aperiam placeat eius. Enim
                    accusantium aliquid.
                  </p>
                </div>
                <div className="flex w-1/2 justify-center items-center h-full relative">
                  <div className="absolute -top-12 right-0">
                    <Image width={180} src={item.image} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default HowToJoin;
