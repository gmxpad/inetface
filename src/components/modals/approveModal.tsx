import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Image from "next/image";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  deposit: () => void;
  desc: string;
  desc2: string;
}

const ApproveModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  deposit,
  desc,
  desc2,
}) => {
  return (
    <>
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
              <ModalBody className="flex items-center sm:text-center">
                <Image
                  width={450}
                  height={450}
                  className="w-[30%] rounded-full "
                  src="/icons/success.svg"
                  alt="error"
                />
                <p>{desc}</p>
                <p>{desc2}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  className="font-orbitron w-[50%] rounded-lg "
                  onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => deposit()}
                  className="w-[50%] bg-[#a566fd]  rounded-lg text-white  font-orbitron ">
                  {desc2 === "Please continue to deposit your $USDT tokens..."
                    ? "Buy Now"
                    : "Stake"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ApproveModal;
