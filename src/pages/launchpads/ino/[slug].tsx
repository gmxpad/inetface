import React, { useEffect, useState } from "react";
import WhiteList from "@/scripts/WhiteList.json";
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
import {
  getStaticProps,
  getStaticPaths,
} from "@/framework/rest/inoLaunchpad.ssr";
import { NextPageWithLayout } from "@/types";
import { InferGetStaticPropsType } from "next";
import classNames from "classnames";
import {
  formatTimestampGMT,
  getImageChainImage,
  getSigner,
  numberWithCommas,
} from "@/scripts/scripts";
import { formatEther } from "viem";
import { GetContract, fetchDiamondContract } from "@/scripts/contracts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import WaitModal from "@/components/modals/waitModal";
import ErrorModal from "@/components/modals/errorModal";
import SuccessModal from "@/components/modals/successModal";
export { getStaticPaths, getStaticProps };

const Launchpad: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ launch }: any) => {
  const currentTime: number = Math.floor(Date.now() / 1000);

  const FAQ_ITEMS = [
    {
      id: 0,
      name: "Introduction",
      desx: "GameXPad is introducing an exclusive opportunity for NFT membership card holders to gain early access to our Launchpad projects through whitelist rights. This initiative enables our community members to participate in IDOs (Initial DEX Offerings) and INOs (Initial NFT Offerings) ahead of the general public, providing a significant advantage in accessing groundbreaking gaming projects and unique NFTs.",
    },
    {
      id: 1,
      name: "Timeline",
      desx: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae necessitatibus iure vero, autem, dolor natus tempora cupiditate reiciendis nostrum pariatur consectetur at dicta accusantium nesciunt.",
    },
  ];

  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const [waitModalOpen, setWaitModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

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
  const handleSuccessModalOpen = () => {
    setSuccessModalOpen(true);
  };

  const [userProofs, setUserProofs] = useState<any>();

  const loadData = async () => {
    if (isConnected === true) {
      // @ts-ignore
      const myProofs = WhiteList.claims[address.toString()];
      setUserProofs(myProofs);
    }
  };
  const [vestingParams, setVestingParams] = useState<any>();
  const vestingData = async () => {
    try {
      const vestingContract: `0x${string}` = launch[33];
      const contract = await GetContract(vestingContract);
      setVestingParams(await contract.getVesting());
    } catch (error) {}
  };

  useEffect(() => {
    vestingData();
    loadData();
  }, [isConnected, address, chainId]);

  const claim = async () => {
    try {
      handleWaitModalOpen();
      const contract = GetContract(launch[33]);
      const signer = await getSigner(walletProvider);
      const tx = await contract
        ?.connect(signer)
        // @ts-ignore
        .claim(userProofs?.index, userProofs?.amount, userProofs?.proof);

      await tx.wait();

      handleWaitModalClose();
      handleSuccessModalOpen();
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  return (
    <>
      <WaitModal isOpen={waitModalOpen} onClose={handleWaitModalClose} />
      <ErrorModal isOpen={errorModalOpen} onClose={handleErrorModalClose} />
      <SuccessModal
        isOpen={successModalOpen}
        desc={"You have successfully claimed your NFTs."}
      />

      <div className="flex flex-col gap-10 h-full pb-24">
        <div className="w-screen flex  sm:h-[250px]  overflow-hidden ">
          <div className="relative w-full h-full">
            <div className="absolute h-full left-0 w-[10%] bg-gradient-to-r from-dark  via-dark/50 to-dark/0 z-10"></div>
            <div className="absolute h-full right-0 w-[10%] bg-gradient-to-l from-dark  via-dark/50 to-dark/0 z-10"></div>
            <div className="absolute h-[5%] bottom-0 w-full bg-gradient-to-t from-dark  via-dark/50 to-dark/0 z-10"></div>
            <div className="absolute h-[5%] top-0 w-full  bg-gradient-to-b from-dark  via-dark/50 to-dark/0 z-10"></div>
            <div className="overflow-hidden sm:h-[250px] h-[400px]">
              <Image
                className="w-screen z-0 brightness-75"
                height={280}
                src={launch[7][9]}
                alt={launch[7][1]}
                draggable={false}
              />
            </div>
            <div className="absolute z-10 sm:bottom-16 sm:left-5 bottom-16 left-[10%]  w-full flex justify-between   text-white">
              <div className="flex flex-col gap-2">
                <p className=" text-4xl font-Orbitron sm:text-3xl md:text-5xl">
                  {launch[7][1]}
                </p>
                <div className="text-white sm:hidden md:hidden xl:flex w-[35%]">
                  {launch[7][6]}
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
          <div className="text-3xl text-white">{launch[7][1]}</div>
          <div className="bg-dark-gray p-5 flex flex-col gap-5 rounded-lg">
            <div className="flex sm:flex-col-reverse md:flex-col-reverse xl:flex-row sm:gap-10 md:gap-10 xl:gap-0 justify-between">
              <div className="sm:w-full md:w-full xl:w-[60%] flex flex-col justify-center">
                <Image src={launch[7][9]} className="w-full brightness-75" />
                <div className="flex sm:flex-col md:flex-col xl:flex-row text-white justify-between items-center mt-5">
                  <div>
                    <p className="text-2xl">Official Links</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    {launch[7][12]
                      .filter((item: string) => item !== "")
                      .map((item: string, index: number) => (
                        <div
                          key={"ava_s_launch_" + index.toString()}
                          className="flex items-center">
                          <Button
                            as={Link}
                            href={item}
                            isIconOnly
                            isExternal={true}
                            className="bg-transparent flex">
                            <Image
                              width={
                                item.startsWith("https://medium.com")
                                  ? 35
                                  : item.startsWith("https://docs")
                                  ? 40
                                  : item.startsWith("https://t.me")
                                  ? 30
                                  : item.startsWith("https://twitter.com")
                                  ? 30
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
                                  : item.startsWith("https://medium.com")
                                  ? "/icons/socials/medium.svg"
                                  : item.startsWith("https://docs")
                                  ? "/icons/socials/whitepaper.svg"
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
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 sm:gap-6 text-white mt-10 gap-12 whitespace-nowrap">
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">
                      {formatTimestampGMT(launch[22])}
                    </p>
                    <p className="text-sm text-[#9d9d9d]">Event Date</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">
                      {launch[9] === 0
                        ? "IGO"
                        : launch[10] === 1
                        ? "INO"
                        : "IDO"}
                    </p>
                    <p className="text-sm text-[#9d9d9d]">Event Type</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-SpaceGro">
                      {launch[14] === 0
                        ? "FREE"
                        : `${Number(formatEther(launch[14])).toFixed(1)} $GMXP`}
                    </p>
                    <p className="text-sm text-[#9d9d9d]">Event Price</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-2xl font-SpaceGro">
                      {numberWithCommas(launch[16])} NFTs
                    </div>
                    <p className="text-sm text-[#9d9d9d]">Total Sales</p>
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
                    <p className="text-2xl font-SpaceGro">
                      {launch[10] === 0
                        ? "GIVEAWAY"
                        : launch[10] === 1
                        ? "PUBLIC"
                        : launch[10] === 2
                        ? "PRIVATE"
                        : "STRATEGIC"}
                    </p>
                    <p className="text-sm text-[#9d9d9d]">Type</p>
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
                  <div className="p-5 text-white/75 text-xl font-sans border-b border-gray-800/50 bg-[#1d1d1d]">
                    <p>INO</p>
                  </div>
                  <div>
                    <div className="flex flex-col p-3 gap-2">
                      <div className="flex justify-between w-full">
                        <p className=" text-3xl font-SpaceGro text-white">
                          {launch[7][1]}
                        </p>
                        <Image
                          width={35}
                          src={getImageChainImage(launch[30][0])}
                        />
                      </div>
                      <div className="text-[#9d9d9d] text-xs">
                        {vestingParams ? (
                          <>
                            {numberWithCommas(Number(vestingParams[15]))} of
                            total goal of{" "}
                            {numberWithCommas(Number(vestingParams[14]))}
                            NFTs
                          </>
                        ) : (
                          <>0 of total goal of 0 NFTs</>
                        )}
                      </div>
                      <Progress
                        aria-label="Loading..."
                        value={(launch[17] / launch[16]) * 100}
                        color="secondary"
                        className="w-full"
                      />
                      <div>
                        <div className="flex justify-between items-center w-full text-white mt-1">
                          <div className="flex gap-2 items-center">
                            <div className="rounded-full h-8 w-8 border border-gray-800/50  flex items-center justify-center">
                              1
                            </div>
                            {launch[29] < currentTime ? (
                              <div>Event Completed</div>
                            ) : (
                              <div>Event will end:</div>
                            )}
                          </div>

                          {launch[29] < currentTime ? (
                            <Image width={30} src="/icons/success.svg" />
                          ) : (
                            <div>{formatTimestampGMT(launch[29])}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-full flex p-3 justify-center">
                    <div className=" w-1/2 flex flex-col">
                      <p className="text-3xl font-SpaceGro text-white">
                        {vestingParams ? (
                          <>
                            {Number(
                              (Number(vestingParams[15]) /
                                Number(vestingParams[14])) *
                                100
                            ).toFixed(2)}
                            %
                          </>
                        ) : (
                          <>Loading...</>
                        )}
                      </p>
                      <p className="text-[#9d9d9d]">Sold</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-3xl font-SpaceGro text-white">
                        {numberWithCommas(launch[13])}
                      </p>
                      <p className="text-[#9d9d9d]">Participants</p>
                    </div>
                  </div>
                  <div className="p-3 w-full flex justify-center py-8">
                    <Button
                      isDisabled={
                        Number(currentTime) < launch[28] ||
                        currentTime > launch[29]
                      }
                      onClick={() => claim()}
                      radius="sm"
                      className="bg-[#a664fe] text-white px-16">
                      Claim
                    </Button>
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
