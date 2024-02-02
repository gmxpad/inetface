import React, { useEffect, useRef } from "react";

import { Image } from "@nextui-org/react";
import classNames from "classnames";

const IgoAndIno = () => {
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
      image: "/gamesGallery/lussa/poster.webp",
      profile: "/gamesGallery/lussa/logo.png",
      status: "Upcoming",
      launchStatus: "IDO",
      chainImage: "/chains/skale.svg",
      name: "Lussa",
      eventName: "Event Date",
      eventValue: "TBA",
      tokenAllo: "TBA",
      tokenPrice: "TBA",
      slug: "/",
    },
    {
      image: "/comingsoon.webp",
      profile: "",
      status: "Coming Soon",
      launchStatus: "IDO",
      chainImage: "/chains/skale.svg",
      name: "Coming Soon",
      eventName: "Event Date",
      eventValue: "TBA",
      tokenAllo: "TBA",
      tokenPrice: "TBA",
      slug: "/",
    },
    {
      image: "/comingsoon.webp",
      profile: "",
      status: "Coming Soon",
      launchStatus: "IDO",
      chainImage: "/chains/skale.svg",
      name: "Coming Soon",
      eventName: "Event Date",
      eventValue: "TBA",
      tokenAllo: "TBA",
      tokenPrice: "TBA",
      slug: "/",
    },
    {
      image: "/comingsoon.webp",
      profile: "",
      status: "Coming Soon",
      launchStatus: "IDO",
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
      <div className="flex flex-col gap-5">
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
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 text-white">
          {SLIDES.map((item: any, index: number) => (
            <div
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
              }}
              key={"upcoming_projects_" + index.toString()}
              className="bg-dark-gray rounded-lg flex flex-col overflow-hidden">
              <div className="sm:h-[300px] md:h-[190px] lg:h-[220px] xl:h-[150px] 2xl:h-[200px] overflow-hidden bg-white">
                <Image
                  isBlurred
                  radius="none"
                  className="w-full h-full"
                  src={item.image}
                />
              </div>
              <div className="flex justify-between items-center relative px-5 pt-14">
                <div className="absolute -top-9 left-5">
                  <Image
                    width={70}
                    radius="sm"
                    className="object-fill"
                    src={item.profile}
                  />
                </div>
                <div className="w-full flex gap-4">
                  <div className="bg-[#271e39] text-[#a664fe] font-Orbitron text-sm rounded-lg px-3 flex items-center">
                    {item.launchStatus}
                  </div>
                  <div
                    className={classNames(
                      " flex font-Orbitron items-center text-sm rounded-lg px-3 py-1",
                      item.status === "Coming Soon"
                        ? "text-white border border-gray-800/50"
                        : "text-green-550 bg-[#212e1c]"
                    )}>
                    {item.status}
                  </div>
                </div>
                <div
                  className={classNames(
                    "w-1/3 justify-end",
                    item.status === "Coming Soon" ? "hidden" : "flex"
                  )}>
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
    </>
  );
};
export default IgoAndIno;
