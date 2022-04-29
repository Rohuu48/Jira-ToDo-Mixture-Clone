import { Image, Text } from "@chakra-ui/react";
import LOADING_IMAGE from "../../assets/loadingImage.jpg";

const Fallback = () => {
  return (
    <>
      <Image
        height="100vh"
        src={LOADING_IMAGE}
        objectFit="cover"
        width="100vw"
      />
    </>
  );
};

export default Fallback;
