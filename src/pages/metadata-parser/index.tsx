import React, { useEffect, useState } from "react";
import { Button, Input, Image } from "@nextui-org/react";

import {
  GetContractAt,
  SkaleChaosTestnet,
  fetchXGameCardContract,
} from "@/scripts/contracts";

const MetadataParser = () => {
  const [URI, setURI] = useState<any>();
  const [inputValueForTokenAddress, setInputValueForTokenAddress] = useState<
    `0x${string}` | string
  >("");
  const [inputValueForTokenID, setInputValueForTokenID] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getMetadataBTN = async () => {
    const contract = GetContractAt(
      inputValueForTokenAddress,
      fetchXGameCardContract.abi,
      SkaleChaosTestnet
    );
    try {
      setErrorMessage("");

      const getTokenURI = await contract?.tokenURI(
        BigInt(inputValueForTokenID.toString())
      );
      const metadataResponse = await fetch(getTokenURI);
      const metadata = await metadataResponse.json();
      setURI(metadata);
    } catch (error) {
      try {
        const getTokenURI = await contract?.uri(
          BigInt(inputValueForTokenID.toString())
        );
        const metadataResponse = await fetch(getTokenURI);
        const metadata = await metadataResponse.json();
        setURI(metadata);
      } catch (error) {
        setErrorMessage("NFT Not Found");
      }
    }
  };

  const convertIpfsUrl = (ipfsURL: string) => {
    const ipfsPrefix = "ipfs://";

    if (ipfsURL && ipfsURL.startsWith(ipfsPrefix)) {
      const convertedUrl = `https://ipfs.infura.io/ipfs/${
        ipfsURL.split("://")[1]
      }`;
      return convertedUrl;
    }

    return ipfsURL;
  };

  const handleTokenAddressInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value.toString();
    setInputValueForTokenAddress(newValue);
  };

  const handleTokenIdInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value.toString();
    setInputValueForTokenID(newValue);
  };

  return (
    <>
      <div className="flex flex-col w-full justify-center gap-5 items-center sm:px-[5%] xl:px-[10%] py-12">
        <div className="flex sm:flex-col md:flex-col xl:flex-row xl:justify-between w-full xl:w-2/3 text-white">
          <div className="flex items-center justify-center text-2xl font-Orbitron">
            <p>NFT Metadata Parser</p>
          </div>
          <div className="flex items-center gap-2 sm:justify-center  md:justify-center xl:justify-start">
            <p className="text-[#9d9d9d] font-semibold">AVAILABLE ON:</p>
            <Image
              width={190}
              className="sm:w-[100px] md:w-[100px] xl:w-[190px]"
              src="/chains/skale-name.svg"
              alt="chain"
            />
          </div>
        </div>
        <div className="xl:w-2/3 bg-dark-gray rounded-md rounded-b-none flex sm:flex-col md:flex-col xl:flex-row p-5 sm:gap-2 md:gap-2 xl:gap-0 justify-between">
          <div className="xl:w-[79%] flex">
            <Input
              size="sm"
              value={inputValueForTokenAddress}
              radius="sm"
              onInput={handleTokenAddressInput}
              type="text"
              placeholder="NFT Contract Address"
              classNames={{
                input:
                  "bg-transparent text-white placeholder:text-white/75 dark:placeholder:text-white/75 light:placeholder:text-white/75 light:text-white dark:text-white ",
                inputWrapper:
                  "bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent light:bg-transparent light:hover:bg-transparent focus-within:!bg-transparent border border-gray-800/50 focus-within:border-[#a664fe] rounded-r-none",
                innerWrapper: "bg-transparent text-white",
              }}
              color={
                inputValueForTokenAddress &&
                inputValueForTokenAddress.length < 42
                  ? "danger"
                  : "success"
              }
              errorMessage={
                inputValueForTokenAddress &&
                inputValueForTokenAddress.length < 42
                  ? "Invalid Address"
                  : ""
              }
              className="w-2/3  whitespace-nowrap text-white"
            />
            <Input
              size="sm"
              value={inputValueForTokenID}
              radius="sm"
              onInput={handleTokenIdInput}
              type="text"
              placeholder="NFT ID"
              classNames={{
                input:
                  "bg-transparent text-white placeholder:text-white/75 dark:placeholder:text-white/75 light:placeholder:text-white/75 light:text-white dark:text-white ",
                inputWrapper:
                  "bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent light:bg-transparent light:hover:bg-transparent focus-within:!bg-transparent border border-gray-800/50 focus-within:border-[#a664fe] rounded-l-none",
                innerWrapper: "bg-transparent text-white",
              }}
              color={
                inputValueForTokenID && Number(inputValueForTokenID) < 1
                  ? "danger"
                  : "success"
              }
              errorMessage={
                inputValueForTokenID && Number(inputValueForTokenID) < 1
                  ? "Invalid ID"
                  : ""
              }
              className="w-1/3 whitespace-nowrap text-white"
            />
          </div>
          <Button
            size="lg"
            radius="sm"
            isDisabled={
              inputValueForTokenAddress.length < 42 ||
              Number(inputValueForTokenID) < 1
            }
            onPress={() => getMetadataBTN()}
            className="sm:w-full md:w-ful xl:w-[19%] bg-[#a664fe] text-white">
            Get Metadata
          </Button>
        </div>

        <div className="xl:w-2/3 bg-dark-gray rounded-md rounded-t-none flex flex-col sm:p-2 md:p-2 xl:p-5 justify-center items-center">
          <p className=" text-danger-600">{errorMessage}</p>
          <div className="text-white text-2xl font-Orbitron">{URI?.name}</div>
          <div className="w-full flex justify-center items-center p-5 py-3">
            <Image
              className="w-full h-full"
              src={URI?.image ? convertIpfsUrl(URI?.image.toString()) : ""}
              alt="ipfs-image"
            />
          </div>
          <p className="text-white pb-2 pt-2">{URI?.description}</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {URI?.attributes &&
              URI?.attributes.map((item: any, index: number) => (
                <div
                  key={`attributes_` + index.toString()}
                  className="flex flex-col justify-center sm:px-4 md:px-4 items-center p-2 border border-gray-800/50 rounded-md">
                  <p className="text-[#9d9d9d]">{item.trait_type}</p>
                  <p className="text-[#a664fe]">{item.value}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default MetadataParser;
