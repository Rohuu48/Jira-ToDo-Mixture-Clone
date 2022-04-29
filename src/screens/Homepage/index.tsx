import { Flex, Heading, Text } from "@chakra-ui/react";

const Homepage = () => {
  return (
    <Flex h="50vh" direction="column" justify="center" align="center">
      <Heading marginBottom="20px">Welcome to the Tasker App</Heading>
      <Text>
        You can log in or sign up to access the features. If logged in, go to
        Dashboard.
      </Text>
    </Flex>
  );
};

export default Homepage;
