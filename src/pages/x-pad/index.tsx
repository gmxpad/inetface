import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Button,
  CircularProgress,
  Image,
  Link,
} from "@nextui-org/react";
import {
  NextButton,
  PrevButton,
} from "@/scripts/EmblaCarouselArrowsDotsButtons";

import { getStaticProps } from "@/framework/rest/ipos.ssr";
import { InferGetStaticPropsType } from "next";
import { NextPageWithLayout } from "@/types";
import { useRouter } from "next/router";
import {
  format6DecimalsAsEther,
  formatTimestampGMT,
  numberWithCommas,
  convertIpfsUrl,
} from "@/scripts/scripts";
export { getStaticProps };

const Launchpads: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ ipos }: any) => {
  const [currentTimestamp, setCurrentTime] = useState(
    Math.floor(Date.now() / 1000)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const nextGroup = () => {
    if (currentIndex < ipos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const prevGroup = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(ipos.length - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % ipos.length;
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, ipos.length]);

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
            {ipos.map((item: any, index: number) => (
              <div
                key={"ihome_" + index.toString()}
                className="relative z-0 text-white sm:h-[250px] md:h-[400px]"
                style={{
                  flex: "0 0 100%",
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}>
                <Image
                  draggable={false}
                  radius="none"
                  src={convertIpfsUrl(item[3][4])}
                  className="w-screen brightness-75"
                  alt={`Slide ${index + 1}`}
                />
                <div className="absolute sm:bottom-[25%] md:bottom-[20%] lg:bottom-[10%] flex flex-col gap-1 sm:left-[5%] md:left-[5%] lg:left-[10%] z-10">
                  <div className="bg-white sm:hidden md:flex text-black flex items-center justify-center sm:px-5 py-1 font-Orbitron text-center md:max-w-[13%] rounded-md">
                    {item[3][10][0]}
                  </div>
                  <p className=" text-xl font-Orbitron font-semibold">
                    {item[3][1]}
                  </p>
                  <p className=" sm:hidden md:flex md:w-[50%]">{item[3][3]}</p>
                  <Button
                    as={Link}
                    href={`/x-pad/${item[3][0]}`}
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
              {currentIndex + 1} / {ipos.length}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12 px-[10%] mt-5">
          <div className="md:text-4xl sm:text-2xl text-white font-semibold">
            <p>UPCOMING GAMES</p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 text-white">
            {ipos.map((item: any, index: number) => (
              <button
                onClick={() => router.push(`/x-pad/${item[3][0]}`)}
                key={"projects_" + index.toString()}
                className="bg-dark-gray rounded-lg flex flex-col overflow-hidden hover:opacity-75 duration-400 hover:ease-in-out">
                <Image
                  isBlurred
                  radius="none"
                  src={convertIpfsUrl(item[3][5])}
                  alt="ipo"
                />
                <div className="flex justify-between items-center relative px-5 pt-14">
                  <div className="absolute -top-9 left-5">
                    <Image
                      width={120}
                      radius="sm"
                      src={convertIpfsUrl(item[3][6])}
                      alt="ipo"
                    />
                  </div>
                  <div className="w-full flex gap-4">
                    <div className="bg-[#271e39] text-[#a664fe] font-Orbitron text-sm rounded-lg px-3 py-1 flex items-center">
                      IPO
                    </div>
                    <div className="bg-[#212e1c] text-green-550 flex font-Orbitron items-center text-sm rounded-lg px-3 py-1">
                      {currentTimestamp < item.ipoDatas[10] ? (
                        <>Upcoming</>
                      ) : currentTimestamp > item.ipoDatas[13] ? (
                        <>Ended</>
                      ) : currentTimestamp > item.ipoDatas[10] &&
                        currentTimestamp < item.ipoDatas[13] ? (
                        <>Live</>
                      ) : (
                        <>Loading...</>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-5 flex flex-col gap-1 pt-3 items-start w-full">
                  <p className=" font-Orbitron font-bold text-2xl pb-2">
                    {item[3][1]}
                  </p>
                  <div className="flex justify-between w-full">
                    <p className="pb-2 text-[#9d9d9d]">IPO Round</p>
                    <p className="pb-2">#{item.ipoDatas[1]}</p>
                  </div>

                  <div className="flex justify-between w-full">
                    <p className="pb-2 text-[#9d9d9d]">Total Allocations</p>
                    <p className="pb-2">
                      $
                      {numberWithCommas(
                        Number(format6DecimalsAsEther(item.ipoDatas[4]))
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <p className="pb-2 text-[#9d9d9d]">Event Date (UTC +3)</p>
                    <div className="pb-2 flex whitespace-nowrap text-xs">
                      {formatTimestampGMT(item.ipoDatas[10])}/
                      {formatTimestampGMT(item.ipoDatas[13])}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Launchpads;
