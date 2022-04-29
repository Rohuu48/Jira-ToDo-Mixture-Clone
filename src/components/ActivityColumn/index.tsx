import { Flex, Heading, Text } from "@chakra-ui/react";
import { setToDoCategories } from "actions/todos";
import ItemDescriptor from "components/ItemDescriptor";
import ModalContainer from "components/ModalContainer";
import { CATEGORY_IDENTIFIERS } from "constants/index";
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

interface EachItemProps {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: number;
}

interface ItemProps {
  category: string;
  item: EachItemProps;
  backgroundColor?: string;
}

const RenderEachItem = ({ category, item }: ItemProps) => {
  const { id, title, description } = item;
  const { modalOpen, toggleModal } = useModalState();

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
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
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDrop = (ev: React.DragEvent<HTMLDivElement>, category: any) => {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    const prevCategory = ev.dataTransfer.getData("category");
    if (category !== prevCategory)
      dispatch(
        setToDoCategories({
          category:
            CATEGORY_IDENTIFIERS[category as keyof typeof CATEGORY_IDENTIFIERS],
          prevCategory:
            CATEGORY_IDENTIFIERS[
              prevCategory as keyof typeof CATEGORY_IDENTIFIERS
            ],
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
        style={{
          backgroundColor:
            categoryColor[category as keyof typeof categoryColor],
        }}
        className="column-heading"
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
            // @ts-ignore
            return <RenderEachItem category={category} item={item} />;
          })}
      </Flex>
    </Flex>
  );
};

export default ActivityColumn;
