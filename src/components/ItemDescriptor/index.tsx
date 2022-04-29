// @ts-nocheck
import { Flex, Text, Avatar, Heading, Tooltip } from "@chakra-ui/react";
import Icon from "components/Icon";
import { useSelector } from "react-redux";
import { getAssigneeDetails } from "selectors/todos";

const ItemDescriptor = ({ item }) => {
  const userDetails = useSelector((state) =>
    getAssigneeDetails(item.assignee)(state)
  );
  const { fullName, username, email } = userDetails;
  return (
    <Flex justify="space-between">
      <Flex flex={1}>
        <Text>{item.description}</Text>
      </Flex>
      <Flex
        justifySelf="flex-end"
        flex={0.5}
        direction="column"
        style={{ marginLeft: "20px" }}
      >
        <Heading as="h6" size="xs" style={{ marginBottom: "20px" }}>
          Assignee
          <Icon name="fas fa-pen" style={{ marginLeft: "10px" }} />
        </Heading>
        <Flex align="center">
          <Avatar style={{ marginRight: "10px" }} size="sm" name={fullName} />
          {item.assignee ? (
            <Tooltip hasArrow label={email}>
              <Text fontWeight="600" fontSize="xs">
                {fullName}
              </Text>
            </Tooltip>
          ) : (
            <Text fontWeight="600" fontSize="xs">
              Noone assigned yet
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default ItemDescriptor;
