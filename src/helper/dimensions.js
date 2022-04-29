import useWindowDimensions from "hooks/useWindowDimensions";

export const isMobile = () => {
  const { dimensions } = useWindowDimensions();
  return dimensions.width <= 576;
};
