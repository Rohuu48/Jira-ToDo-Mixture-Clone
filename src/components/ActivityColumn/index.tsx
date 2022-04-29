import { Flex, Heading, Text } from "@chakra-ui/react";
import { setToDoCategories } from "actions/todos";
import ItemDescriptor from "components/ItemDescriptor";
import ModalContainer from "components/ModalContainer";
import PopoverContainer from "components/Popover";
import { CATEGORY_IDENTIFIERS } from "constants";
import useModalState from "hooks/useModalState";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./activityColumn.scss";

interface ActivityColumnProps {
  category: string;
  count: number;
  items: Array<object>;
  visibility: boolean;
}

interface ItemProps {
  category: string;
  item: object;
  backgroundColor?: string;
}

const RenderEachItem = ({ category, item }: ItemProps) => {
  const { id, title, description } = item;
  const { modalOpen, toggleModal } = useModalState();

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.setData("category", category);
  };
  return (
    <>
      <div
        key={id}
        className="description"
        draggable
        onClick={toggleModal}
        onDragStart={(event) => onDragStart(event, id)}
      >
        <Heading as="h5" size="sm" className="item-header">
          {title}
        </Heading>
        <Text noOfLines={3}>{description}</Text>
      </div>
      <ModalContainer
        header={title}
        modalOpen={modalOpen}
        toggleModal={toggleModal}
      >
        <ItemDescriptor item={item} />
      </ModalContainer>
    </>
  );
};

const ActivityColumn = ({
  category,
  count,
  items,
  visibility,
}: ActivityColumnProps) => {
  const [showPopover, setPopoverVisibility] = useState(false);
  const dispatch = useDispatch();
  const categoryColor = {
    "To do": "rgb(18 17 17 / 13%)",
    Assigned: "#5555ee75",
    "In progress": "rgb(255 253 196)",
    Done: "#C6F6D5",
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (ev, category) => {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    const prevCategory = ev.dataTransfer.getData("category");
    if (category !== prevCategory)
      dispatch(
        setToDoCategories({
          category: CATEGORY_IDENTIFIERS[category],
          prevCategory: CATEGORY_IDENTIFIERS[prevCategory],
          id,
        })
      );
  };

  return (
    <Flex
      flex={1}
      direction="column"
      className="columnContainer droppable"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, category)}
      style={{ display: visibility ? "flex" : "none" }}
    >
      <Flex
        style={{ backgroundColor: categoryColor[category] }}
        className="header"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <div className="category">{category}</div>
        <div className="count">{count}</div>
      </Flex>
      <Flex flexDirection="column" flexGrow={0} className="itemContainer">
        {Array.isArray(items) &&
          items?.map((item) => {
            return <RenderEachItem category={category} item={item} />;
          })}
      </Flex>
    </Flex>
  );
};

export default ActivityColumn;
