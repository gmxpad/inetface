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
  ScrollShadow,
} from "@nextui-org/react";
import classNames from "classnames";
import { ChevronDown } from "@/components/icons/Icons";
import useWindowDimensions from "@/scripts/useWindowDimensions";
import { formatEther, parseEther } from "viem";
import { selectConnect, selectUserAddress } from "@/store/slices/walletSlice";
import { useSelector } from "react-redux";
import {
  GetContract,
  fetchDiamondContract,
  fetchGMXTokenContract,
} from "@/scripts/contracts";
import {
  AllowanceCheck,
  CalculateScore,
  GetBalance,
  GetStakePool,
  GetStaker,
  calculateRewards,
  getSigner,
  getStakeList,
} from "@/scripts/scripts";
import { usePublicClient } from "wagmi";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
import WaitModal from "@/components/modals/waitModal";
import ErrorModal from "@/components/modals/errorModal";
import SuccessModal from "@/components/modals/successModal";
import ApproveModal from "@/components/modals/approveModal";

interface StakerInterface {
  staker: boolean;
  totalStakedAmount: number;
  totalScore: number;
  earnedToDateGMX: number;
  earnedToDateSGMX: number;
}
interface RewardsInterface {
  rewardGMXP: string;
  rewardSGMXP: string;
}
interface StakeListInterface {
  isRequest: boolean;
  amount: string;
  multipler: number;
  score: number;
  indexID: number;
  remainingTime: string;
  stakeEndTime: number;
  requestEndTime: number;
}
export default function Stake() {
  const { windowWidth } = useWindowDimensions();
  const [isLoad, setLoad] = useState<boolean>(false);
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

    // Harf veya boşluk karakteri varsa işlem yapma
    if (/[^0-9]/.test(newValue)) {
      return;
    }

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
      // Hata durumlarına göre işlemler
    } finally {
      // Son işlemler
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

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [gmxBalance, setGmxBalance] = useState<string>("0.0");
  const [gmxAllowanceForUser, setGmxAllowanceForUser] = useState<string>("0.0");

  const [stakerInfo, setStakerInfo] = useState<StakerInterface>({
    staker: false,
    totalStakedAmount: 0,
    totalScore: 0,
    earnedToDateGMX: 0,
    earnedToDateSGMX: 0,
  });
  const [userStakeData, setUserStakeData] = useState<StakeListInterface[]>([]);
  const [rewards, setRewards] = useState<RewardsInterface>({
    rewardGMXP: "0.0",
    rewardSGMXP: "0.0",
  });
  const rewardsCal = async () => {
    try {
      const userRewards: any = await calculateRewards(address);
      setRewards(userRewards);
    } catch (error) {}
  };
  const allowanceCheckForUser = async () => {
    try {
      const allowance: any = await AllowanceCheck(
        address,
        fetchGMXTokenContract.address
      );
      setGmxAllowanceForUser(allowance);
    } catch (error) {}
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        setLoad(true);

        const [balanceGMX, stakeData, stakerInfo, rewards] = await Promise.all([
          GetBalance(address, fetchGMXTokenContract.address),
          getStakeList(address),
          GetStaker(address),
          calculateRewards(address),
          allowanceCheckForUser(),
        ]);
        if (rewards !== undefined) {
          // @ts-ignore
          setRewards(rewards);
        }
        if (stakeData !== undefined) {
          setUserStakeData(stakeData);
        }
        if (stakerInfo !== undefined) {
          setStakerInfo(stakerInfo);
        } else {
          setStakerInfo({
            staker: false,
            totalStakedAmount: 0,
            totalScore: 0,
            earnedToDateGMX: 0,
            earnedToDateSGMX: 0,
          });
        }
        if (balanceGMX !== undefined) {
          setGmxBalance(Number(formatEther(balanceGMX)).toFixed(1));
        }
        setLoad(false);
      } catch (error) {
        setLoad(false);
      } finally {
        setLoad(false);
      }
    };

    checkUser();
  }, [address, isConnected, chainId]);

  const [loadingRewards, setLoadingRewards] = useState<boolean>(false);
  useEffect(() => {
    const calReward = async () => {
      try {
        if (stakerInfo.staker === true) {
          setLoadingRewards(true);
          await rewardsCal();
        }
      } catch (error) {
      } finally {
        setLoadingRewards(false);
      }
    };
    calReward();
    if (stakerInfo.staker === true) {
      const a = setInterval(() => {
        calReward();
      }, 15000);
      return () => {
        clearInterval(a);
      };
    }
  }, [address, isConnected, chainId]);

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

  const [waitModalOpen, setWaitModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [successModalOpenForClaim, setSuccessModalOpenForClaim] =
    useState<boolean>(false);
  const [successModalOpenForWithdraw, setSuccessModalOpenForWithdraw] =
    useState<boolean>(false);
  const [
    successModalOpenForWithdrawRequest,
    setSuccessModalOpenForWithdrawRequest,
  ] = useState<boolean>(false);
  const [successModalOpenForStake, setSuccessModalOpenForStake] =
    useState<boolean>(false);
  const [approveModalOpen, setApproveModalOpen] = useState<boolean>(false);

  const handleWaitModalOpen = () => {
    setWaitModalOpen(true);
  };
  const handleWaitModalClose = () => {
    setWaitModalOpen(false);
  };

  const handleErrorModalOpen = () => {
    setErrorModalOpen(true);
  };
  const handleErrorModalClose = () => {
    setErrorModalOpen(false);
  };
  const handleSuccessModalOpenForClaim = () => {
    setSuccessModalOpenForClaim(true);
  };
  const handleSuccessModalOpenForWithdraw = () => {
    setSuccessModalOpenForWithdraw(true);
  };
  const handleSuccessModalOpenForWithdrawRequest = () => {
    setSuccessModalOpenForWithdrawRequest(true);
  };
  const handleSuccessModalOpenForStake = () => {
    setSuccessModalOpenForStake(true);
  };
  const handleApproveModalOpen = () => {
    setApproveModalOpen(true);
  };
  const handleApproveModalClose = () => {
    setApproveModalOpen(false);
  };

  const approveBTN = async () => {
    try {
      handleWaitModalOpen();
      const signer = await getSigner(walletProvider);
      const contract = GetContract(fetchGMXTokenContract.address);
      const tx = await contract
        ?.connect(signer)
        // @ts-ignore
        .approve(fetchDiamondContract.address, parseEther(stakeInput));
      await tx.wait();
      handleWaitModalClose();
      handleApproveModalOpen();
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  const stakeBTN = async () => {
    try {
      handleApproveModalClose();
      handleWaitModalOpen();
      const signer = await getSigner(walletProvider);
      const contract = GetContract(fetchDiamondContract.address);
      let selectTime =
        Number(selectedDays) === 31 ? 300 : Number(selectedDays * 86400);

      const tx = await contract
        ?.connect(signer)
        // @ts-ignore
        .stake(parseEther(stakeInput.toString()), selectTime);
      await tx.wait();
      handleWaitModalClose();
      handleSuccessModalOpenForStake();
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  const claimBTN = async () => {
    if (isConnected === true) {
      try {
        handleWaitModalOpen();
        const signer = await getSigner(walletProvider);
        const contract = GetContract(fetchDiamondContract.address);
        const tx = await contract
          ?.connect(signer)
          // @ts-ignore
          .claimRewards();
        await tx.wait();
        handleWaitModalClose();
        handleSuccessModalOpenForClaim();
      } catch (error) {
        handleWaitModalClose();
        handleErrorModalOpen();
      }
    }
  };

  const withdrawRequestBTN = async (index: number) => {
    if (isConnected === true) {
      try {
        handleWaitModalOpen();
        const signer = await getSigner(walletProvider);
        const contract = GetContract(fetchDiamondContract.address);
        const tx = await contract
          ?.connect(signer)
          // @ts-ignore
          .withdrawRequest(index);
        await tx.wait();
        handleWaitModalClose();
        handleSuccessModalOpenForWithdrawRequest();
      } catch (error) {
        handleWaitModalClose();
        handleErrorModalOpen();
      }
    }
  };

  const withdrawBTN = async (index: number) => {
    if (isConnected === true) {
      try {
        handleWaitModalOpen();
        const signer = await getSigner(walletProvider);
        const contract = GetContract(fetchDiamondContract.address);
        const tx = await contract
          ?.connect(signer)
          // @ts-ignore
          .withdraw(index);
        handleWaitModalClose();
        handleSuccessModalOpenForWithdraw();
        await tx.wait();
      } catch (error) {
        handleWaitModalClose();
        handleErrorModalOpen();
      }
    }
  };

  return (
    <>
      <WaitModal isOpen={waitModalOpen} onClose={handleWaitModalClose} />
      <ErrorModal isOpen={errorModalOpen} onClose={handleErrorModalClose} />
      <SuccessModal
        isOpen={successModalOpenForClaim}
        desc={"You have successfully claimed your tokens."}
      />
      <SuccessModal
        isOpen={successModalOpenForStake}
        desc={"You have successfully staked your $GMXP tokens."}
      />
      <SuccessModal
        isOpen={successModalOpenForWithdraw}
        desc={"You have successfully withdraw your $GMXP tokens."}
      />
      <SuccessModal
        isOpen={successModalOpenForWithdrawRequest}
        desc={"You have successfully unstaked your $GMXP tokens."}
      />
      <ApproveModal
        isOpen={approveModalOpen}
        onClose={handleApproveModalClose}
        deposit={() => stakeBTN()}
        desc={"You have successfully approved $GMXP tokens."}
        desc2={"Please continue to stake your $GMXP tokens..."}
      />

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

          <div className="sm:w-full md:w-full xl:w-[49%] xl:min-h-[670px] bg-dark-gray rounded-lg flex flex-col z-10 sm:mt-12 md:mt-12 xl:mt-0  xl:scale-95 xl:-mr-5">
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
                <span className="text-[#9d9d9d]">APR:</span> -%
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
                      5 Min
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
                            selectedValue === "5 Min"
                              ? "text-white"
                              : "text-white/50"
                          )}
                          key="5_min">
                          {`5 Min (1x)`}
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
                    <div className="absolute xl:hidden -top-4 z-10 right-2 bg-black border border-white rounded-full w-7 h-7 text-xs flex items-center justify-center">
                      {selectedMultipler}x
                    </div>
                    <div className="absolute sm:hidden md:hidden xl:flex -top-4 z-10 right-2 bg-black border border-white rounded-full w-7 h-7 text-xs flex items-center justify-center">
                      {selectedMultipler > 3 ? `${selectedMultipler}x` : ""}
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
                  <div className="text-white">{`${stakerInfo.totalStakedAmount} $GMXP`}</div>
                </div>
                <div className="flex justify-between text-[#9d9d9d] sm:text-sm md:text-sm xl:text-base">
                  <p>Total Score</p>
                  <div className="text-white">{`${stakerInfo.totalScore}x`}</div>
                </div>
                <div className="flex justify-between text-[#9d9d9d] sm:text-sm md:text-sm xl:text-base">
                  <p>Earned to Date</p>
                  <div className="flex items-center gap-2 sm:text-sm md:text-sm xl:text-base">
                    <div className="text-white">{`${stakerInfo.earnedToDateGMX} $GMXP`}</div>
                    -
                    <div className="text-white">{`${stakerInfo.earnedToDateSGMX} $SGMXP`}</div>
                  </div>
                </div>
                <div className="flex sm:flex-col sm:gap-2 md:flex-col md:gap-2 xl:flex-row xl:gap-0 items-center md:justify-between w-full text-white border border-gray-800/50 rounded-lg p-2  sm:text-sm md:text-base">
                  <p className="text-[#9d9d9d]">Claimable Rewards:</p>
                  <div className="flex gap-2">
                    <div
                      className={classNames(
                        loadingRewards === true
                          ? "text-green-550"
                          : "text-white"
                      )}>{`${rewards.rewardGMXP} $GMXP`}</div>
                    -
                    <div
                      className={classNames(
                        loadingRewards === true
                          ? "text-green-550"
                          : "text-white"
                      )}>{`${rewards.rewardSGMXP} $SGMXP`}</div>
                  </div>

                  <Button
                    isDisabled={!isConnected}
                    onClick={() => claimBTN()}
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
                          "bg-transparent text-white placeholder:text-white/75 dark:placeholder:text-white/75 light:placeholder:text-white/75 light:text-white dark:text-white ",
                        inputWrapper:
                          "bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent light:bg-transparent light:hover:bg-transparent focus-within:!bg-transparent border border-gray-800/50 focus-within:border-[#a664fe] rounded-r-none",
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
                      className="w-[98%] xl:w-[77%] 2xl:w-[82%] whitespace-nowrap absolute top-0 p-0 text-white"
                    />
                    <div className="flex items-center">
                      <Button
                        size="lg"
                        isDisabled={!isConnected}
                        onPress={() => maxBTN()}
                        radius="sm"
                        className="bg-[#a664fe] rounded-l-none border-l border-gray-800/50 text-white absolute top-0 z-10 right-0">
                        MAX
                      </Button>
                    </div>
                  </div>
                  <Button
                    isDisabled={!isConnected}
                    onPress={() =>
                      Number(gmxAllowanceForUser) >=
                      Number(parseEther(stakeInput))
                        ? stakeBTN()
                        : approveBTN()
                    }
                    radius="sm"
                    className="bg-[#a664fe] text-white text-lg">
                    {Number(gmxAllowanceForUser) >=
                    Number(parseEther(stakeInput))
                      ? "Stake"
                      : "Approve"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col xl:justify-between gap-5 p-5 h-full">
                <ScrollShadow className="w-full xl:h-[560px] flex flex-col gap-5">
                  {userStakeData.map(
                    (item: StakeListInterface, index: number) => (
                      <div key={"positions_" + index.toString()}>
                        <div className="rounded-lg border border-gray-800/50 p-3 flex whitespace-nowrap sm:flex-col md:flex-col xl:flex-row sm:gap-2 md:gap-2 xl:gap-0 justify-between">
                          <div className="flex items-center gap-1 w-[15%]  text-white">
                            <Image width={20} src="/logos/gmx-logo.svg" />
                            {item.amount}
                          </div>

                          <div className="flex items-center gap-1 text-white w-[15%] ">
                            <p className="text-[#9d9d9d]">Score:</p>
                            {item.score}
                          </div>
                          <div className="flex items-center gap-1 text-white w-[35%] ">
                            <p className="text-[#9d9d9d]">Release in:</p>
                            {item.remainingTime}
                          </div>
                          {Number(item.stakeEndTime) > 0 && (
                            <Button
                              radius="sm"
                              disabled
                              className="bg-transparent border border-gray-800/50 text-white">
                              Locked
                            </Button>
                          )}
                          {Number(item.stakeEndTime) === 0 &&
                            item.isRequest === false && (
                              <Button
                                radius="sm"
                                onClick={() =>
                                  withdrawRequestBTN(Number(item.indexID))
                                }
                                className="bg-transparent border border-gray-800/50 text-white">
                                Unstake
                              </Button>
                            )}
                          {Number(item.requestEndTime) > 0 &&
                            item.isRequest === true && (
                              <Button
                                radius="sm"
                                disabled
                                className="bg-transparent border border-gray-800/50 text-white">
                                Withdraw
                              </Button>
                            )}
                          {Number(item.requestEndTime) === 0 &&
                            item.isRequest === true && (
                              <Button
                                radius="sm"
                                onClick={() =>
                                  withdrawBTN(Number(item.indexID))
                                }
                                className="bg-transparent border border-gray-800/50 text-white">
                                Withdraw
                              </Button>
                            )}
                        </div>
                      </div>
                    )
                  )}
                </ScrollShadow>
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
