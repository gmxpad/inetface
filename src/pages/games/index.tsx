import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import classNames from "classnames";
import { ChevronDown } from "@/components/icons/Icons";

export { getStaticProps };
const Games: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ games }: any) => {
  const icons = {
    chevron: (
      <ChevronDown
        fill="currentColor"
        size={16}
        height={undefined}
        width={undefined}
      />
    ),
  };

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
  const [selectChainIDs, setSelectChainIDs] = useState<number[]>([0]);

  const filter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectChainIDs([0]);
    setFilterGame(newValue);

    const matchingGames = games.filter((item: any) =>
      item[3][1].toLowerCase().includes(newValue.trim().toLowerCase())
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
      item[3][1].toLowerCase().includes(filterGame.trim().toLowerCase())
    );
  } else {
    filteredGames = games;
  }

  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set(["new_games"])
  );
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <>
      <div className="flex flex-col pb-24">
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
                  src={item[3][4]}
                  className="w-screen brightness-75"
                  alt={`Slide ${index + 1}`}
                />
                <div className="absolute sm:bottom-[25%] md:bottom-[20%] lg:bottom-[10%] flex flex-col gap-1 sm:left-[5%] md:left-[5%] lg:left-[10%] z-10">
                  <div className="bg-white sm:hidden md:flex text-black flex items-center justify-center sm:px-5 py-1 font-Orbitron text-center md:max-w-[10%] rounded-md">
                    {item[3][10][0]}
                  </div>
                  <p className=" text-xl font-Orbitron font-semibold">
                    {item[3][1]}
                  </p>
                  <p className=" sm:hidden md:flex md:w-[50%]">{item[3][3]}</p>
                  <Button
                    as={Link}
                    href={`/games/${item[3][0]}`}
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
              {currentIndex + 1} / {games.length}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 text-white text-4xl font-semibold px-[10%] mt-10">
          <div className="flex w-full justify-between">
            <p>Games</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex md:gap-5 items-center">
              <Button
                onPress={() => setFilterActive(!filterActive)}
                className="bg-transparent text-white px-0 pr-5">
                <Image
                  src={
                    filterActive === true
                      ? "/icons/filter-x.svg"
                      : "/icons/filter.svg"
                  }
                  alt="filter"
                />
                Filters
              </Button>
              <Button
                radius="full"
                className="bg-transparent text-white border border-gray-800/50">
                Clear All
              </Button>
            </div>
            <Dropdown className="bg-dark-gray text-white">
              <DropdownTrigger>
                <Button
                  radius="sm"
                  endContent={icons.chevron}
                  variant="bordered"
                  className="capitalize text-white px-10 border border-gray-800/50">
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                // @ts-ignore
                onSelectionChange={setSelectedKeys}>
                <DropdownItem
                  key="new_games"
                  color="secondary"
                  className={classNames(
                    selectedValue === "new games"
                      ? "text-white"
                      : "text-white/50"
                  )}>
                  New Games
                </DropdownItem>
                <DropdownItem
                  key="old_games"
                  color="secondary"
                  className={classNames(
                    selectedValue === "old games"
                      ? "text-white"
                      : "text-white/50"
                  )}>
                  Old Games
                </DropdownItem>
                <DropdownItem
                  key="date"
                  color="secondary"
                  className={classNames(
                    selectedValue === "date" ? "text-white" : "text-white/50"
                  )}>
                  Date
                </DropdownItem>
                <DropdownItem
                  key="single_date"
                  color="secondary"
                  className={classNames(
                    selectedValue === "single date"
                      ? "text-white"
                      : "text-white/50"
                  )}>
                  Single Date
                </DropdownItem>
                <DropdownItem
                  key="iteration"
                  color="secondary"
                  className={classNames(
                    selectedValue === "iteration"
                      ? "text-white"
                      : "text-white/50"
                  )}>
                  Iteration
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex sm:flex-col px-[10%] flex-row gap-5">
          <div
            className={classNames(
              "bg-dark-gray sm:w-full md:w-[30%] p-5 transition-all duration-400 mt-10 rounded-lg flex flex-col gap-5",
              filterActive === true ? "flex" : "hidden"
            )}>
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
            <div>
              <CheckboxGroup label="Platform">
                <Checkbox color="secondary" value="windows">
                  <div className="text-white flex items-center gap-1">
                    <Image src="/icons/windows.svg" alt="windows" />
                    Windows
                  </div>
                </Checkbox>
                <Checkbox color="secondary" value="macos">
                  <div className="text-white flex items-center gap-1">
                    <Image src="/icons/macos.svg" alt="mac" />
                    MacOS
                  </div>
                </Checkbox>
                <Checkbox color="secondary" value="android">
                  <div className="text-white flex items-center gap-1">
                    <Image src="/icons/android.svg" alt="android" />
                    Android
                  </div>
                </Checkbox>
                <Checkbox color="secondary" value="ios">
                  <div className="text-white flex items-center gap-1">
                    <Image src="/icons/ios.svg" alt="ios" />
                    IOS
                  </div>
                </Checkbox>
                <Checkbox color="secondary" value="web">
                  <div className="text-white flex items-center gap-1">
                    <Image src="/icons/web.svg" alt="web" />
                    Web
                  </div>
                </Checkbox>
              </CheckboxGroup>
            </div>

            <div>
              <CheckboxGroup label="Genres">
                <Checkbox color="secondary" value="metaverse">
                  <div className="text-white flex items-center gap-1">
                    Metaverse
                  </div>
                </Checkbox>
                <Checkbox color="secondary" value="combat">
                  <div className="text-white flex items-center gap-1">
                    Combat
                  </div>
                </Checkbox>
                <Checkbox color="secondary" value="racing">
                  <div className="text-white flex items-center gap-1">
                    Racing
                  </div>
                </Checkbox>
                <Checkbox color="secondary" value="card">
                  <div className="text-white flex items-center gap-1">Card</div>
                </Checkbox>
                <Checkbox color="secondary" value="board">
                  <div className="text-white flex items-center gap-1">
                    Board
                  </div>
                </Checkbox>
                <Checkbox color="secondary" value="rpg">
                  <div className="text-white flex items-center gap-1">RPG</div>
                </Checkbox>
                <Checkbox color="secondary" value="strategy">
                  <div className="text-white flex items-center gap-1">
                    Strategy
                  </div>
                </Checkbox>
                <Checkbox color="secondary" value="moba">
                  <div className="text-white flex items-center gap-1">Moba</div>
                </Checkbox>
              </CheckboxGroup>
            </div>
          </div>
          <div
            className={classNames(
              "grid  md:grid-cols-2 sm:grid-cols-1 sm:gap-12 xl:gap-4 mt-10",
              filterActive === true ? "xl:grid-cols-3" : "xl:grid-cols-4"
            )}>
            {filteredGames.length > 0 ? (
              filteredGames.map((filteredGame: any, index: number) => (
                <div
                  key={"filteredGame_keys" + index.toString()}
                  className="flex flex-col overflow-hidden">
                  <Card className="bg-dark-gray">
                    <Link href={"/games/" + filteredGame[3][0]}>
                      <CardBody className="h-[350px] w-full gap-2 flex flex-col justify-between ">
                        <Image
                          width={1650}
                          height={350}
                          isBlurred
                          isZoomed
                          className="h-[240px] w-full"
                          src={filteredGame[3][5]}
                          alt="game"
                        />
                        <p className="text-white font-Orbitron">
                          {filteredGame[3][1]}
                        </p>

                        <div className="flex justify-between items-center text-white">
                          <div className="flex gap-1">
                            {filteredGame[3][10].map(
                              (item: any, index: number) => (
                                <div
                                  key={"imageKey" + index.toString()}
                                  className="font-normal text-sm px-2 rounded-md border border-gray-800/50">
                                  {item}
                                </div>
                              )
                            )}
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
      </div>
    </>
  );
};
export default Games;
