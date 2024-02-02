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
import { formatEther, parseEther } from "viem";
import { selectConnect, selectUserAddress } from "@/store/slices/walletSlice";
import { useSelector } from "react-redux";
import { fetchGMXTokenContract } from "@/scripts/contracts";
import {
  CalculateScore,
  GetBalance,
  GetStakePool,
  GetStaker,
} from "@/scripts/scripts";
import { skaleChaosTestnet } from "viem/chains";
import { usePublicClient } from "wagmi";

interface StakerInterface {
  staker: boolean;
  totalStakedAmount: number;
  totalScore: number;
  earnedToDateGMX: number;
  earnedToDateSGMX: number;
}
export default function Stake() {
  const { windowWidth } = useWindowDimensions();
  const [isLoad, setLoad] = useState<boolean>(true);
  const [windowW, setWindowW] = useState<number>(0);

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
  const [selectedDays, setSelectedDays] = useState<number>(361);
  const [selectedMultipler, setSelectedMultipler] = useState<number>(4);
  const [stakeInput, setStakeInput] = useState<string>("");
  const [totalScore, setTotalScore] = useState<string>("0");

  const [selectedKeys, setSelectedKeys] = useState(new Set(["1_Year"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const selectedTimeVeriable = async (time: number, isSM: boolean) => {
    setSelectedDays(time);
    if (time === 31) {
      if (isSM === false) {
        setSelectedKeys(new Set(["Select Time"]));
      }
      setSelectedMultipler(1);
      const score: any | undefined = await CalculateScore(stakeInput, 31);
      if (score && score[1] !== undefined) {
        const scoreDiv = parseFloat(score[0]) / 1e6;
        setTotalScore(scoreDiv.toString());
      }
    } else if (time === 91) {
      if (isSM === false) {
        setSelectedKeys(new Set(["Select Time"]));
      }
      setSelectedMultipler(1.5);
      const score: any | undefined = await CalculateScore(stakeInput, 91);
      if (score && score[1] !== undefined) {
        const scoreDiv = parseFloat(score[0]) / 1e6;
        setTotalScore(scoreDiv.toString());
      }
    } else if (time === 181) {
      if (isSM === false) {
        setSelectedKeys(new Set(["Select Time"]));
      }
      setSelectedMultipler(2);
      const score: any | undefined = await CalculateScore(stakeInput, 181);
      if (score && score[1] !== undefined) {
        const scoreDiv = parseFloat(score[0]) / 1e6;
        setTotalScore(scoreDiv.toString());
      }
    } else if (time === 361) {
      setSelectedMultipler(4);
      const score: any | undefined = await CalculateScore(stakeInput, 361);
      if (score && score[1] !== undefined) {
        const scoreDiv = parseFloat(score[0]) / 1e6;
        setTotalScore(scoreDiv.toString());
      }
    } else if (time === 721) {
      setSelectedMultipler(8);
      const score: any | undefined = await CalculateScore(stakeInput, 721);
      if (score && score[1] !== undefined) {
        const scoreDiv = parseFloat(score[0]) / 1e6;
        setTotalScore(scoreDiv.toString());
      }
    } else if (time === 1081) {
      setSelectedMultipler(12);
      const score: any | undefined = await CalculateScore(stakeInput, 1081);
      if (score && score[1] !== undefined) {
        const scoreDiv = parseFloat(score[0]) / 1e6;
        setTotalScore(scoreDiv.toString());
      }
    } else if (time === 1441) {
      setSelectedMultipler(16);
      const score: any | undefined = await CalculateScore(stakeInput, 1441);
      if (score && score[1] !== undefined) {
        const scoreDiv = parseFloat(score[0]) / 1e6;
        setTotalScore(scoreDiv.toString());
      }
    } else if (time === 1801) {
      setSelectedMultipler(20);
      const score: any | undefined = await CalculateScore(stakeInput, 1801);
      if (score && score[1] !== undefined) {
        const scoreDiv = parseFloat(score[0]) / 1e6;
        setTotalScore(scoreDiv.toString());
      }
    }
  };
  const handleStakeInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value.toString();
    setStakeInput(newValue);
    try {
      const score: any | undefined = await CalculateScore(
        newValue,
        selectedDays
      );
      if (score && score[1] !== undefined) {
        const scoreDiv = parseFloat(score[0]) / 1e6;
        setTotalScore(scoreDiv.toString());
      }
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

  // User Veriables
  const client = usePublicClient();
  const connect = useSelector(selectConnect);
  const userAddress = useSelector(selectUserAddress);

  const [gmxBalance, setGmxBalance] = useState<string>("0.0");
  const [stakerInfo, setStakerInfo] = useState<StakerInterface>({
    staker: false,
    totalStakedAmount: 0,
    totalScore: 0,
    earnedToDateGMX: 0,
    earnedToDateSGMX: 0,
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        const balanceGMX: any = await GetBalance(
          userAddress,
          fetchGMXTokenContract.address
        );
        const stakerInfo: any = await GetStaker(userAddress);
        setStakerInfo(stakerInfo);
        setGmxBalance(formatEther(balanceGMX.toString()));
      } catch (error) {
      } finally {
        setLoad(false);
      }
    };
    checkUser();
  }, [userAddress, connect]);
  console.log(stakerInfo, "sTAKER");

  const maxBTN = async () => {
    setStakeInput(gmxBalance);
    const score: any | undefined = await CalculateScore(
      gmxBalance,
      selectedDays
    );
    if (score && score[1] !== undefined) {
      const scoreDiv = parseFloat(score[0]) / 1e6;
      setTotalScore(scoreDiv.toString());
    }
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
                href="https://docs.gamexpad.io/introduction/ourproducts/staking-pool">
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
                      onPress={() => selectedTimeVeriable(31, false)}
                      className={classNames(
                        "w-full px-5",
                        selectedDays === 31
                          ? "bg-[#a664fe] text-white"
                          : "bg-gray-800/50 text-white/50"
                      )}>
                      31 Days
                    </Button>
                    <div className="absolute -top-4 right-2 bg-black border border-white rounded-full w-7 h-7 text-xs flex items-center justify-center">
                      1x
                    </div>
                  </div>
                  <div className="relative text-white  sm:hidden md:hidden xl:flex">
                    <Button
                      size="lg"
                      radius="sm"
                      onPress={() => selectedTimeVeriable(91, false)}
                      className={classNames(
                        "w-full px-5",
                        selectedDays === 91
                          ? "bg-[#a664fe] text-white"
                          : "bg-gray-800/50 text-white/50"
                      )}>
                      91 Days
                    </Button>
                    <div className="absolute -top-4 right-2 bg-black border border-white rounded-full w-7 h-7 text-xs flex items-center justify-center">
                      1.5x
                    </div>
                  </div>
                  <div className="relative text-white  sm:hidden md:hidden xl:flex">
                    <Button
                      size="lg"
                      radius="sm"
                      onPress={() => selectedTimeVeriable(181, false)}
                      className={classNames(
                        "w-full px-5",
                        selectedDays === 181
                          ? "bg-[#a664fe] text-white"
                          : "bg-gray-800/50 text-white/50"
                      )}>
                      181 Days
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
                            windowW > 1279 && selectedDays > 181
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
                          onPress={() => selectedTimeVeriable(31, true)}
                          className={classNames(
                            "sm:flex md:flex xl:hidden",
                            selectedValue === "31 Days"
                              ? "text-white"
                              : "text-white/50"
                          )}
                          key="31_days">
                          {`31 days (1x)`}
                        </DropdownItem>
                        <DropdownItem
                          color="secondary"
                          onPress={() => selectedTimeVeriable(91, true)}
                          className={classNames(
                            "sm:flex md:flex xl:hidden",
                            selectedValue === "91 Days"
                              ? "text-white"
                              : "text-white/50"
                          )}
                          key="91_days">
                          {`91 days (1.5x)`}
                        </DropdownItem>
                        <DropdownItem
                          color="secondary"
                          onPress={() => selectedTimeVeriable(181, true)}
                          className={classNames(
                            "sm:flex md:flex xl:hidden",
                            selectedValue === "181 Days"
                              ? "text-white"
                              : "text-white/50"
                          )}
                          key="181_days">
                          {`181 days (2x)`}
                        </DropdownItem>
                        <DropdownItem
                          color="secondary"
                          onPress={() =>
                            windowW > 1279
                              ? selectedTimeVeriable(361, false)
                              : selectedTimeVeriable(361, true)
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
                              ? selectedTimeVeriable(721, false)
                              : selectedTimeVeriable(721, true)
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
                              ? selectedTimeVeriable(1081, false)
                              : selectedTimeVeriable(1081, true)
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
                              ? selectedTimeVeriable(1441, false)
                              : selectedTimeVeriable(1441, true)
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
                              ? selectedTimeVeriable(1801, false)
                              : selectedTimeVeriable(1801, true)
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
                        : windowW < 1280 && selectedMultipler > 3
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
                  <div className="text-white">{`x`}</div>
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
                    <div className="text-white">{` $GMXP`}</div>-
                    <div className="text-white">{` $SGMXP`}</div>
                  </div>

                  <Button
                    radius="sm"
                    className="bg-transparent text-white border sm:w-full md:w-full xl:w-[20%] border-gray-800/50 px-7">
                    Claim
                  </Button>
                </div>
                <div className="flex flex-col gap-5 border border-gray-800/50 p-3 rounded-lg">
                  <div className="flex sm:flex-col md:flex-col xl:flex-row justify-between">
                    <p className="text-white">Stake $GMXP Token</p>
                    <div className="text-white">Total Score: {totalScore}x</div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <p className="text-[#9d9d9d] text-lg">Balance:</p>
                    <div className="text-white">{gmxBalance} $GMX</div>
                  </div>
                  <div className="flex justify-between relative items-center w-full h-[65px]">
                    <Input
                      size="sm"
                      value={stakeInput}
                      radius="sm"
                      onInput={handleStakeInput}
                      type="text"
                      placeholder="Enter Stake Amount"
                      classNames={{
                        input:
                          "bg-transparent placeholder:text-white/75 dark:placeholder:text-white/75 dark:text-white ",
                        inputWrapper:
                          "dark:bg-transparent dark:hover:bg-transparent focus-within:!bg-transparent border border-gray-800/50 focus-within:border-[#a664fe] rounded-r-none",
                        innerWrapper: "bg-transparent text-white",
                      }}
                      color={
                        parseFloat(stakeInput.toString()) < 40000 &&
                        parseFloat(stakeInput.toString()) > 0
                          ? "danger"
                          : "success"
                      }
                      errorMessage={
                        parseFloat(stakeInput.toString()) < 40000 &&
                        parseFloat(stakeInput.toString()) > 0
                          ? "Minimum stake amount 40K."
                          : ""
                      }
                      className="w-[98%] whitespace-nowrap absolute top-0 p-0 text-white"
                    />
                    <div className="flex items-center">
                      <Button
                        size="lg"
                        onPress={() => maxBTN()}
                        radius="sm"
                        className="bg-[#a664fe] rounded-l-none border-l border-gray-800/50 text-white absolute top-0 right-0">
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
