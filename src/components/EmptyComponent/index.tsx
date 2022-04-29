import { Image, Text } from '@chakra-ui/react';
import BLANK_PAGE from '../../assets/blank.png';

type EmptyComponentProps = {
  emptyString: string;
};
const EmptyComponent = ({ emptyString }: EmptyComponentProps) => {
  return (
    <>
      <Image
        height="300px"
        margin="auto"
        src={BLANK_PAGE}
        objectFit="contain"
        maxW="300px"
      />
      <Text>{emptyString}</Text>
    </>
  );
};

export default EmptyComponent;
