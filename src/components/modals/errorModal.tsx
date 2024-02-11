import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Image from "next/image";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose }) => {
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
          base: "border-black bg-dark dark:bg-dark dark:bg-dark-light",
          header: "border-b-[1px] border-dark",
          footer: "border-t-[1px] border-dark",
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex items-center text-white/75">
                <div className="relative flex justify-center items-center">
                  <Image
                    width={450}
                    height={450}
                    className="w-[90%]"
                    src="/icons/walletTransfer.svg"
                    alt="error"
                  />
                  <Image
                    width={450}
                    height={450}
                    className="w-[12%] absolute top-0"
                    src="/icons/error.svg"
                    alt="wallet"
                  />
                </div>
                <p>The transaction is cancelled by the user.</p>
                <p>Please try again.</p>
              </ModalBody>
              <ModalFooter className="flex items-center justify-center">
                <Button
                  className="text-lg w-full bg-[#a566fd] text-white"
                  onPress={onClose}>
                  Back
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ErrorModal;
