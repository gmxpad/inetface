import ErrorModal from "@/components/modals/errorModal";
import SuccessModal from "@/components/modals/successModal";
import WaitModal from "@/components/modals/waitModal";
import {
  GetContractAt,
  SKALE_LankyIllFunnyTestnet,
  fetchDistTokenContract,
} from "@/scripts/contracts";
import { getSigner } from "@/scripts/scripts";
import { Button } from "@nextui-org/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import React, { useState } from "react";

export default function TestDist() {
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
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const claimBTN = async () => {
    if (isConnected === true) {
      try {
        handleWaitModalOpen();
        const signer = await getSigner(walletProvider);
        const contract: any = GetContractAt(
          fetchDistTokenContract.address,
          fetchDistTokenContract.abi,
          SKALE_LankyIllFunnyTestnet
        );
        const tx = await contract.connect(signer).claimTokens();
        await tx.wait();
        handleWaitModalClose();
        handleSuccessModalOpenForClaim();
      } catch (error) {
        handleWaitModalClose();
        handleErrorModalOpen();
        console.log(error);
      }
    }
  };
  return (
    <>
      <WaitModal isOpen={waitModalOpen} onClose={handleWaitModalClose} />
      <ErrorModal isOpen={errorModalOpen} onClose={handleErrorModalClose} />
      <SuccessModal
        isOpen={successModalOpenForClaim}
        desc={"You have successfully claimed your test tokens."}
      />
      <div className="py-24 flex justify-center items-center">
        <Button
          radius="sm"
          onClick={() => claimBTN()}
          className="bg-[#a664fe] text-white px-12 z-10">
          Claim
        </Button>
      </div>
    </>
  );
}
