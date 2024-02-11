import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CircularProgress,
} from "@nextui-org/react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal
        hideCloseButton={true}
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        classNames={{
          body: "py-6",
          backdrop: "blur",
          base: "border-black bg-dark dark:bg-dark dark:bg-dark-light",
          header: "border-b-[1px] border-dark",
          footer: "border-t-[1px] border-dark",
        }}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col text-2xl items-center text-white/75 gap-1">
              Waiting Transaction
            </ModalHeader>
            <ModalBody className="flex justify-center items-center">
              <CircularProgress
                size="lg"
                color="secondary"
                aria-label="Loading..."
              />
              <p className="text-white/75">
                Please approve your transaction in your wallet
              </p>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
export default WaitModal;
