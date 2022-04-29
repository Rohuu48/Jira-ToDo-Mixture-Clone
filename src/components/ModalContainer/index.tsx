// @ts-nocheck
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

interface IModalProps {
  header: string;
  modalOpen: boolean;
  toggleModal: Function;
  children: JSX.Element;
  hideFooter?: boolean;
}

const ModalContainer = ({
  header,
  modalOpen,
  toggleModal,
  children,
  hideFooter,
}: IModalProps) => {
  return (
    <Modal
      isCentered
      onClose={toggleModal}
      isOpen={modalOpen}
      scrollBehavior="inside"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton onClick={toggleModal} />
        <ModalBody>{children}</ModalBody>
        {!hideFooter && (
          <ModalFooter>
            <Button onClick={toggleModal}>Close</Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalContainer;
