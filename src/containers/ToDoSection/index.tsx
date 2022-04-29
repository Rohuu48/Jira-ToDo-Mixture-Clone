import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Button,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { getTodos, setToDoFilters } from "actions/todos";
import ActivityColumn from "components/ActivityColumn";
import DropdownMenu from "components/DropdownMenu";
import ModalContainer from "components/ModalContainer";
import ToDoForm from "containers/ToDoForm";
import { isMobile } from "helper";
import useModalState from "hooks/useModalState";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./toDoSection.scss";

const ToDoSection = ({ todos }) => {
  const dispatch = useDispatch();
  const { modalOpen, toggleModal } = useModalState();
  const allUsers = useSelector((state) => state.auth?.allUsers);
  const filters = useSelector((state) => state.todos?.filters);
  const activeFilter = useSelector((state) => state.todos?.activeFilter?.user);

  const categoryFilter = filters?.category;
  let filterHeading = "Filters";
  let filterOptions = [
    {
      groupHeader: "Category",
      groupItems: [
        { value: "to-do", label: "To do" },
        { value: "assigned", label: "Assigned" },
        { value: "in-progress", label: "In progress" },
        { value: "completed", label: "Completed" },
      ],
      onItemClick: (category) =>
        dispatch(setToDoFilters({ filterGrp: "category", category })),
    },
  ];

  const setUserFilter = (assigneeId) => {
    dispatch(setToDoFilters({ filterGrp: "user", assigneeId }));
    dispatch(
      getTodos(() => {}, {
        assigneeId,
        operation: assigneeId == "all" ? "no-filtering" : "filtering",
      })
    );
  };

  return (
    <Flex direction="column">
      <Flex
        direction={isMobile() ? "column" : "row"}
        justify="space-between"
        align={isMobile() ? "start" : "center"}
        marginBottom={isMobile() ? "0px" : "20px"}
      >
        <DropdownMenu heading={filterHeading} filterOptions={filterOptions} />
        <AvatarGroup
          size="xs"
          max={5}
          marginBottom={isMobile() ? "20px" : "0px"}
        >
          <Tooltip hasArrow label="All users">
            <Avatar onClick={() => setUserFilter("all")} name="All">
              {activeFilter == "all" && (
                <AvatarBadge bg="green.500" boxSize="1em" />
              )}
            </Avatar>
          </Tooltip>
          {allUsers.map((user) => (
            <>
              <Tooltip hasArrow label={user.username}>
                <Avatar
                  onClick={() => setUserFilter(user.id)}
                  name={user.fullName}
                >
                  {activeFilter == user.id && (
                    <AvatarBadge
                      bg="green.500"
                      boxSize="1em"
                      borderWidth="1px"
                    />
                  )}
                </Avatar>
              </Tooltip>
            </>
          ))}
        </AvatarGroup>
        <Button
          marginBottom={isMobile() ? "20px" : "0px"}
          onClick={toggleModal}
        >
          Add to-do
        </Button>
        <ModalContainer
          header="Add to-do"
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          hideFooter
        >
          <ToDoForm toggleModal={toggleModal} />
        </ModalContainer>
      </Flex>
      <Flex direction={isMobile() ? "column" : "row"} className="container">
        <ActivityColumn
          category="To do"
          count={todos?.["to-do"]?.length || 0}
          items={todos?.["to-do"]}
          visibility={categoryFilter?.["to-do"]}
        />
        <ActivityColumn
          category="Assigned"
          count={todos?.["assigned"]?.length || 0}
          items={todos?.["assigned"]}
          visibility={categoryFilter?.["assigned"]}
        />
        <ActivityColumn
          category="In progress"
          count={todos?.["in-progress"]?.length || 0}
          items={todos?.["in-progress"]}
          visibility={categoryFilter?.["in-progress"]}
        />
        <ActivityColumn
          category="Done"
          count={todos?.["completed"]?.length || 0}
          items={todos?.["completed"]}
          visibility={categoryFilter?.["completed"]}
        />
      </Flex>
    </Flex>
  );
};

export default ToDoSection;
