import React from "react";
import { Button, Image, Link } from "@nextui-org/react";

const sponsors = [
  {
    id: 0,
    path: "/chains/skale-name.svg",
  },
];

const Footer = () => {
  return (
    <>
      <div className="w-screen h-full bg-dark-gray flex gap-4 flex-col sm:px-5 md:px-5 xl:px-[18%]">
        <div className="flex items-center justify-center pt-32 pb-8 w-full">
          <p className="text-white">Trusted by Global Platforms</p>
        </div>

        <div className="xl:flex md:grid md:grid-cols-5 sm:grid sm:grid-cols-3 w-full justify-evenly border-b border-gray-800/50 pb-12">
          {sponsors.map((item: any, index: number) => (
            <div className="" key={`SPONSOR_${index}`}>
              <Image width={180} src={item.path} alt="spon" />
            </div>
          ))}
        </div>
        <div className="flex flex-col text-white pt-12">
          <div className="flex sm:flex-col sm:gap-5 sm:justify-center sm:text-center md:justify-between">
            <div className="flex flex-col gap-5 sm:items-center sm:w-full md:w-[24%]">
              <div className="flex gap-4 sm:items-center sm:justify-center sm:w-full">
                <Link href="/" className=" ">
                  <Image
                    radius="none"
                    width={390}
                    src="/logos/footerlogo.png"
                    alt="logo"
                  />
                </Link>
              </div>
              <p>
                GameXPad brings together the gaming and finance worlds, offering
                you unique opportunities.
              </p>
              <Link href="mailto:info@gamexpad.io" className="text-green-550">
                info@gamexpad.io
              </Link>
            </div>
            <div className="flex flex-col sm:gap-1 md:gap-5  ">
              <p className="text-xl font-Orbitron pb-5">About us</p>
              <div className="grid md:grid-cols-1 sm:grid-cols-3 sm:text-start gap-2">
                <p className="text-[#9d9d9d]">Company</p>
                <p className="text-[#9d9d9d]">Press Kit</p>
                <p className="text-[#9d9d9d]">Disclaimer</p>
                <Link className="text-[#9d9d9d]" href="/privacy-policy">
                  Privacy Policy
                </Link>
                <Link className="text-[#9d9d9d]" href="/terms-of-use">
                  Terms of Use
                </Link>

                <Link
                  isExternal
                  className="text-[#9d9d9d]"
                  href="https://docs.gamexpad.io/welcome/what-is-gamexpad">
                  Whitepaper
                </Link>
              </div>
            </div>
            <div className="flex flex-col sm:gap-1 md:gap-5  ">
              <p className="text-xl font-Orbitron pb-5">Products</p>
              <div className="grid md:grid-cols-1 sm:grid-cols-2 sm:text-start whitespace-nowrap gap-2">
                <p className="text-[#9d9d9d]">IGO Launchpad</p>
                <p className="text-[#9d9d9d]">INO Launchpad</p>
                <p className="text-[#9d9d9d]">Staking</p>
                <Link className="text-[#9d9d9d]" href="/games">
                  Games
                </Link>

                <p className="text-[#9d9d9d]">Game Hub</p>
              </div>
            </div>
            <div className="flex flex-col sm:gap-1 md:gap-5  ">
              <p className="text-xl font-Orbitron pb-5">Contacts</p>
              <div className="grid md:grid-cols-1 sm:grid-cols-2 gap-2 sm:text-start">
                <Link
                  isExternal
                  className="text-[#9d9d9d]"
                  href="https://twitter.com/gmxpad">
                  Twitter
                </Link>

                <Link
                  isExternal
                  className="text-[#9d9d9d]"
                  href="https://t.me/gamexpad">
                  Telegram
                </Link>
                <Link
                  isExternal
                  className="text-[#9d9d9d]"
                  href="https://medium.com/@gamexpad">
                  Medium
                </Link>
                <Link
                  isExternal
                  className="text-[#9d9d9d]"
                  href="https://github.com/gmxpad">
                  Github
                </Link>

                <p className="text-[#9d9d9d]">Help Center</p>
                <p className="text-[#9d9d9d]">Submit Project</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-center sm:text-sm whitespace-nowrap border-t border-gray-800/50 text-white pb-5 pt-5">
          © GameXPad. All Rights Reserved 2024
        </div>
      </div>
    </>
  );
};

export default Footer;
