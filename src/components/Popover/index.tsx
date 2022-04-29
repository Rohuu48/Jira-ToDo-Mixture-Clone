// @ts-nocheck
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
} from "@chakra-ui/react";

const PopoverContainer = ({ children }) => {
  return (
    <Popover>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverContainer;
