import React, { useEffect, useState } from "react";
import { Button, Image, Link } from "@nextui-org/react";
import {
  NextButton,
  PrevButton,
} from "@/scripts/EmblaCarouselArrowsDotsButtons";

export default function Launchpads() {
  const SLIDES = [
    {
      image: "/games/valo-purple.jpeg",
      profile: "/games/cod-logo.jpeg",
      status: "Upcoming",
      launchStatus: "IDO",
      chainImage: "/chains/skale.svg",
      name: "Valorant",
      eventName: "Event Date",
      eventValue: "TBA",
      tokenAllo: "TBA",
      tokenPrice: "TBA",
      slug: "/",
      genre: ["Open-World", "FPS"],
      desc: "Red Dead Redemption 2 (RDR2) is an action-adventure game developed and published by Rockstar Games.",
    },
    {
      image: "/games/valo-purple.jpeg",
      profile: "/games/cod-logo.jpeg",
      status: "Upcoming",
      launchStatus: "IDO",
      chainImage: "/chains/skale.svg",
      name: "Valorant",
      eventName: "Event Date",
      eventValue: "01.01.2024",
      tokenAllo: "$100.000",
      tokenPrice: "$0.02",
      slug: "/",
      genre: ["Open-World", "FPS"],
      desc: "Red Dead Redemption 2 (RDR2) is an action-adventure game developed and published by Rockstar Games.",
    },
    {
      image: "/games/valo-purple.jpeg",
      profile: "/games/cod-logo.jpeg",
      status: "Live",
      launchStatus: "IDO",
      chainImage: "/chains/skale.svg",
      name: "Valorant",
      eventName: "Register Ends in",
      eventValue: "19h:08m:17s",
      tokenAllo: "$100.000",
      tokenPrice: "$0.02",
      slug: "/",
      genre: ["Open-World", "FPS"],
      desc: "Red Dead Redemption 2 (RDR2) is an action-adventure game developed and published by Rockstar Games.",
    },
    {
      image: "/games/valo-purple.jpeg",
      profile: "/games/cod-logo.jpeg",
      status: "Live",
      launchStatus: "IDO",
      chainImage: "/chains/skale.svg",
      name: "Valorant",
      eventName: "Public Sale Ends in",
      eventValue: "10h:08m:17s",
      tokenAllo: "$100.000",
      tokenPrice: "$0.02",
      slug: "/",
      genre: ["Open-World", "FPS"],
      desc: "Red Dead Redemption 2 (RDR2) is an action-adventure game developed and published by Rockstar Games.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextGroup = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const prevGroup = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(SLIDES.length - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % SLIDES.length;
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, SLIDES.length]);
  return (
    <>
      <div className="flex flex-col gap-12 pb-24">
        <div className="relative h-full w-full">
          <div
            style={{
              display: "flex",
              transition: "transform 1s",
              transform: `translateX(-${currentIndex * 100}%)`,
            }}>
            {SLIDES.map((item: any, index: number) => (
              <div
                key={"ihome_" + index.toString()}
                className="relative z-0 text-white sm:h-[250px] md:h-[500px]"
                style={{
                  flex: "0 0 100%",
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}>
                <Image
                  draggable={false}
                  radius="none"
                  src={item.image}
                  className="w-screen brightness-75"
                  alt={`Slide ${index + 1}`}
                />
                <div className="absolute sm:bottom-[25%] md:bottom-[20%] lg:bottom-[10%] flex flex-col gap-1 sm:left-[5%] md:left-[5%] lg:left-[10%] z-10">
                  <div className="bg-white sm:hidden md:flex px-12 text-black flex items-center justify-center sm:px-5 py-1 font-Orbitron text-center max-w-[35%] rounded-md">
                    {item.genre[0]}
                  </div>
                  <p className=" text-xl font-Orbitron font-semibold">
                    {item.name}
                  </p>
                  <p className=" sm:hidden md:flex md:w-[50%]">{item.desc}</p>
                  <Button
                    as={Link}
                    href={`/games/${item.slug}`}
                    radius="sm"
                    size="sm"
                    className="bg-[#a664fe] sm:max-w-[25%] md:py-6 md:max-w-[25%] font-Orbitron text-white sm:text-sm md:text-lg px-16">
                    Explore
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute sm:bottom-[25%] md:bottom-[20%] lg:bottom-[10%] flex gap-2 text-white items-center sm:right-[5%] md:right-[5%] lg:right-[10%] z-10">
            <PrevButton
              onClick={() => prevGroup()}
              className="hover:bg-[#a664fe] hover:border-[#a664fe] rounded-full
              sm:w-9 sm:h-9 md:w-16 md:h-16 
          border border-gray-500 sm:p-2 md:p-4 transition-all duration-300 flex items-center justify-center"></PrevButton>
            <NextButton
              onClick={() => nextGroup()}
              className="hover:bg-[#a664fe] sm:p-2 md:p-4 hover:border-[#a664fe] sm:w-9 sm:h-9 md:w-16 md:h-16 border border-gray-500 rounded-full transition-all duration-300 flex items-center justify-center"></NextButton>
            <div className="text-xl">
              {currentIndex + 1} / {SLIDES.length}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12 px-[10%] mt-5">
          <div className="md:text-4xl sm:text-2xl text-white font-semibold">
            <p>UPCOMING PROJECTS</p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 text-white">
            {SLIDES.map((item: any, index: number) => (
              <div
                key={"upcoming_projects_" + index.toString()}
                className="bg-dark-gray rounded-lg flex flex-col overflow-hidden">
                <Image isBlurred radius="none" src={item.image} />
                <div className="flex justify-between items-center relative px-5 pt-14">
                  <div className="absolute -top-9 left-5">
                    <Image width={70} radius="sm" src={item.profile} />
                  </div>
                  <div className="w-full flex gap-4">
                    <div className="bg-[#271e39] text-[#a664fe] font-Orbitron text-sm rounded-lg px-3 flex items-center">
                      {item.launchStatus}
                    </div>
                    <div className="bg-[#212e1c] text-green-550 flex font-Orbitron items-center text-sm rounded-lg px-3 py-1">
                      {item.status}
                    </div>
                  </div>
                  <div className="w-1/3 flex justify-end">
                    <Image width={35} radius="sm" src={item.chainImage} />
                  </div>
                </div>
                <div className="px-5 flex flex-col gap-1 pb-5 pt-2">
                  <p className=" font-Orbitron font-bold text-2xl pb-2">
                    {item.name}
                  </p>
                  <div className="flex justify-between font-normal text-sm w-full items-center">
                    <p className="text-[#9d9d9d] ">{item.eventName}</p>
                    <p className="font-semibold ">{item.eventValue}</p>
                  </div>
                  <div className="flex justify-between font-normal text-sm w-full items-center">
                    <p className="text-[#9d9d9d] ">Total Allocation</p>
                    <p className="font-semibold ">{item.tokenAllo}</p>
                  </div>
                  <div className="flex justify-between font-normal text-sm w-full items-center">
                    <p className="text-[#9d9d9d] ">Token Price</p>
                    <p className="font-semibold">{item.tokenPrice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
