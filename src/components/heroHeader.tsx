import React from "react";

import {
  User,
  Link,
  Tooltip,
  Button,
  Image,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";

const HeroHeader = () => {
  return (
    <>
      <div className="flex justify-between w-full text-white py-5 relative">
        <div className="absolute dual-gradient-background opacity-50 z-0"></div>
        <div className="w-[48%] flex flex-col gap-12 z-10">
          <div className="text-9xl font-SpaceGro font-bold flex flex-col gap-3">
            <p>Play,</p>
            <p>Invest</p>
            <p>& Earn</p>
            <p className="text-lg w-[85%]">
              GameXPad brings together the gaming and finance worlds, offering
              you unique opportunities.
            </p>
          </div>
          <div className="flex justify-between w-2/3">
            <div className="flex flex-col">
              <div className="text-lg relative max-w-48 whitespace-nowrap">
                Project Launched
                <span className="absolute -top-11 text-6xl text-purple-600 -right-3">
                  .
                </span>
              </div>
              <p className="text-5xl font-mono">0,00</p>
            </div>
            <div className="flex flex-col ">
              <div className="text-lg relative max-w-12 ">
                Users
                <span className="absolute -top-11 text-6xl text-green-550 -right-3">
                  .
                </span>
              </div>
              <p className="text-5xl font-mono">0,00</p>
            </div>
          </div>
          <div className="flex gap-12">
            <Button
              as={Link}
              className="bg-transparent text-white font-bold  text-xl duration-300 border-3 py-7 px-8 border-white"
              href="#">
              Learn More
            </Button>
            <Button
              as={Link}
              className="bg-[#a664fe] text-white font-bold  text-xl duration-300 border-3 py-7 px-8 border-[#a664fe]"
              href="#">
              Submit Project
            </Button>
          </div>
        </div>
        <div className="w-[48%] ">
          <Image
            width={1450}
            height={550}
            className="h-[640px] w-full"
            src="/games/character1.png"
            alt="game"
          />
        </div>
      </div>
    </>
  );
};

export default HeroHeader;
