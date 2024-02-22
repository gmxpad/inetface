import React, { useEffect, useRef } from "react";

import { Avatar, AvatarGroup, Image } from "@nextui-org/react";
import classNames from "classnames";
import {
  formatTimestampGMT,
  getImageChainImage,
  numberWithCommas,
} from "@/scripts/scripts";
import { formatEther } from "viem";

const IgoAndIno = ({ launchpads }: any) => {
  const allLaunchpads = launchpads || [];
  const firstThreeLaunchpads = allLaunchpads.slice(0, 3);
  const currentTime: number = Math.floor(Date.now() / 1000);

  const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            ref.current?.style.setProperty("opacity", "1");
            ref.current?.style.setProperty("scale", "1");
          } else {
            ref.current?.style.setProperty("opacity", "0.01");
            ref.current?.style.setProperty("scale", "0.9");
          }
        },
        { threshold: 0.4 }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref]);
  };
  const SLIDES = [
    {
      image: "/comingsoon.webp",
      profile: "",
      status: "Coming Soon",
      launchStatus: "IGO",
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
        <div className="md:text-4xl sm:text-2xl text-white font-semibold">
          <p>UPCOMING PROJECTS</p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 text-white">
          <div className="bg-dark-gray rounded-lg flex flex-col overflow-hidden hover:opacity-75 duration-400 hover:ease-in-out">
            <Image isBlurred radius="none" src={SLIDES[0].image} />
            <div className="flex justify-between items-center relative px-5 pt-14">
              <div className="absolute -top-9 left-5">
                <Image width={70} radius="sm" src={SLIDES[0].profile} />
              </div>
              <div className="w-full flex gap-4">
                <div className="bg-[#271e39] text-[#a664fe] font-Orbitron text-sm rounded-lg px-3 flex items-center">
                  {SLIDES[0].launchStatus}
                </div>
                <div className="bg-[#212e1c] text-green-550 flex font-Orbitron items-center text-sm rounded-lg px-3 py-1">
                  {SLIDES[0].status}
                </div>
              </div>
              <div className="w-1/3 flex justify-end">
                <AvatarGroup>
                  <Avatar
                    size="sm"
                    key={
                      SLIDES[0].chainImage.toString() +
                      SLIDES[0].eventName.toString()
                    }
                    src={SLIDES[0].chainImage}
                  />
                </AvatarGroup>
              </div>
            </div>
            <div className="px-5 flex flex-col gap-1 pb-5 pt-2">
              <p className=" font-Orbitron font-bold text-2xl pb-2">
                {SLIDES[0].name}
              </p>
              <div className="flex justify-between font-normal text-sm w-full items-center">
                <p className="text-[#9d9d9d] ">Event Date</p>
                <p className="font-semibold ">TBA</p>
              </div>
              <div className="flex justify-between font-normal text-sm w-full items-center">
                <p className="text-[#9d9d9d] ">Total Sales</p>
                <p className="font-semibold ">TBA</p>
              </div>
              <div className="flex justify-between font-normal text-sm w-full items-center">
                <p className="text-[#9d9d9d] ">Token Price</p>
                <p className="font-semibold">TBA</p>
              </div>
            </div>
          </div>
          {firstThreeLaunchpads.map((item: any, index: number) => (
            <a
              href={`/launchpads/ino/${item[7][0]}`}
              key={"upcoming_projects_home" + index.toString()}
              className="bg-dark-gray rounded-lg flex flex-col overflow-hidden hover:opacity-75 duration-400 hover:ease-in-out">
              <Image isBlurred radius="none" src={item[7][9]} />
              <div className="flex justify-between items-center relative px-5 pt-14">
                <div className="absolute -top-9 left-5">
                  <Image width={70} radius="sm" src={item[7][10]} />
                </div>
                <div className="w-full flex gap-4">
                  <div className="bg-[#271e39] text-[#a664fe] font-Orbitron text-sm rounded-lg px-3 flex items-center">
                    {item[9] === 0 ? "IGO" : item[10] === 1 ? "INO" : "IDO"}
                  </div>
                  <div className="bg-[#212e1c] text-green-550 flex font-Orbitron items-center text-sm rounded-lg px-3 py-1">
                    {currentTime > item[28] && currentTime < item[29]
                      ? "Live"
                      : currentTime < item[28]
                      ? "Upcoming"
                      : currentTime > item[28]
                      ? "End"
                      : ""}
                  </div>
                </div>
                <div className="w-1/3 flex justify-end">
                  <AvatarGroup>
                    {item[30].map((item: any, index: number) => (
                      <Avatar
                        size="sm"
                        key={item.toString() + index.toString()}
                        src={getImageChainImage(item)}
                      />
                    ))}
                  </AvatarGroup>
                </div>
              </div>
              <div className="px-5 flex flex-col gap-1 pb-5 pt-2">
                <p className=" font-Orbitron font-bold text-2xl pb-2">
                  {item[7][1]}
                </p>
                <div className="flex justify-between font-normal text-sm w-full items-center">
                  <p className="text-[#9d9d9d] ">Event Date</p>
                  <p className="font-semibold ">
                    {formatTimestampGMT(item[22])}
                  </p>
                </div>
                <div className="flex justify-between font-normal text-sm w-full items-center">
                  <p className="text-[#9d9d9d] ">Total Sales</p>
                  <p className="font-semibold ">{numberWithCommas(item[16])}</p>
                </div>
                <div className="flex justify-between font-normal text-sm w-full items-center">
                  <p className="text-[#9d9d9d] ">Token Price</p>
                  <p className="font-semibold">
                    {item[14] === 0
                      ? "Free"
                      : `${Number(formatEther(item[14])).toFixed(1)} $GMXP`}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
export default IgoAndIno;
