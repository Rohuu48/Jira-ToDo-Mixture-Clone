import { useSelector } from 'react-redux';
import { Avatar, Text, Flex, AvatarBadge } from '@chakra-ui/react';
const UserDetails = () => {
  let currentUser = useSelector((state) => state.auth.data.data);

  const { fullName, avatarUrl, email } = currentUser;
  return (
    <Flex direction="column">
      <Avatar size="lg" name={fullName} src={avatarUrl} margin="25px auto">
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Text margin="auto">{fullName}</Text>

      <Text margin="auto">{email}</Text>
    </Flex>
  );
};

export default UserDetails;
