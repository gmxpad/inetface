import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Tab,
  Image,
  Tabs,
  CircularProgress,
} from "@nextui-org/react";
import classNames from "classnames";
import { ChevronDown } from "@/components/icons/Icons";
import useWindowDimensions from "@/scripts/useWindowDimensions";
export default function Stake() {
  const { windowWidth } = useWindowDimensions();
  const [isLoad, setLoad] = useState<boolean>(true);
  const [windowW, setWindowW] = useState<number>(0);
  useEffect(() => {
    setWindowW(windowWidth);
    windowWidth > 1279
      ? setSelectedKeys(new Set(["Select Time"]))
      : setSelectedKeys(new Set(["30 Days"]));
    setLoad(false);
  }, [windowWidth]);

  const MOCK_POSITIONS = [
    {
      amount: "45000",
      multipler: "20x",
      time: "1y:9m:19h",
    },
    {
      amount: "45000",
      multipler: "20x",
      time: "1y:9m:19h",
    },
    {
      amount: "45000",
      multipler: "20x",
      time: "1y:9m:19h",
    },
    {
      amount: "45000",
      multipler: "20x",
      time: "1y:9m:19h",
    },
  ];
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState<number>(30);
  const [selectedMultipler, setSelectedMultipler] = useState<number>(1);
  const [stakeInput, setStakeInput] = React.useState<string>("");

  const [selectedKeys, setSelectedKeys] = useState(new Set());

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const selectedTimeVeriable = (time: number, isSM: boolean) => {
    setSelectedDays(time);
    if (time === 30) {
      if (isSM === false) {
        setSelectedKeys(new Set(["Select Time"]));
      }
      setSelectedMultipler(1);
    } else if (time === 90) {
      if (isSM === false) {
        setSelectedKeys(new Set(["Select Time"]));
      }
      setSelectedMultipler(1.5);
    } else if (time === 180) {
      if (isSM === false) {
        setSelectedKeys(new Set(["Select Time"]));
      }
      setSelectedMultipler(2);
    } else if (time === 365) {
      setSelectedMultipler(4);
    } else if (time === 730) {
      setSelectedMultipler(8);
    } else if (time === 1095) {
      setSelectedMultipler(12);
    } else if (time === 1460) {
      setSelectedMultipler(16);
    } else if (time === 1825) {
      setSelectedMultipler(20);
    }
  };
  const handleStakeInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value.toString();
    setStakeInput(newValue);
    try {
    } catch (error) {
    } finally {
    }
  };

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

  return (
    <>
      {isLoad === false ? (
        <div className="flex sm:flex-col md:flex-col xl:flex-row justify-between w-full sm:h-full md:h-full xl:h-full sm:px-5 md:px-5 xl:px-[10%] relative overflow-hidden py-12">
          <div
            style={{ width: "900px", height: "800px" }}
            className="dual-background absolute top-0 right-0 z-0 blur-3xl opacity-25"></div>
          <div className="flex flex-col justify-center sm:w-full md:w-full xl:w-[49%] gap-5">
            <div className="text-white text-5xl font-SpaceGro sm:text-center md:text-center xl:text-start">
              <span className="text-[#a664fe]">Stake</span> your $GMXPs to join
              the best <span className="text-[#a664fe]">IGOs</span>
            </div>
            <div className="flex gap-2 sm:justify-center md:justify-center xl:justify-start">
              <Button
                radius="sm"
                className="max-w-[130px] bg-[#a664fe] text-white ">
                Buy $GMXP
              </Button>

              <Button
                as={Link}
                isExternal={true}
                radius="sm"
                className="bg-transparent text-white border border-gray-800/50 py-5"
                href="https://docs.gamexpad.io/">
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-2 sm:justify-center  md:justify-center xl:justify-start">
              <p className="text-[#9d9d9d] font-semibold">AVAILABLE ON:</p>
              <Image
                width={190}
                className="sm:w-[100px] md:w-[100px] xl:w-[190px]"
                src="/chains/skale-name.svg"
              />
            </div>
            <div className="bg-dark-gray z-10 text-white/75 p-3 rounded-lg">
              Stakers have priority access to IGOs, granting them early
              investment opportunities in blockchain gaming projects.
            </div>
          </div>

          <div className="sm:w-full md:w-full xl:w-[49%] bg-dark-gray rounded-lg flex flex-col z-10 sm:mt-12 md:mt-12 xl:mt-0  xl:scale-95 xl:-mr-5">
            <div className=" flex gap-3 p-3 border-b border-gray-800/50 sm:justify-between md:justify-center  whitespace-nowrap xl:justify-between items-center">
              <div>
                <Button
                  onPress={() => setActiveTab(0)}
                  className={classNames(
                    "sm:px-0 xl:px-10 bg-transparent",
                    activeTab === 0 ? " text-white" : " text-white/50"
                  )}>
                  Stake
                </Button>
                <Button
                  onPress={() => setActiveTab(1)}
                  className={classNames(
                    "sm:px-0 xl:px-10 bg-transparent",
                    activeTab === 1 ? " text-white" : " text-white/50"
                  )}>
                  My Pools
                </Button>
              </div>
              <div className="text-white pr-5 sm:text-sm">
                <span className="text-[#9d9d9d]">APR:</span> 102%
              </div>
            </div>
            {activeTab === 0 ? (
              <div className="p-5 flex flex-col gap-5">
                <div className="flex justify-between w-full">
                  <div className="relative text-white sm:hidden md:hidden xl:flex">
                    <Button
                      size="lg"
                      radius="sm"
                      onPress={() => selectedTimeVeriable(30, false)}
                      className={classNames(
                        "w-full px-5",
                        selectedDays === 30
                          ? "bg-[#a664fe] text-white"
                          : "bg-gray-800/50 text-white/50"
                      )}>
                      30 Days
                    </Button>
                    <div className="absolute -top-4 right-2 bg-black border border-white rounded-full w-7 h-7 text-xs flex items-center justify-center">
                      1x
                    </div>
                  </div>
                  <div className="relative text-white  sm:hidden md:hidden xl:flex">
                    <Button
                      size="lg"
                      radius="sm"
                      onPress={() => selectedTimeVeriable(90, false)}
                      className={classNames(
                        "w-full px-5",
                        selectedDays === 90
                          ? "bg-[#a664fe] text-white"
                          : "bg-gray-800/50 text-white/50"
                      )}>
                      90 Days
                    </Button>
                    <div className="absolute -top-4 right-2 bg-black border border-white rounded-full w-7 h-7 text-xs flex items-center justify-center">
                      1.5x
                    </div>
                  </div>
                  <div className="relative text-white  sm:hidden md:hidden xl:flex">
                    <Button
                      size="lg"
                      radius="sm"
                      onPress={() => selectedTimeVeriable(180, false)}
                      className={classNames(
                        "w-full px-5",
                        selectedDays === 180
                          ? "bg-[#a664fe] text-white"
                          : "bg-gray-800/50 text-white/50"
                      )}>
                      180 Days
                    </Button>
                    <div className="absolute -top-4 right-2 bg-black border border-white rounded-full w-7 h-7 text-xs flex items-center justify-center">
                      2x
                    </div>
                  </div>
                  <div className="relative text-white sm:w-full md:w-full xl:w-[35%]">
                    <Dropdown className="bg-dark-gray text-white">
                      <DropdownTrigger>
                        <Button
                          size="lg"
                          radius="sm"
                          variant="flat"
                          endContent={icons.chevron}
                          className={classNames(
                            "w-full",
                            windowW > 1279 && selectedDays > 180
                              ? "bg-[#a664fe] text-white"
                              : "bg-gray-800/50 text-white/50",
                            windowW < 1280 ? "bg-[#a664fe] text-white" : ""
                          )}>
                          {selectedValue}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        disallowEmptySelection
                        selectionMode="single"
                        className="text-[#A566FD]"
                        // @ts-ignore
                        selectedKeys={selectedKeys}
                        // @ts-ignore
                        onSelectionChange={setSelectedKeys}>
                        <DropdownItem
                          color="secondary"
                          onPress={() => selectedTimeVeriable(30, true)}
                          className={classNames(
                            "sm:flex md:flex xl:hidden",
                            selectedValue === "30 Days"
                              ? "text-white"
                              : "text-white/50"
                          )}
                          key="30_days">
                          {`30 days (1x)`}
                        </DropdownItem>
                        <DropdownItem
                          color="secondary"
                          onPress={() => selectedTimeVeriable(90, true)}
                          className={classNames(
                            "sm:flex md:flex xl:hidden",
                            selectedValue === "90 Days"
                              ? "text-white"
                              : "text-white/50"
                          )}
                          key="90_days">
                          {`90 days (1.5x)`}
                        </DropdownItem>
                        <DropdownItem
                          color="secondary"
                          onPress={() => selectedTimeVeriable(180, true)}
                          className={classNames(
                            "sm:flex md:flex xl:hidden",
                            selectedValue === "180 Days"
                              ? "text-white"
                              : "text-white/50"
                          )}
                          key="180_days">
                          {`180 days (2x)`}
                        </DropdownItem>
                        <DropdownItem
                          color="secondary"
                          onPress={() =>
                            windowW > 1279
                              ? selectedTimeVeriable(365, false)
                              : selectedTimeVeriable(365, true)
                          }
                          className={classNames(
                            selectedValue === "1 Year"
                              ? "text-white"
                              : "text-white/50"
                          )}
                          key="1_Year">
                          {`1 Year (4x)`}
                        </DropdownItem>
                        <DropdownItem
                          color="secondary"
                          onPress={() =>
                            windowW > 1279
                              ? selectedTimeVeriable(730, false)
                              : selectedTimeVeriable(730, true)
                          }
                          className={classNames(
                            selectedValue === "2 Year"
                              ? "text-white"
                              : "text-white/50"
                          )}
                          key="2_Year">
                          {`2 Year (8x)`}
                        </DropdownItem>
                        <DropdownItem
                          color="secondary"
                          onPress={() =>
                            windowW > 1279
                              ? selectedTimeVeriable(1095, false)
                              : selectedTimeVeriable(1095, true)
                          }
                          className={classNames(
                            selectedValue === "3 Year"
                              ? "text-white"
                              : "text-white/50"
                          )}
                          key="3_Year">
                          {`3 Year (12x)`}
                        </DropdownItem>
                        <DropdownItem
                          color="secondary"
                          onPress={() =>
                            windowW > 1279
                              ? selectedTimeVeriable(1460, false)
                              : selectedTimeVeriable(1460, true)
                          }
                          className={classNames(
                            selectedValue === "4 Year"
                              ? "text-white"
                              : "text-white/50"
                          )}
                          key="4_Year">
                          {`4 Year (16x)`}
                        </DropdownItem>
                        <DropdownItem
                          color="secondary"
                          onPress={() =>
                            windowW > 1279
                              ? selectedTimeVeriable(1825, false)
                              : selectedTimeVeriable(1825, true)
                          }
                          className={classNames(
                            selectedValue === "5 Year"
                              ? "text-white"
                              : "text-white/50"
                          )}
                          key="5_Year">
                          {`5 Year (20x)`}
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <div className="absolute -top-4 z-10 right-2 bg-black border border-white rounded-full w-7 h-7 text-xs flex items-center justify-center">
                      {windowW > 1279 && selectedMultipler > 3
                        ? `${selectedMultipler}x`
                        : windowW < 1280
                        ? `${selectedMultipler}x`
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="text-[#a664fe] text-xs sm:text-center md:text-center xl:text-start">
                  <p>
                    Longer lock-up periods result in higher coefficients,
                    leading to increased rewards and access to more IGO
                    opportunities.
                  </p>
                </div>
                <div className="flex justify-between text-[#9d9d9d] sm:text-sm md:text-sm xl:text-base">
                  <p>Total Staked</p>
                  <div className="text-white">{`0 $GMXP`}</div>
                </div>
                <div className="flex justify-between text-[#9d9d9d] sm:text-sm md:text-sm xl:text-base">
                  <p>Total Score</p>
                  <div className="text-white">{`0x`}</div>
                </div>
                <div className="flex justify-between text-[#9d9d9d] sm:text-sm md:text-sm xl:text-base">
                  <p>Earned to Date</p>
                  <div className="flex items-center gap-2 sm:text-sm md:text-sm xl:text-base">
                    <div className="text-white">{`0 $GMXP`}</div>-
                    <div className="text-white">{`0 $SGMXP`}</div>
                  </div>
                </div>
                <div className="flex sm:flex-col sm:gap-2 md:flex-col md:gap-2 xl:flex-row xl:gap-0 items-center md:justify-between w-full text-white border border-gray-800/50 rounded-lg p-2  sm:text-sm md:text-base">
                  <p className="text-[#9d9d9d]">Claimable Rewards:</p>
                  <div className="flex gap-2">
                    <div className="text-white">{`0 $GMXP`}</div>-
                    <div className="text-white">{`0 $SGMXP`}</div>
                  </div>

                  <Button
                    radius="sm"
                    className="bg-transparent text-white border sm:w-full md:w-full xl:w-[20%] border-gray-800/50 px-7">
                    Claim
                  </Button>
                </div>
                <div className="flex flex-col gap-5 border border-gray-800/50 p-3 rounded-lg">
                  <div className="flex sm:flex-col md:flex-col xl:flex-row justify-between">
                    <p className="text-white">Create New Pool</p>
                    <div className="text-white">
                      Total Score: {selectedMultipler}x
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <Input
                      size="sm"
                      value={stakeInput}
                      radius="sm"
                      onInput={handleStakeInput}
                      type="text"
                      color="success"
                      placeholder="Enter Stake Amount"
                      classNames={{
                        input:
                          "bg-transparent placeholder:text-white/75 dark:placeholder:text-white/75 dark:text-white ",
                        inputWrapper:
                          "dark:bg-transparent dark:hover:bg-transparent focus-within:!bg-transparent border border-gray-800/50 focus-within:border-[#a664fe] rounded-r-none",
                        innerWrapper: "bg-transparent text-white ",
                      }}
                      className="w-full whitespace-nowrap p-0 text-white"
                    />
                    <div className="flex items-center">
                      <Button
                        size="lg"
                        radius="sm"
                        className="bg-[#a664fe] rounded-l-none border-l border-gray-800/50 text-white bottom-0 right-0">
                        MAX
                      </Button>
                    </div>
                  </div>
                  <Button
                    radius="sm"
                    className="bg-[#a664fe] text-white text-lg">
                    Stake
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5 p-5">
                {MOCK_POSITIONS.map((item: any, index: number) => (
                  <div key={"positions_" + index.toString()}>
                    <div className="rounded-lg border border-gray-800/50 p-3 flex sm:flex-col md:flex-col xl:flex-row sm:gap-2 md:gap-2 xl:gap-0 justify-between">
                      <div className="flex items-center gap-1 text-white">
                        <Image width={20} src="/logos/gmx-logo.svg" />
                        {item.amount}
                      </div>
                      <div className="flex items-center gap-1 text-white">
                        <p className="text-[#9d9d9d]">Multipler:</p>
                        {item.multipler}
                      </div>
                      <div className="flex items-center gap-1 text-white">
                        <p className="text-[#9d9d9d]">Release in:</p>
                        {item.time}
                      </div>
                      <Button
                        radius="sm"
                        className="bg-transparent border border-gray-800/50 text-white">
                        Unstake
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between">
                  <div className="flex flex-col w-[33%] gap-3 text-white items-center justify-center border-r border-gray-800/50">
                    <p>APR Rate</p>
                    <p className="text-[#9d9d9d]">1%</p>
                  </div>
                  <div className="flex flex-col gap-3 w-[33%] sm:text-center md:text-center xl:text-start text-white items-center justify-center border-r border-gray-800/50">
                    <p>Earned to Date</p>
                    <p className="text-[#9d9d9d]">$0</p>
                  </div>
                  <div className="flex flex-col gap-3 w-[33%] text-white items-center justify-center">
                    <p>Total Score</p>
                    <p className="text-[#9d9d9d]">80x</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-screen h-screen">
          <CircularProgress color="secondary" aria-label="Loading..." />
        </div>
      )}
    </>
  );
}
