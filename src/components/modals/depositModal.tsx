import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Image,
  Button,
  Input,
} from "@nextui-org/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import {
  GetContractAt,
  SKALE_LankyIllFunnyTestnet,
  fetchDiamondContract,
  fetchUsdtTokenContract,
} from "@/scripts/contracts";
import {
  convertIpfsUrl,
  format6DecimalsAsEther,
  getSigner,
} from "@/scripts/scripts";
import WaitModal from "./waitModal";
import ErrorModal from "./errorModal";
import ApproveModal from "./approveModal";
import classNames from "classnames";
import SuccessModal from "./successModal";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  ipo: any;
}

const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  ipo,
}) => {
  const [waitModalOpen, setWaitModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [approveModalOpen, setApproveModalOpen] = useState<boolean>(false);
  const [successModalOpenForBuy, setSuccessModalOpenForBuy] =
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

  const handleSuccessModalOpenForBuy = () => {
    setSuccessModalOpenForBuy(true);
  };

  const handleApproveModalOpen = () => {
    setApproveModalOpen(true);
  };
  const handleApproveModalClose = () => {
    setApproveModalOpen(false);
  };

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [userUSDTBalance, setUserUSDTBalance] = useState<number>(0);
  const [userUSDTAllowance, setUserUSDTAllowance] = useState<number>(0);
  const [userMaxAllocation, setUserMaxAllocation] = useState<number>(0);
  const [nftMultipler, setNFTMultipler] = useState<number>(0);

  const [userInfo, setUserInfo] = useState<any>();

  const [inputValue, setInputValue] = useState<string>("");

  const handleBuyInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.toString();

    if (/[^0-9]/.test(newValue)) {
      return;
    }

    if (Number(newValue) * 1e6 > userMaxAllocation) {
      return;
    }

    setInputValue(newValue);

    const contract: any = GetContractAt(
      fetchDiamondContract.address,
      fetchDiamondContract.abi,
      SKALE_LankyIllFunnyTestnet
    );

    const avaMultipler = await contract.calculateMultipler(
      ipo[4],
      ipo.ipoDatas[1],
      Number(newValue) * 1e6
    );
    setNFTMultipler(Number(avaMultipler));
  };

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

        const [info, allowances, allocations, balances] = await Promise.all([
          contract.getIpoForUser(ipo[4], ipo.ipoDatas[1], address),
          usdtContract.allowance(address, fetchDiamondContract.address),
          contract.calculateAllocation(ipo[4], ipo.ipoDatas[1], address),
          usdtContract.balanceOf(address),
        ]);

        setUserInfo(info);
        setUserUSDTAllowance(Number(allowances));
        setUserMaxAllocation(Number(allocations));
        setUserUSDTBalance(Number(balances));
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkUser();
  }, [address, isConnected, chainId]);

  const maxBtn = async () => {
    const contract: any = GetContractAt(
      fetchDiamondContract.address,
      fetchDiamondContract.abi,
      SKALE_LankyIllFunnyTestnet
    );

    if (userMaxAllocation > userUSDTBalance) {
      setInputValue((userUSDTBalance / 1e6).toString());
      const avaMultipler = await contract.calculateMultipler(
        ipo[4],
        ipo.ipoDatas[1],
        userUSDTBalance
      );
      setNFTMultipler(Number(avaMultipler));
    } else if (userMaxAllocation < userUSDTBalance) {
      setInputValue((userMaxAllocation / 1e6).toString());
      const avaMultipler = await contract.calculateMultipler(
        ipo[4],
        ipo.ipoDatas[1],
        userMaxAllocation
      );
      setNFTMultipler(Number(avaMultipler));
    }
  };

  const approveBtn = async () => {
    try {
      handleWaitModalOpen();
      const value: number = Number(inputValue) * 1e6;
      const signer = await getSigner(walletProvider);

      const contract: any = GetContractAt(
        fetchUsdtTokenContract.address,
        fetchUsdtTokenContract.abi,
        SKALE_LankyIllFunnyTestnet
      );
      const approveTx = await contract
        .connect(signer)
        .approve(fetchDiamondContract.address, value);
      await approveTx.wait();
      handleWaitModalClose();
      handleApproveModalOpen();
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  const buyBtn = async () => {
    try {
      handleApproveModalClose();
      handleWaitModalOpen();
      const value: number = Number(inputValue) * 1e6;
      const signer = await getSigner(walletProvider);

      const contract: any = GetContractAt(
        fetchDiamondContract.address,
        fetchDiamondContract.abi,
        SKALE_LankyIllFunnyTestnet
      );
      const depositTx = await contract
        .connect(signer)
        .deposit(ipo[4], ipo.ipoDatas[1], value);

      await depositTx.wait();
      handleWaitModalClose();
      handleSuccessModalOpenForBuy();
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  return (
    <>
      <WaitModal isOpen={waitModalOpen} onClose={handleWaitModalClose} />
      <ErrorModal isOpen={errorModalOpen} onClose={handleErrorModalClose} />
      <ApproveModal
        isOpen={approveModalOpen}
        onClose={handleApproveModalClose}
        deposit={() => buyBtn()}
        desc={"You have successfully approved $USDT tokens."}
        desc2={"Please continue to deposit your $USDT tokens..."}
      />
      <SuccessModal
        isOpen={successModalOpenForBuy}
        desc={"You have successfully deposit."}
      />
      <Modal
        hideCloseButton={true}
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          body: "py-6",
          backdrop: "blur",
          base: "border-black bg-dark dark:bg-dark-light text-white/75",
          header: "border-b-[1px] border-dark",
          footer: "border-t-[1px] border-dark",
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex md:flex-row sm:flex-col-reverse sm:text-center justify-between w-full border-b border-gray-800/50 pb-5">
                  <div className="md:w-1/2 sm:w-full flex flex-col">
                    <div>
                      <p className="font-Orbitron text-2xl">{ipo[3][1]}</p>
                    </div>
                    <div>
                      Multipler:{" "}
                      <span className="text-[#a664fe]">
                        {format6DecimalsAsEther(nftMultipler)}x
                      </span>
                    </div>
                  </div>
                  <div className="md:w-1/2 sm:w-full flex justify-end">
                    <Image
                      radius="sm"
                      className="w-full"
                      src={convertIpfsUrl(ipo[3][5])}
                    />
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <div className="text-xs text-[#9d9d9d]">
                    Max Allocation:{" "}
                    <span className="text-white text-base">
                      ${format6DecimalsAsEther(userMaxAllocation)}
                    </span>
                  </div>
                  <div className="text-xs text-[#9d9d9d]">
                    Your Balance:{" "}
                    <span className="text-white text-base">
                      ${format6DecimalsAsEther(userUSDTBalance)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-full justify-end">
                  <Input
                    size="sm"
                    value={inputValue}
                    radius="sm"
                    onInput={handleBuyInput}
                    type="text"
                    isDisabled={userInfo && userInfo[1] !== true}
                    placeholder="Enter Amount"
                    classNames={{
                      base: "p-0",
                      input:
                        "bg-transparent text-white placeholder:text-[10px] placeholder:text-white/75 dark:placeholder:text-white/75 light:placeholder:text-white/75 light:text-white dark:text-white ",
                      inputWrapper:
                        "bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent light:bg-transparent light:hover:bg-transparent focus-within:!bg-transparent border border-gray-800/50 focus-within:border-[#a664fe] border-l-none rounded-r-none",
                      innerWrapper: "bg-transparent text-white",
                    }}
                    color="success"
                    className="whitespace-nowrap w-full text-white z-10"
                  />
                  <Button
                    size="lg"
                    radius="sm"
                    onPress={() => maxBtn()}
                    className="bg-[#a664fe] rounded-l-none border-l border-gray-800/50 text-white">
                    Max
                  </Button>
                </div>
              </ModalBody>

              <ModalFooter>
                <div className="flex flex-col w-full gap-2">
                  <div className="w-full flex gap-3">
                    <Button
                      color="default"
                      className="font-orbitron w-[50%] rounded-lg "
                      onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      onClick={() =>
                        userUSDTAllowance < Number(inputValue) * 1e6
                          ? approveBtn()
                          : buyBtn()
                      }
                      isDisabled={
                        !inputValue ||
                        inputValue == "" ||
                        userUSDTBalance < Number(inputValue) * 1e6
                      }
                      className="w-[50%] bg-[#a566fd]  rounded-lg text-white  font-orbitron ">
                      {userUSDTAllowance < Number(inputValue) * 1e6
                        ? "Approve"
                        : "Buy Now"}
                    </Button>
                  </div>
                  <div
                    className={classNames(
                      "flex w-full justify-end text-xs text-[#9d9d9d]",
                      userUSDTBalance < Number(inputValue) * 1e6
                        ? "flex"
                        : "hidden"
                    )}>
                    Insufficient Balance
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default DepositModal;
