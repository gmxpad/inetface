import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionItem,
  Avatar,
  AvatarGroup,
  Button,
  Image,
  Link,
  Progress,
  button,
} from "@nextui-org/react";
import { useRouter } from "next/router";

import { getStaticProps, getStaticPaths } from "@/framework/rest/ipo.ssr";
import { NextPageWithLayout } from "@/types";
import { InferGetStaticPropsType } from "next";
import classNames from "classnames";
import {
  format6DecimalsAsEther,
  formatTimestampGMT,
  numberWithCommas,
} from "@/scripts/scripts";
export { getStaticPaths, getStaticProps };

const Launchpad: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ ipo }: any) => {
  const router = useRouter();
  const FAQ_ITEMS = [
    {
      id: 0,
      name: "How to participate",
      desx: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae necessitatibus iure vero, autem, dolor natus tempora cupiditate reiciendis nostrum pariatur consectetur at dicta accusantium nesciunt.",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-10 h-full pb-24">
        <div className="w-screen flex  sm:h-[200px]  overflow-hidden ">
          <div className="relative w-full h-full">
            <div className="overflow-hidden sm:h-[250px] h-[400px]">
              <Image
                radius="none"
                className="w-screen z-0 brightness-75"
                height={280}
                src={ipo[3][4]}
                alt={ipo[3][1]}
                draggable={false}
              />
            </div>
            <div className="absolute z-10 sm:bottom-5 sm:left-5 bottom-16 left-[10%]  w-full flex justify-between   text-white">
              <div className="flex flex-col gap-2">
                <div className="bg-white sm:hidden md:flex text-black flex items-center justify-center sm:px-5 py-1 font-Orbitron text-center md:max-w-[10%] rounded-md">
                  {ipo[3][10][0]}
                </div>
                <p className=" text-3xl font-Orbitron md:text-5xl">
                  {ipo[3][1]}
                </p>
                <div className="text-white sm:hidden md:hidden xl:flex w-[35%]">
                  {ipo[3][3]}
                </div>
                <Button
                  onPress={() => router.push(`/games/${ipo[3][0]}`)}
                  radius="sm"
                  size="sm"
                  className="bg-[#a664fe] sm:max-w-[25%] md:py-6 md:max-w-[25%] font-Orbitron text-white sm:text-sm md:text-lg px-16">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="absolute bot-5 h-[20%] w-full bg-gradient-to-t from-black  via-black/25 to-black/0 z-10"></div>
          </div>
        </div>
        <div className="flex flex-col gap-12 sm:px-[5%] md:px-[10%]">
          <div className="text-3xl text-white">{ipo[3][1]}</div>
          <div className="bg-dark-gray p-5 flex flex-col gap-5 rounded-lg">
            <div className="flex sm:flex-col-reverse sm:gap-10 md:gap-10 xl:gap-0 md:flex-col-reverse xl:flex-row justify-between">
              <div className="sm:w-full md:w-full xl:w-[60%] flex flex-col justify-center">
                <Image src={ipo[3][4]} className="w-full brightness-75" />
                <div className="flex sm:flex-col md:flex-col xl:flex-row text-white justify-between items-center mt-5">
                  <div>
                    <p className="text-2xl">Official Links</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    {ipo[3][8]
                      .filter((item: string) => item !== "")
                      .map((item: string, index: number) => (
                        <div
                          key={"ava_s_game_" + index.toString()}
                          className="flex items-center">
                          <Button
                            as={Link}
                            href={item}
                            isIconOnly
                            isExternal={true}
                            className="bg-transparent flex">
                            <Image
                              width={
                                item.startsWith("https://docs")
                                  ? 40
                                  : item.startsWith("https://t.me")
                                  ? 30
                                  : item.startsWith("https://twitter.com")
                                  ? 30
                                  : item.startsWith("https://www.youtube.com")
                                  ? 35
                                  : 24
                              }
                              radius="none"
                              className="bg-transparent"
                              src={
                                item.startsWith("https://twitter.com")
                                  ? "/icons/socials/twitter.svg"
                                  : item.startsWith("https://t.me")
                                  ? "/icons/socials/telegram.svg"
                                  : item.startsWith("https://www.youtube.com")
                                  ? "/icons/socials/youtube.svg"
                                  : item.startsWith("https://docs")
                                  ? "/icons/socials/whitepaper.svg"
                                  : item.startsWith("https://discord.com")
                                  ? "/socials/discord-border.svg"
                                  : item !== ""
                                  ? "/icons/socials/website.svg"
                                  : ""
                              }
                            />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 sm:gap-6 text-white mt-10 gap-5 whitespace-nowrap">
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">
                      {formatTimestampGMT(ipo[16])}
                    </p>
                    <p className="text-sm text-[#9d9d9d]">Event date (UTC)</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-2xl font-SpaceGro">
                      {numberWithCommas(
                        Number(format6DecimalsAsEther(ipo[11]))
                      )}{" "}
                      USDT
                    </div>
                    <p className="text-sm text-[#9d9d9d]">Total allocation</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">SKALE</p>
                    <p className="text-sm text-[#9d9d9d]">Network</p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">USDT</p>
                    <p className="text-sm text-[#9d9d9d]">Currency</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">
                      {" "}
                      {Number(
                        (Number(ipo[12]) / Number(ipo[11])) * 100
                      ).toFixed(2)}
                      %
                    </p>
                    <p className="text-sm text-[#9d9d9d]">Funded</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">{ipo[6]}</p>
                    <p className="text-sm text-[#9d9d9d]">Participants</p>
                  </div>
                </div>

                <div className="flex flex-col mt-10 gap-3 pb-12">
                  <div className="text-2xl text-white">FAQs</div>

                  <Accordion
                    variant="light"
                    showDivider={false}
                    itemClasses={{
                      base: "w-full py-1",
                      heading:
                        " data-[open=true]:bg-dark  bg-dark px-4 py-2 rounded",
                      indicator: " text-white data-[open=true]:text-white",
                      content: "px-3 rounded mt-2 bg-dark text-[#9d9d9d]",
                      trigger: "mt-2",
                      title: " text-white text-sm data-[open=true]:text-white",
                    }}>
                    {FAQ_ITEMS.map((item) => (
                      <AccordionItem
                        key={"key" + item.id.toString()}
                        title={item.name}>
                        <div>{item.desx}</div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
              <div className="sm:w-full md:w-full xl:w-[37%] h-full border border-gray-800/50 rounded-lg flex flex-col justify-between  overflow-hidden">
                <div>
                  <div className="flex justify-between p-5 text-white/75 text-xl font-sans border-b border-gray-800/50 bg-[#1d1d1d]">
                    <p>Initial Publisher Offering</p>
                    <div>Round: #{ipo[8]}</div>
                  </div>
                  <div>
                    <div className="flex flex-col p-3 gap-2">
                      <div className="flex justify-between w-full">
                        <p className=" text-3xl font-SpaceGro text-white">
                          {numberWithCommas(
                            Number(format6DecimalsAsEther(ipo[11]))
                          )}{" "}
                          USDT
                        </p>
                        <Image width={35} src={"/chains/skale.svg"} />
                      </div>
                      <div className="text-[#9d9d9d] text-xs">
                        {ipo ? (
                          <>
                            {Number(
                              (Number(ipo[12]) / Number(ipo[11])) * 100
                            ).toFixed(2)}
                            %
                          </>
                        ) : (
                          <>Loading...</>
                        )}
                        {""} total goal of{" "}
                        {numberWithCommas(
                          Number(format6DecimalsAsEther(ipo[11]))
                        )}{" "}
                        USDT
                      </div>
                      <Progress
                        aria-label="Loading..."
                        value={parseFloat(
                          Number(
                            (Number(ipo[12]) / Number(ipo[11])) * 100
                          ).toFixed(2)
                        )}
                        color="secondary"
                        className="w-full"
                      />
                      <div className="flex justify-between w-full items-center text-white mt-1">
                        <div className="flex gap-2 items-center">
                          <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                            1
                          </div>
                          <p>KYC Verification</p>
                        </div>
                        <Image width={30} src="/icons/success.svg" />
                      </div>
                      <div className="flex justify-between w-full items-center text-white mt-1">
                        <div className="flex gap-2 items-center">
                          <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                            2
                          </div>
                          <p>Register for an allocation</p>
                        </div>
                        <Image width={30} src="/icons/success.svg" />
                      </div>
                      <div className="flex justify-between w-full items-center text-white mt-1">
                        <div className="flex gap-2 items-center">
                          <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                            3
                          </div>
                          <p>Guaranteed allocation</p>
                        </div>
                        <Image width={30} src="/icons/success.svg" />
                      </div>
                      <div className="flex justify-between items-center w-full text-white mt-1">
                        <div className="flex gap-2 items-center">
                          <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                            4
                          </div>
                          <p>Event complete</p>
                        </div>
                        <Image width={30} src="/icons/success.svg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Launchpad;
