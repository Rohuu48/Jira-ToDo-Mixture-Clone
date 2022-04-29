import { useState } from "react";

const useModalState = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return {
    modalOpen,
    toggleModal,
  };
};

export default useModalState;
