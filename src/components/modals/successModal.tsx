import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Image from "next/image";

interface SuccessModalProps {
  isOpen: boolean;
  desc: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, desc }) => {
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
          base: "border-black bg-dark dark:bg-dark-light text-white/75",
          header: "border-b-[1px] border-dark",
          footer: "border-t-[1px] border-dark",
        }}>
        <ModalContent>
          <>
            <ModalBody className="flex items-center">
              <Image
                width={150}
                height={50}
                className="w-[30%] rounded-full "
                src="/icons/success.svg"
                alt="success"
              />
              <p>{desc}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                className=" font-orbitron bg-[#a664fe] text-white w-full rounded-lg "
                onClick={() => window.location.reload()}>
                Close
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
export default SuccessModal;
