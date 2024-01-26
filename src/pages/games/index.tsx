import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  Image,
  Input,
  Link,
  Tab,
  Tabs,
} from "@nextui-org/react";
import {
  PrevButton,
  NextButton,
} from "../../scripts/EmblaCarouselArrowsDotsButtons";

import { getStaticProps } from "@/framework/rest/games.ssr";
import { InferGetStaticPropsType } from "next";
import { NextPageWithLayout } from "@/types";

export { getStaticProps };
const Games: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ games }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextGroup = () => {
    if (currentIndex < games.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const prevGroup = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(games.length - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % games.length;
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, games.length]);

  const [filterGame, setFilterGame] = useState<string>("");
  const [filteredCount, setFilteredCount] = useState<number>(0);
  const [selectChainID, setSelectChainID] = useState<number>(0);

  const filter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectChainID(0);
    setFilterGame(newValue);

    const matchingGames = games.filter((item: any) =>
      item.name.toLowerCase().includes(newValue.trim().toLowerCase())
    );
    setFilteredCount(matchingGames.length);
    if (newValue === "") {
      setFilterGame("");
      setFilteredCount(0);
    }
  };

  let filteredGames: any[];
  if (filteredCount > 0) {
    filteredGames = games.filter((item: any) =>
      item.name.toLowerCase().includes(filterGame.trim().toLowerCase())
    );
  } else {
    filteredGames = games;
  }

  return (
    <>
      <div className="flex flex-col w-full h-full sm:gap-0 md:gap-10">
        <div className="relative h-full w-full">
          <div
            style={{
              display: "flex",
              transition: "transform 1s",
              transform: `translateX(-${currentIndex * 100}%)`,
            }}>
            {games.map((item: any, index: number) => (
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
                  <div className="bg-white sm:hidden md:flex text-black flex items-center justify-center sm:px-5 py-1 font-Orbitron text-center md:max-w-[20%] rounded-md">
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
              className="hover:bg-green-550/50 hover:border-green-550 
              sm:w-9 sm:h-9 md:w-16 md:h-16 
          border border-gray-500 rounded-xl p-3 transition-all duration-300 flex items-center justify-center"></PrevButton>
            <NextButton
              onClick={() => nextGroup()}
              className="hover:bg-green-550/50 p-3 hover:border-green-550 sm:w-9 sm:h-9 md:w-16 md:h-16 border border-gray-500 rounded-xl transition-all duration-300 flex items-center justify-center"></NextButton>
            <div className="text-xl">
              {currentIndex + 1} / {games.length}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:gap-5 text-white text-4xl font-semibold px-[5%] sm:w-full md:w-[35%]">
          <p>Browse Games</p>
          <Input
            classNames={{
              input: "text-white",
              inputWrapper: " border-gray-800/50",
            }}
            value={filterGame}
            radius="sm"
            type=""
            color="secondary"
            label="Search game"
            variant="underlined"
            onChange={filter}
          />
        </div>
        <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 sm:gap-12 mt-10 px-[5%]">
          {filteredGames.length > 0 ? (
            filteredGames.map((filteredGame: any, index: number) => (
              <div
                key={"filteredGame_keys" + index.toString()}
                className="flex flex-col overflow-hidden">
                <Card className="bg-transparent">
                  <Link href={"/games/" + filteredGame.slug}>
                    <CardBody className="h-[350px] w-full gap-2 flex flex-col justify-between ">
                      <Image
                        width={1650}
                        height={350}
                        isBlurred
                        isZoomed
                        className="h-[240px] w-full"
                        src={filteredGame.image}
                        alt="game"
                      />
                      <p className="text-[#a664fe] font-Orbitron">
                        {filteredGame.name}
                      </p>

                      <div className="w-full flex justify-between items-center text-white">
                        <div className="flex gap-1">
                          {filteredGame.genre.map(
                            (item: any, index: number) => (
                              <div
                                key={"imageKey" + index.toString()}
                                className="font-normal text-sm px-2 rounded-md border border-gray-800/50">
                                {item}
                              </div>
                            )
                          )}
                        </div>
                        <div className="flex gap-1">
                          <AvatarGroup
                            key={"chainKey" + index.toString()}
                            isBordered>
                            {filteredGame.chains.map(
                              (item: any, index: number) => (
                                <Avatar
                                  size="sm"
                                  key={item.toString() + index.toString()}
                                  src={item}
                                />
                              )
                            )}
                          </AvatarGroup>
                        </div>
                      </div>
                    </CardBody>
                  </Link>
                </Card>
              </div>
            ))
          ) : (
            <div className="w-full justify-center items-center p-12 text-white text-2xl whitespace-nowrap">
              There is no accessible data!
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Games;
