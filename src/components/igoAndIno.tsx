import React, { useEffect, useRef } from "react";

import { Avatar, AvatarGroup, Image } from "@nextui-org/react";
import classNames from "classnames";
import {
  format6DecimalsAsEther,
  formatTimestampGMT,
  getImageChainImage,
  numberWithCommas,
} from "@/scripts/scripts";
import { formatEther } from "viem";
import { useRouter } from "next/router";

const IPOAndIno = ({ games }: any) => {
  const router = useRouter();
  const allGames = games || [];
  const firstThreeGames = allGames.slice(0, 3);
  const currentTime: number = Math.floor(Date.now() / 1000);

  const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const currentRef = ref.current;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            currentRef?.style.setProperty("opacity", "1");
            currentRef?.style.setProperty("scale", "1");
          } else {
            currentRef?.style.setProperty("opacity", "0.01");
            currentRef?.style.setProperty("scale", "0.9");
          }
        },
        { threshold: 0.4 }
      );
      if (currentRef) {
        observer.observe(currentRef);
      }
      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [ref]);
  };
  const SLIDES = [
    {
      image: "/comingsoon.webp",
      profile: "",
      status: "Coming Soon",
      launchStatus: "IPO",
      chainImage: "/chains/skale.svg",
      name: "Coming Soon",
      eventName: "Event Date",
      eventValue: "TBA",
      tokenAllo: "TBA",
      tokenPrice: "TBA",
      slug: "/",
    },
  ];
  const divRef = useRef<HTMLDivElement>(null);
  const divRef1 = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const divRef3 = useRef<HTMLDivElement>(null);
  const divRef4 = useRef<HTMLDivElement>(null);

  useIntersectionObserver(divRef);
  useIntersectionObserver(divRef1);
  useIntersectionObserver(divRef2);
  useIntersectionObserver(divRef3);
  useIntersectionObserver(divRef4);

  return (
    <>
      <div className="flex flex-col gap-12  mt-5">
        <div
          ref={divRef}
          style={{
            opacity: "0.01",
            scale: "0.9",
            transition: "scale 1s, opacity 1s",
          }}
          className="md:text-4xl sm:text-2xl text-white font-semibold">
          <p>UPCOMING PROJECTS</p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 text-white">
          {firstThreeGames.map((item: any, index: number) => (
            <div
              key={"upcoming_projects_home" + index.toString()}
              ref={
                index == 0
                  ? divRef1
                  : index === 1
                  ? divRef2
                  : index === 2
                  ? divRef3
                  : divRef4
              }
              style={{
                opacity: "0.01",
                scale: "0.9",
                transition: "scale 1s, opacity 1s",
              }}>
              <button
                onClick={() => router.push(`/x-pad/${item[3][0]}`)}
                className="bg-dark-gray rounded-lg flex flex-col overflow-hidden hover:opacity-75 duration-400 hover:ease-in-out">
                <Image
                  isBlurred
                  radius="none"
                  src={item[3][5]}
                  alt="index-key"
                />
                <div className="flex justify-between items-center relative px-5 pt-14">
                  <div className="absolute -top-9 left-5">
                    <Image
                      width={120}
                      radius="sm"
                      src={item[3][6]}
                      alt="index-key2"
                    />
                  </div>
                  <div className="w-full flex gap-4">
                    <div className="bg-[#271e39] text-[#a664fe] font-Orbitron text-sm rounded-lg px-3 py-1 flex items-center">
                      IPO
                    </div>
                    <div className="bg-[#212e1c] text-green-550 flex font-Orbitron items-center text-sm rounded-lg px-3 py-1">
                      {currentTime > item[16] && currentTime < item[19]
                        ? "Live"
                        : currentTime < item[19]
                        ? "Upcoming"
                        : currentTime > item[19]
                        ? "End"
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="px-5 flex flex-col gap-1 pb-5 pt-3 items-start w-full">
                  <p className=" font-Orbitron font-bold text-2xl pb-2">
                    {item[3][1]}
                  </p>
                  <div className="flex w-full flex-col">
                    <div className="flex justify-between w-full">
                      <p className="pb-2 text-[#9d9d9d]">IPO Round</p>
                      <p className="pb-2">#{item[8]}</p>
                    </div>

                    <div className="flex justify-between w-full">
                      <p className="pb-2 text-[#9d9d9d]">Total Allocations</p>
                      <p className="pb-2">
                        $
                        {numberWithCommas(
                          Number(format6DecimalsAsEther(item[11]))
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="pb-2 text-[#9d9d9d]">Event Date (UTC)</p>
                      <p className="pb-2">{formatTimestampGMT(item[16])}</p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
          <div className="bg-dark-gray rounded-lg flex flex-col overflow-hidden hover:opacity-75 duration-400 hover:ease-in-out">
            <Image
              isBlurred
              radius="none"
              src={SLIDES[0].image}
              alt="index-key3"
            />
            <div className="flex justify-between items-center relative px-5 pt-14">
              <div className="absolute -top-9 left-5">
                <Image
                  width={70}
                  radius="sm"
                  src={SLIDES[0].profile}
                  alt="index-key4"
                />
              </div>
              <div className="w-full flex gap-4 pt-2">
                <div className="bg-[#271e39] text-[#a664fe] font-Orbitron text-sm rounded-lg px-3 flex items-center">
                  {SLIDES[0].launchStatus}
                </div>
                <div className="bg-[#212e1c] text-green-550 flex font-Orbitron items-center text-sm rounded-lg px-3 py-1">
                  {SLIDES[0].status}
                </div>
              </div>
            </div>
            <div className="px-5 flex flex-col gap-1 pb-5 pt-4 items-start w-full">
              <p className=" font-Orbitron font-bold text-2xl pb-2">
                {SLIDES[0].name}
              </p>
              <div className="flex w-full flex-col">
                <div className="flex justify-between w-full">
                  <p className="pb-2 text-[#9d9d9d]">IPO Round</p>
                  <p className="pb-2">#-</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="pb-2 text-[#9d9d9d]">Total Allocations</p>
                  <p className="pb-2">TBA</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="pb-2 text-[#9d9d9d]">Event Date (UTC)</p>
                  <p className="pb-2">TBA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default IPOAndIno;
