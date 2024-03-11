import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionItem,
  Button,
  CircularProgress,
  Image,
  Input,
  Link,
  Progress,
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
  convertIpfsUrl,
  formatTime,
  getSigner,
} from "@/scripts/scripts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import {
  GetContractAt,
  SKALE_LankyIllFunnyTestnet,
  SkaleChaosTestnet,
  fetchDiamondContract,
  fetchUsdtTokenContract,
} from "@/scripts/contracts";
import ConnectButton from "@/providers/connectButton";
import WaitModal from "@/components/modals/waitModal";
import ErrorModal from "@/components/modals/errorModal";
import SuccessModal from "@/components/modals/successModal";
import ApproveModal from "@/components/modals/approveModal";

export { getStaticPaths, getStaticProps };

const Launchpad: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ ipo }: any) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [currentTimestamp, setCurrentTime] = useState<number>(
    Math.floor(Date.now() / 1000)
  );
  const [isLoading, setLoading] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<any>();
  const [isStaker, setIsStaker] = useState<boolean>(false);
  const [allowance, setAllowance] = useState<number>(0);
  const [allocation, setAllocation] = useState<number>(0);
  const [usdtBalance, setUsdtBalance] = useState<number>(0);

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (isConnected === true) {
          const contract: any = GetContractAt(
            fetchDiamondContract.address,
            fetchDiamondContract.abi,
            SKALE_LankyIllFunnyTestnet
          );

          const usdtContract: any = GetContractAt(
            fetchUsdtTokenContract.address,
            fetchUsdtTokenContract.abi,
            SKALE_LankyIllFunnyTestnet
          );

          const [info, stakerInfo, allowances, allocations, balances] =
            await Promise.all([
              contract.getIpoForUser(ipo[4], ipo.ipoDatas[1], address),
              contract.getUserInfo(address),
              usdtContract.allowance(address, fetchDiamondContract.address),
              contract.calculateAllocation(ipo[4], ipo.ipoDatas[1], address),
              usdtContract.balanceOf(address),
            ]);

          setIsStaker(stakerInfo[0]);
          setUserInfo(info);
          setAllowance(Number(allowances));
          setAllocation(Number(allocations));
          setUsdtBalance(Number(balances));
          setLoading(true);
        }
      } catch (error) {
        console.log(error);
        setLoading(true);
      } finally {
        setLoading(true);
      }
    };
    checkUser();
  }, [address, chainId, isConnected, ipo]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [registerStartTime, setRegisterStartTime] = useState<string>("");
  const [registerEndTime, setRegisterEndTime] = useState<string>("");
  const [guaranteedAllocationStartTime, setGuaranteedAllocationStartTime] =
    useState<string>("");
  const [guaranteedAllocationEndTime, setGuaranteedAllocationEndTime] =
    useState<string>("");

  useEffect(() => {
    if (ipo && ipo.ipoDatas[10] > currentTimestamp) {
      const remainingTime = ipo.ipoDatas[10] - currentTimestamp;
      setRegisterStartTime(formatTime(remainingTime));
    }

    if (ipo && ipo.ipoDatas[11] > currentTimestamp) {
      const remainingTime = ipo.ipoDatas[11] - currentTimestamp;
      setRegisterEndTime(formatTime(remainingTime));
    }

    if (ipo && ipo.ipoDatas[12] > currentTimestamp) {
      const remainingTime = ipo.ipoDatas[12] - currentTimestamp;
      setGuaranteedAllocationStartTime(formatTime(remainingTime));
    }

    if (ipo && ipo.ipoDatas[13] > currentTimestamp) {
      const remainingTime = ipo.ipoDatas[13] - currentTimestamp;
      setGuaranteedAllocationEndTime(formatTime(remainingTime));
    }
  }, [currentTimestamp, ipo]);

  const [waitModalOpen, setWaitModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [successModalOpenForRegister, setSuccessModalOpenForRegister] =
    useState<boolean>(false);
  const [successModalOpenForBuy, setSuccessModalOpenForBuy] =
    useState<boolean>(false);
  const [approveModalOpen, setApproveModalOpen] = useState<boolean>(false);
  const [depositModalOpen, setDepositModalOpen] = useState<boolean>(false);

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
  const handleSuccessModalOpenForRegister = () => {
    setSuccessModalOpenForRegister(true);
  };
  const handleSuccessModalOpenForBuy = () => {
    setSuccessModalOpenForBuy(true);
  };

  const handleApproveModalOpen = () => {
    setApproveModalOpen(true);
  };
  const handleApproveModalClose = () => {
    setApproveModalOpen(false);
  };

  const handleDepositModalOpen = () => {
    setDepositModalOpen(true);
  };
  const handleDepositModalClose = () => {
    setDepositModalOpen(false);
  };

  const [inputValue, setInputValue] = useState<string>("");
  const handleBuyInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.toString();

    if (/[^0-9]/.test(newValue)) {
      return;
    }
    setInputValue(newValue);
  };

  const registerBTN = async () => {
    try {
      if (isConnected === true) {
        handleWaitModalOpen();

        const signer = await getSigner(walletProvider);
        const contract = GetContractAt(
          fetchDiamondContract.address,
          fetchDiamondContract.abi,
          SkaleChaosTestnet
        );
        const ipoId = ipo[4];
        const round = ipo.ipoDatas[1];

        const tx = await contract
          ?.connect(signer)
          // @ts-ignore
          .register(ipoId, round);
        await tx.wait();

        handleWaitModalClose();
        handleSuccessModalOpenForRegister();
      }
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  const approveBTN = async () => {
    try {
      if (isConnected === true) {
        handleWaitModalOpen();
        const contract: any = GetContractAt(
          fetchUsdtTokenContract.address,
          fetchUsdtTokenContract.abi,
          SKALE_LankyIllFunnyTestnet
        );
        const signer = await getSigner(walletProvider);
        const tx = await contract
          .connect(signer)
          .approve(fetchDiamondContract.address, Number(inputValue) * 1e6);
        await tx.wait();
        handleWaitModalClose();
        handleApproveModalOpen();
      }
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  const buyBTN = async () => {
    try {
      if (isConnected === true) {
        handleApproveModalClose();
        handleWaitModalOpen();
        const contract: any = GetContractAt(
          fetchDiamondContract.address,
          fetchDiamondContract.abi,
          SKALE_LankyIllFunnyTestnet
        );
        const signer = await getSigner(walletProvider);
        const ipoId: number = ipo.ipoDatas[2];
        const round: number = ipo.ipoDatas[1];
        const amount = Number(inputValue) * 1e6;
        console.log(ipoId, round, amount);
        const tx = await contract.connect(signer).deposit(ipoId, round, amount);
        await tx.wait();

        handleWaitModalClose();
        handleSuccessModalOpenForBuy();
      }
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  const maxBTN = () => {
    try {
    } catch (error) {}
  };

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
      <WaitModal isOpen={waitModalOpen} onClose={handleWaitModalClose} />
      <ErrorModal isOpen={errorModalOpen} onClose={handleErrorModalClose} />
      <SuccessModal
        isOpen={successModalOpenForRegister}
        desc={"You have successfully registered."}
      />
      <SuccessModal
        isOpen={successModalOpenForBuy}
        desc={"You have successfully deposit."}
      />

      <ApproveModal
        isOpen={approveModalOpen}
        onClose={handleApproveModalClose}
        deposit={() => buyBTN()}
        desc={"You have successfully approved $GUSDT tokens."}
        desc2={"Please continue to deposit your $GUSDT tokens..."}
      />

      {isLoading === true ? (
        <div className="flex flex-col gap-10 h-full pb-24">
          <div className="w-screen flex  sm:h-[200px]  overflow-hidden ">
            <div className="relative w-full h-full">
              <div className="overflow-hidden sm:h-[250px] h-[400px]">
                <Image
                  radius="none"
                  className="w-screen z-0 brightness-75"
                  height={280}
                  src={convertIpfsUrl(ipo[3][4])}
                  alt={ipo[3][1]}
                  draggable={false}
                />
              </div>
              <div className="absolute z-10 sm:bottom-5 sm:left-5 bottom-16 left-[10%]  w-full flex justify-between   text-white">
                <div className="flex flex-col gap-2">
                  <div className="bg-white sm:hidden md:flex text-black flex items-center justify-center sm:px-5 py-1 font-Orbitron text-center md:max-w-[13%] rounded-md">
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
                  <Image
                    src={convertIpfsUrl(ipo[3][4])}
                    className="w-full brightness-75"
                    alt="ipo"
                  />
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
                                alt="socials"
                              />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-col text-white pt-12">
                    <div className="text-2xl font-SpaceGro flex whitespace-nowrap items-center">
                      {formatTimestampGMT(ipo.ipoDatas[10])}/
                      {formatTimestampGMT(ipo.ipoDatas[13])}
                    </div>
                    <p className="text-sm text-[#9d9d9d]">
                      Event date (UTC + 3)
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full sm:gap-6 text-white mt-10 gap-12 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-2xl font-SpaceGro">
                        {numberWithCommas(
                          Number(format6DecimalsAsEther(ipo.ipoDatas[4]))
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
                          (Number(ipo.ipoDatas[5]) / Number(ipo.ipoDatas[4])) *
                            100
                        ).toFixed(2)}
                        %
                      </p>
                      <p className="text-sm text-[#9d9d9d]">Funded</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-2xl font-SpaceGro">
                        {ipo.ipoDatas[3]}
                      </p>
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
                        title:
                          " text-white text-sm data-[open=true]:text-white",
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
                      <div>Round: #{ipo.ipoDatas[1]}</div>
                    </div>
                    <>
                      <div className="flex flex-col gap-2 p-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex w-full justify-between">
                            <p className=" text-3xl font-SpaceGro text-white">
                              {numberWithCommas(
                                Number(format6DecimalsAsEther(ipo.ipoDatas[4]))
                              )}{" "}
                              USDT
                            </p>
                            <Image
                              width={35}
                              src={"/chains/skale.svg"}
                              alt="chain"
                            />
                          </div>
                          <div className="text-[#9d9d9d] text-xs">
                            {ipo ? (
                              <>
                                {Number(
                                  (Number(ipo.ipoDatas[5]) /
                                    Number(ipo.ipoDatas[4])) *
                                    100
                                ).toFixed(2)}
                                %
                              </>
                            ) : (
                              <>Loading...</>
                            )}
                            {""} total goal of{" "}
                            {numberWithCommas(
                              Number(format6DecimalsAsEther(ipo.ipoDatas[4]))
                            )}{" "}
                            USDT
                          </div>
                          <Progress
                            aria-label="Loading..."
                            value={parseFloat(
                              Number(
                                (Number(ipo.ipoDatas[5]) /
                                  Number(ipo.ipoDatas[4])) *
                                  100
                              ).toFixed(2)
                            )}
                            color="secondary"
                            className="w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <div className="flex w-full justify-between">
                            <div className="flex gap-2 items-center text-white">
                              <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                                1
                              </div>
                              <p>KYC Verification</p>
                            </div>
                            <Image
                              width={30}
                              src="/icons/success.svg"
                              alt="success"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <div className="flex w-full justify-between">
                            <div className="flex gap-2 items-center text-white">
                              <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                                2
                              </div>
                              <p>Register for an allocation</p>
                            </div>
                            <>
                              {currentTimestamp < ipo.ipoDatas[10] ? (
                                // başlamamış
                                <div>
                                  <Image
                                    width={30}
                                    src="/icons/wait.svg"
                                    alt="wait"
                                  />
                                </div>
                              ) : isConnected === true ? (
                                // başlamış ve cüzdan bağlı
                                <>
                                  {userInfo &&
                                  userInfo[1] === false &&
                                  currentTimestamp < ipo.ipoDatas[11] ? (
                                    // bitmemiş ve register yapmamış
                                    <div>
                                      <Button
                                        onPress={() =>
                                          isStaker === false
                                            ? router.push("/stake")
                                            : registerBTN()
                                        }
                                        radius="sm"
                                        size="sm"
                                        className="bg-[#a664fe] text-white">
                                        {isStaker === false
                                          ? "Go Stake"
                                          : "Register"}
                                      </Button>
                                    </div>
                                  ) : userInfo && userInfo[1] === true ? (
                                    // register yapmış
                                    <div>
                                      <Image
                                        width={30}
                                        src="/icons/success.svg"
                                        alt="success"
                                      />
                                    </div>
                                  ) : userInfo &&
                                    userInfo[1] === false &&
                                    currentTimestamp > ipo.ipoDatas[11] ? (
                                    // bitmiş ve register yapmamış
                                    <div>
                                      <Image
                                        width={30}
                                        src="/icons/close.svg"
                                        alt="close"
                                      />
                                    </div>
                                  ) : (
                                    <>Loading...</>
                                  )}
                                </>
                              ) : (
                                // başlamış ve cüzdan bağlı değil
                                <>
                                  {currentTimestamp > ipo.ipoDatas[11] ? (
                                    <div>
                                      <Image
                                        width={30}
                                        src="/icons/success.svg"
                                        alt="success"
                                      />
                                    </div>
                                  ) : currentTimestamp < ipo.ipoDatas[11] ? (
                                    <>
                                      <ConnectButton />
                                    </>
                                  ) : (
                                    <>Loading...</>
                                  )}
                                </>
                              )}
                            </>
                          </div>
                          <div
                            className={classNames(
                              "text-[#9d9d9d] text-xs pl-10",
                              currentTimestamp > ipo.ipoDatas[10]
                                ? "hidden"
                                : "flex"
                            )}>
                            Starts in: {registerStartTime}
                          </div>
                          <div
                            className={classNames(
                              "text-[#9d9d9d] text-xs pl-10",
                              currentTimestamp > ipo.ipoDatas[10] &&
                                currentTimestamp < ipo.ipoDatas[11]
                                ? "flex"
                                : "hidden"
                            )}>
                            Ends in: {registerEndTime}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <div className="flex w-full justify-between">
                            <div className="flex gap-2 items-center text-white whitespace-nowrap ">
                              <div className="rounded-full h-8 w-8 border border-gray-800/50 flex items-center justify-center">
                                3
                              </div>
                              <p>Guaranteed allocation</p>
                            </div>
                            <>
                              {currentTimestamp < ipo.ipoDatas[12] ? (
                                // başlamamış
                                <div>
                                  <Image
                                    width={30}
                                    src="/icons/wait.svg"
                                    alt="wait"
                                  />
                                </div>
                              ) : isConnected === true ? (
                                // başlamış ve cüzdan bağlı
                                <>
                                  {userInfo &&
                                  userInfo[0] === false &&
                                  userInfo[1] === true &&
                                  currentTimestamp < ipo.ipoDatas[13] ? (
                                    // bitmemiş ve deposit yapmamış
                                    <div className="flex items-center justify-end">
                                      <Input
                                        height={"10px"}
                                        size="sm"
                                        value={inputValue}
                                        radius="sm"
                                        onInput={handleBuyInput}
                                        type="text"
                                        isDisabled={
                                          userInfo && userInfo[1] !== true
                                        }
                                        placeholder="Enter Amount"
                                        classNames={{
                                          base: "p-0",
                                          input:
                                            "bg-transparent text-white placeholder:text-[10px] placeholder:text-white/75 dark:placeholder:text-white/75 light:placeholder:text-white/75 light:text-white dark:text-white ",
                                          inputWrapper:
                                            "bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent light:bg-transparent light:hover:bg-transparent focus-within:!bg-transparent border h-8 border-gray-800/50 focus-within:border-[#a664fe] border-l-none rounded-r-none",
                                          innerWrapper:
                                            "bg-transparent text-white",
                                        }}
                                        color="success"
                                        className="whitespace-nowrap w-[45%] text-white z-10"
                                      />

                                      <Button
                                        size="sm"
                                        isDisabled={
                                          userInfo && userInfo[1] !== true
                                        }
                                        onClick={() =>
                                          allowance < Number(inputValue) * 1e6
                                            ? approveBTN()
                                            : buyBTN()
                                        }
                                        radius="sm"
                                        className="bg-[#a664fe] rounded-l-none border-l border-gray-800/50 text-white">
                                        {allowance < Number(inputValue) * 1e6
                                          ? "Approve"
                                          : "Buy"}
                                      </Button>
                                    </div>
                                  ) : userInfo && userInfo[0] === true ? (
                                    // deposit yapmış
                                    <div>
                                      <Image
                                        width={30}
                                        src="/icons/success.svg"
                                        alt="success"
                                      />
                                    </div>
                                  ) : userInfo &&
                                    userInfo[0] !== true &&
                                    currentTimestamp > ipo.ipoDatas[13] ? (
                                    // bitmiş ve deposit yapmamış
                                    <div>
                                      <Image
                                        width={30}
                                        src="/icons/close.svg"
                                        alt="close"
                                      />
                                    </div>
                                  ) : userInfo &&
                                    userInfo[1] === false &&
                                    currentTimestamp < ipo.ipoDatas[13] ? (
                                    <div>
                                      <Image
                                        width={30}
                                        src="/icons/close.svg"
                                        alt="close"
                                      />
                                    </div>
                                  ) : (
                                    <>Loading...</>
                                  )}
                                </>
                              ) : (
                                // başlamış ve cüzdan bağlı değil
                                <>
                                  {currentTimestamp > ipo.ipoDatas[13] ? (
                                    <div>
                                      <Image
                                        width={30}
                                        src="/icons/success.svg"
                                        alt="success"
                                      />
                                    </div>
                                  ) : currentTimestamp < ipo.ipoDatas[13] ? (
                                    <>
                                      <ConnectButton />
                                    </>
                                  ) : (
                                    <>Loading...</>
                                  )}
                                </>
                              )}
                            </>
                          </div>
                          <div>
                            <div
                              className={classNames(
                                "text-[#9d9d9d] text-xs pl-10",
                                currentTimestamp > ipo.ipoDatas[11] &&
                                  currentTimestamp < ipo.ipoDatas[12]
                                  ? "flex"
                                  : "hidden"
                              )}>
                              Starts in: {guaranteedAllocationStartTime}
                            </div>
                            <div
                              className={classNames(
                                "text-[#9d9d9d] text-xs pl-10",
                                currentTimestamp > ipo.ipoDatas[12] &&
                                  currentTimestamp < ipo.ipoDatas[13]
                                  ? "flex"
                                  : "hidden"
                              )}>
                              Ends in: {guaranteedAllocationEndTime}
                            </div>
                          </div>
                          <>
                            {isConnected === true && userInfo ? (
                              <>
                                {currentTimestamp < ipo.ipoDatas[12] ? (
                                  <></>
                                ) : currentTimestamp > ipo.ipoDatas[12] &&
                                  currentTimestamp < ipo.ipoDatas[13] &&
                                  userInfo[1] === true &&
                                  userInfo[0] === false ? (
                                  <div className="text-[#9d9d9d] text-xs pl-10">
                                    Your Max Allocation:{" "}
                                    <button className="text-white border-b border-white">
                                      ${format6DecimalsAsEther(allocation)}
                                    </button>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <div className="flex w-full justify-between">
                            <div className="flex gap-2 items-center text-white">
                              <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                                4
                              </div>
                              <p>Event Complate</p>
                            </div>
                            <Image
                              width={30}
                              src={
                                currentTimestamp > ipo.ipoDatas[13]
                                  ? "/icons/success.svg"
                                  : "/icons/wait.svg"
                              }
                              alt="success"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-screen h-screen">
          <CircularProgress color="secondary" aria-label="Loading..." />
        </div>
      )}
    </>
  );
};
export default Launchpad;
