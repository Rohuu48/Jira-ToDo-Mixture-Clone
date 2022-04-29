import { useEffect } from "react";
import TabContainer from "../../components/Tabs";
import { RootStateOrAny, useDispatch } from "react-redux";
import { getTodos } from "../../actions/todos";
import { useSelector } from "react-redux";
import "./dashboard.scss";
import ToDoSection from "containers/ToDoSection";
import { Flex } from "@chakra-ui/react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootStateOrAny) => state.todos);

  useEffect(() => {
    //dummy checking to not call dummy todo api if data is already present in persisted store
    //NOT A REAL LIFE SCENARIO!
    if (Object.keys(todos).length == 0) dispatch(getTodos());
  }, []);

  const tabList = ["To do Items"];
  const tabChildren = [<ToDoSection todos={todos} />];

  return (
    <Flex className="dashContainer">
      <TabContainer tabList={tabList} tabChildren={tabChildren} />
    </Flex>
  );
};
export default Dashboard;
