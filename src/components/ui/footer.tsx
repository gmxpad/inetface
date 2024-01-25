import React from "react";
import { Image, Link } from "@nextui-org/react";

const sponsors = [
  {
    id: 0,
    path: "/chains/skale-name.svg",
  },
  {
    id: 1,
    path: "/chains/skale-name.svg",
  },
  {
    id: 2,
    path: "/chains/skale-name.svg",
  },
  {
    id: 3,
    path: "/chains/skale-name.svg",
  },
  {
    id: 4,
    path: "/chains/skale-name.svg",
  },
];

const Footer = () => {
  return (
    <>
      <div className="w-screen h-full bg-dark-gray flex gap-4 flex-col px-[18%]">
        <div className="flex items-center justify-center pt-32 pb-8 w-full">
          <p className="text-white">Trusted by Global Platforms</p>
        </div>

        <div className="flex w-full justify-evenly border-b border-gray-800/50 pb-12">
          {sponsors.map((item: any, index: number) => (
            <div className="" key={`SPONSOR_${index}`}>
              <Image width={80} src={item.path} />
            </div>
          ))}
        </div>
        <div className="flex flex-col text-white pt-12">
          <div className="flex justify-between">
            <div className="flex flex-col gap-5  w-[24%]">
              <div className="flex gap-4">
                <p className="text-3xl font-SpaceGro">GAMEXPAD</p>
              </div>
              <p>
                GameXPad brings together the gaming and finance worlds, offering
                you unique opportunities.
              </p>
              <Link href="mailto:info@gamexpad.io" className="text-green-550">
                info@gamexpad.io
              </Link>
            </div>
            <div className="flex flex-col gap-5  ">
              <p className="text-xl font-Orbitron pb-5">About us</p>
              <div className="flex flex-col gap-2">
                <p className="text-[#9d9d9d]">Company</p>
                <p className="text-[#9d9d9d]">Press Kit</p>
                <p className="text-[#9d9d9d]">Disclaimer</p>
                <p className="text-[#9d9d9d]">Privacy</p>
                <p className="text-[#9d9d9d]">Terms of Use</p>
                <p className="text-[#9d9d9d]">Whitepaper</p>
              </div>
            </div>
            <div className="flex flex-col gap-5  ">
              <p className="text-xl font-Orbitron pb-5">Products</p>
              <div className="flex flex-col gap-2">
                <p className="text-[#9d9d9d]">IGO Launchpad</p>
                <p className="text-[#9d9d9d]">INO Launchpad</p>
                <p className="text-[#9d9d9d]">Staking</p>
                <p className="text-[#9d9d9d]">Games</p>
                <p className="text-[#9d9d9d]">Game Hub</p>
              </div>
            </div>
            <div className="flex flex-col gap-5  ">
              <p className="text-xl font-Orbitron pb-5">Contacts</p>
              <div className="flex flex-col gap-2">
                <p className="text-[#9d9d9d]">Twitter</p>
                <p className="text-[#9d9d9d]">Telegram</p>
                <p className="text-[#9d9d9d]">Medium</p>
                <p className="text-[#9d9d9d]">Github</p>
                <p className="text-[#9d9d9d]">Help Center</p>
                <p className="text-[#9d9d9d]">Submit Project</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-center text-white pb-5 pt-12">
          © GameXPad. All Rights Reserved 2024
        </div>
      </div>
    </>
  );
};

export default Footer;
