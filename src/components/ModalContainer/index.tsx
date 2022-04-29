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

const ModalContainer = ({
  header,
  modalOpen,
  toggleModal,
  children,
  hideFooter,
  style,
}) => {
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
