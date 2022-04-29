import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import "./dropdown.scss";

const DropdownMenu = ({ heading, filterOptions }) => {
  const defaultValue = useSelector(
    (state) => state?.todos?.activeFilter?.category
  );
  return (
    <Menu isLazy>
      <MenuButton className="menu-button" as={Button}>
        {heading}
      </MenuButton>
      <MenuList>
        {filterOptions.map((opt) => {
          const { groupHeader, groupItems, onItemClick } = opt;
          return (
            <MenuOptionGroup
              defaultValue={defaultValue}
              title={groupHeader}
              type="radio"
            >
              <MenuItemOption onClick={() => onItemClick("all")} value="all">
                All
              </MenuItemOption>
              {groupItems.map((item) => {
                return (
                  <MenuItemOption
                    onClick={() => onItemClick(item.value)}
                    value={item.value}
                  >
                    {item.label}
                  </MenuItemOption>
                );
              })}
              <MenuDivider />
            </MenuOptionGroup>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
