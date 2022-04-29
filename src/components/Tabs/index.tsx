import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React from "react";

type TabProps = {
  tabList: Array<string>;
  tabChildren: Array<React.ReactNode>;
};
const TabContainer = ({ tabList, tabChildren }: TabProps) => {
  return (
    <Tabs width="100%" variant="soft-rounded" colorScheme="green">
      <TabList>
        {tabList.map((tab) => (
          <Tab>{tab}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabChildren.map((tabData) => (
          <TabPanel>{tabData}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
export default TabContainer;
