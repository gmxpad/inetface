import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionItem,
  Avatar,
  AvatarGroup,
  Button,
  CircularProgress,
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
  formatTime,
  formatTimestampGMT,
  getSigner,
  numberWithCommas,
} from "@/scripts/scripts";
import {
  GetContractAt,
  SKALE_LankyIllFunnyTestnet,
  fetchXPassDistributeContract,
} from "@/scripts/contracts";
import TwitterFollowButton from "@/providers/twitterFollowButton";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import WaitModal from "@/components/modals/waitModal";
import ErrorModal from "@/components/modals/errorModal";
import SuccessModal from "@/components/modals/successModal";

const XPass = () => {
  const XPassCard = {
    name: "XPass Card",
    image: "/NFT.gif",
    status: "INO",
    price: "Free Mint",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s",
    socials: [
      "https://twitter.com/gmxpad",
      "https://t.me/gamexpad",
      "https://docs.gamexpad.io/welcome/what-is-gamexpad",
      "https://github.com/gmxpad",
    ],
  };

  const [currentTimestamp, setCurrentTime] = useState(
    Math.floor(Date.now() / 1000)
  );

  const [isLoading, setLoading] = useState<boolean>(false);
  const [eventInfos, setEventInfos] = useState<any>();
  const [userEventIsClaim, setUserEventIsClaim] = useState<boolean>(false);

  const [waitModalOpen, setWaitModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [successModalOpenForClaim, setSuccessModalOpenForClaim] =
    useState<boolean>(false);

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

  const TelegramSVG = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 512 512">
        <g
          id="Group_295"
          data-name="Group 295"
          transform="translate(-18443 -2903)">
          <g id="telegram-svgrepo-com" transform="translate(18443 2903)">
            <rect
              id="Rectangle_52"
              data-name="Rectangle 52"
              width="512"
              height="512"
              rx="76.8"
              fill="none"
            />
            <path
              id="Path_407"
              data-name="Path 407"
              d="M199,404c-11,0-10-4-13-14L154,285,399,141"
              fill="#c8daea"
            />
            <path
              id="Path_408"
              data-name="Path 408"
              d="M199,404c7,0,11-4,16-8l45-43-56-34"
              fill="#a9c9dd"
            />
            <path
              id="Path_409"
              data-name="Path 409"
              d="M204,319l135,99c14,9,26,4,30-14l55-258c5-22-9-32-24-25L79,245c-21,8-21,21-4,26l83,26L348,176c9-5,17-3,11,4"
              fill="#f6fbfe"
            />
          </g>
        </g>
      </svg>
    );
  };

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const eventInfo = async () => {
    try {
      const contract = GetContractAt(
        fetchXPassDistributeContract.address,
        fetchXPassDistributeContract.abi,
        SKALE_LankyIllFunnyTestnet
      );
      // @ts-ignore
      const info = await contract.getEventInfo();
      setEventInfos(info);

      setLoading(true);
    } catch (error) {
      setLoading(true);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    eventInfo();
  }, [address, isConnected, chainId]);

  useEffect(() => {
    const userEventInfo = async () => {
      try {
        if (isConnected === true) {
          const contract = GetContractAt(
            fetchXPassDistributeContract.address,
            fetchXPassDistributeContract.abi,
            SKALE_LankyIllFunnyTestnet
          );
          // @ts-ignore
          const info = await contract.getUserCurrentEventInfo(address);
          setUserEventIsClaim(info);
        }
      } catch (error) {}
    };
    userEventInfo();
  }, [address, isConnected, chainId]);

  const [eventEndsTimer, setEventEndsTimer] = useState<string>();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (eventInfos && eventInfos[7] > currentTimestamp) {
      const remainingTime = Number(eventInfos[7]) - Number(currentTimestamp);
      setEventEndsTimer(formatTime(remainingTime));
    }
  }, [currentTimestamp, eventInfos]);

  const claimBTN = async () => {
    try {
      if (isConnected === true) {
        handleWaitModalOpen();
        const contract = GetContractAt(
          fetchXPassDistributeContract.address,
          fetchXPassDistributeContract.abi,
          SKALE_LankyIllFunnyTestnet
        );
        const signer = await getSigner(walletProvider);
        if (eventInfos[1] === false) {
          // @ts-ignore
          const tx = await contract.connect(signer).simpleClaim();
          await tx.wait();
          handleWaitModalClose();
          handleSuccessModalOpenForClaim();
        }
      }
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
      console.log(error);
    }
  };

  return (
    <>
      <WaitModal isOpen={waitModalOpen} onClose={handleWaitModalClose} />
      <ErrorModal isOpen={errorModalOpen} onClose={handleErrorModalClose} />
      <SuccessModal
        isOpen={successModalOpenForClaim}
        desc={"You have successfully claimed your XPass Card."}
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
                  src={XPassCard.image}
                  alt={XPassCard.name}
                  draggable={false}
                />
              </div>
              <div className="absolute z-10 sm:bottom-5 sm:left-5 bottom-16 left-[10%]  w-full flex justify-between   text-white">
                <div className="flex flex-col gap-2">
                  <p className=" text-3xl font-Orbitron md:text-5xl">
                    {XPassCard.name}
                  </p>
                  <div className="text-white sm:hidden md:hidden xl:flex w-[35%]">
                    {XPassCard.desc}
                  </div>
                  <Button
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
            <div className="text-3xl text-white">{XPassCard.name}</div>
            <div className="bg-dark-gray p-5 flex flex-col gap-5 rounded-lg">
              <div className="flex sm:flex-col-reverse sm:gap-10 md:gap-10 xl:gap-0 md:flex-col-reverse xl:flex-row justify-between">
                <div className="sm:w-full md:w-full xl:w-[60%] flex flex-col justify-center">
                  <Image
                    src={XPassCard.image}
                    className="w-full brightness-75"
                    alt="xpass"
                  />
                  <div className="flex sm:flex-col md:flex-col xl:flex-row text-white justify-between items-center mt-5">
                    <div>
                      <p className="text-2xl">Official Links</p>
                    </div>
                    <div className="flex gap-3 items-center">
                      {XPassCard.socials.map((item: string, index: number) => (
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
                                  : item.startsWith("https://github.com")
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
                                  : item.startsWith("https://docs")
                                  ? "/icons/socials/whitepaper.svg"
                                  : item.startsWith("https://github.com")
                                  ? "/icons/socials/github.svg"
                                  : ""
                              }
                              alt="socials"
                            />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 sm:gap-6 text-white mt-10 gap-5 whitespace-nowrap">
                    <div className="flex flex-col">
                      {eventInfos ? (
                        <>
                          <p className="text-2xl font-SpaceGro">
                            {formatTimestampGMT(Number(eventInfos[6]))}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-2xl font-SpaceGro">Loading...</p>
                        </>
                      )}

                      <p className="text-sm text-[#9d9d9d]">Event date (UTC)</p>
                    </div>
                    <div className="flex flex-col">
                      {eventInfos ? (
                        <>
                          <p className="text-2xl font-SpaceGro">
                            {numberWithCommas(Number(eventInfos[4]))}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-2xl font-SpaceGro">Loading...</p>
                        </>
                      )}
                      <p className="text-sm text-[#9d9d9d]">Total allocation</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-2xl font-SpaceGro">SKALE</p>
                      <p className="text-sm text-[#9d9d9d]">Network</p>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-2xl font-SpaceGro">-</p>
                      <p className="text-sm text-[#9d9d9d]">Currency</p>
                    </div>
                    <div className="flex flex-col">
                      {eventInfos ? (
                        <>
                          <p className="text-2xl font-SpaceGro">
                            {Number(
                              (Number(eventInfos[5]) / Number(eventInfos[4])) *
                                100
                            ).toFixed(2)}
                            %
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-2xl font-SpaceGro">Loading...</p>
                        </>
                      )}

                      <p className="text-sm text-[#9d9d9d]">Funded</p>
                    </div>
                    <div className="flex flex-col">
                      {eventInfos ? (
                        <>
                          <p className="text-2xl font-SpaceGro">
                            {eventInfos[3].toString()}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-2xl font-SpaceGro">Loading...</p>
                        </>
                      )}
                      <p className="text-sm text-[#9d9d9d]">Participants</p>
                    </div>
                  </div>
                </div>
                <div className="sm:w-full md:w-full xl:w-[37%] h-full border border-gray-800/50 rounded-lg flex flex-col justify-between  overflow-hidden">
                  <div>
                    <div className="flex justify-between p-5 text-white/75 text-xl font-sans border-b border-gray-800/50 bg-[#1d1d1d]">
                      <p>{XPassCard.status}</p>
                    </div>
                    <div>
                      <div className="flex flex-col p-3 gap-2">
                        <div className="flex justify-between w-full">
                          <p className=" text-3xl font-SpaceGro text-white">
                            {eventInfos ? (
                              <>
                                {numberWithCommas(Number(eventInfos[4]))} NFTs
                              </>
                            ) : (
                              <>Loading...</>
                            )}
                          </p>
                          <Image
                            width={35}
                            src={"/chains/skale.svg"}
                            alt="chain"
                          />
                        </div>
                        <div className="text-[#9d9d9d] text-xs">
                          <>
                            {eventInfos ? (
                              <>
                                {Number(
                                  (Number(eventInfos[5]) /
                                    Number(eventInfos[4])) *
                                    100
                                ).toFixed(2)}
                                % total goal of{" "}
                                {numberWithCommas(Number(eventInfos[4]))} NFTs
                              </>
                            ) : (
                              <>
                                <p className="font-SpaceGro">Loading...</p>
                              </>
                            )}
                          </>
                        </div>
                        <Progress
                          aria-label="Loading..."
                          value={
                            eventInfos
                              ? parseFloat(
                                  Number(
                                    (Number(eventInfos[5]) /
                                      Number(eventInfos[4])) *
                                      100
                                  ).toFixed(2)
                                )
                              : 0
                          }
                          color="secondary"
                          className="w-full"
                        />

                        <div className="flex justify-between items-center w-full text-white mt-1">
                          <div className="flex gap-2">
                            <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                              1
                            </div>
                            <div>
                              <p>Follow Twitter</p>
                              <p className="text-[10px] text-[#9d9d9d]">
                                $10.000 airdrop for our followers
                              </p>
                            </div>
                          </div>

                          <TwitterFollowButton />
                        </div>
                        <div className="flex justify-between items-center w-full text-white mt-1">
                          <div className="flex gap-2">
                            <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                              2
                            </div>
                            <div>
                              <p>Join Telegram Group</p>
                              <p className="text-[10px] text-[#9d9d9d]">
                                $10.000 airdrop for our members
                              </p>
                            </div>
                          </div>

                          <Button
                            as={Link}
                            isExternal={true}
                            href="https://t.me/gamexpad"
                            size="sm"
                            startContent={TelegramSVG()}
                            radius="full"
                            className="bg-black text-white px-[15px] font-semibold">
                            Join
                          </Button>
                        </div>

                        <div className="flex justify-between items-center w-full text-white mt-1">
                          <div className="flex gap-2">
                            <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                              3
                            </div>
                            {eventInfos && currentTimestamp > eventInfos[7] ? (
                              <>
                                <div>
                                  <p>Event complete</p>
                                  <p className="text-[10px] text-[#9d9d9d]">
                                    Claim XPass Card to participate big lottery
                                  </p>
                                </div>
                              </>
                            ) : eventInfos &&
                              currentTimestamp < eventInfos[7] &&
                              currentTimestamp > eventInfos[6] ? (
                              <>
                                <div>
                                  <p>Event Ends</p>
                                  <p className="text-[10px] text-[#9d9d9d]">
                                    Claim XPass Card to participate big lottery
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <p>Event Starts</p>
                                  <p className="text-[10px] text-[#9d9d9d]">
                                    Claim XPass Card to participate big lottery
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                          {eventInfos && currentTimestamp > eventInfos[7] ? (
                            <>
                              <Image
                                width={30}
                                src="/icons/success.svg"
                                alt="scucess"
                              />
                            </>
                          ) : eventInfos &&
                            currentTimestamp < eventInfos[7] &&
                            currentTimestamp > eventInfos[6] ? (
                            <>
                              <p>{eventEndsTimer}</p>
                            </>
                          ) : eventInfos && currentTimestamp < eventInfos[6] ? (
                            <>
                              <p>{formatTimestampGMT(Number(eventInfos[6]))}</p>
                            </>
                          ) : (
                            <>Loading...</>
                          )}
                        </div>

                        <div className="flex w-full justify-center mt-4">
                          <Button
                            isDisabled={
                              (isConnected && isConnected !== true) ||
                              userEventIsClaim === true
                            }
                            radius="sm"
                            onPress={() => claimBTN()}
                            className="bg-[#a664fe] text-white px-10">
                            {isConnected && isConnected !== true
                              ? "Please Connect"
                              : "Claim XPass Card"}
                          </Button>
                        </div>
                      </div>
                    </div>
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
export default XPass;
