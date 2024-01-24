import React from "react";

import { Image } from "@nextui-org/react";

const IgoAndIno = () => {
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
    },
  ];
  return (
    <>
      <div className=" flex flex-col gap-5">
        <div className="text-4xl text-white font-semibold">
          <p>UPCOMING PROJECTS</p>
        </div>
        <div className="grid grid-cols-4 gap-8 text-white">
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
    </>
  );
};
export default IgoAndIno;
