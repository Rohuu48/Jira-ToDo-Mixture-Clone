// @ts-nocheck

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  useColorMode,
  Switch,
  Flex,
  Text,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import "./drawer.scss";
import { useDispatch } from "react-redux";
import { logoutUser } from "actions/auth";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ReactContext } from "../../context";
import UserDetails from "containers/UserDetails";

const DrawerContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contextValue = useContext(ReactContext);
  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  const navigateToDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <Button
        data-testid="settings-button"
        variant="ghost"
        colorScheme="green"
        onClick={onOpen}
        position="absolute"
        top={["5px", "20px"]}
        right={["10px", "20px"]}
      >
        <SettingsIcon />
      </Button>
      <Drawer
        data-testid="drawer-container"
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Tasker App</DrawerHeader>
          <DrawerBody>
            {contextValue.isLoggedIn && (
              <>
                <UserDetails />
                <div className="drawerTab" onClick={navigateToDashboard}>
                  Dashboard
                </div>
                <div className="drawerTab" onClick={logout}>
                  Logout
                </div>
              </>
            )}
            <Flex position="absolute" bottom="20px" right="20px">
              <Text margin="auto 10px" fontSize="xs">
                Toggle light/dark mode
              </Text>
              <Switch
                data-testid="toggle-switch"
                color="green"
                isChecked={isDark}
                onChange={toggleColorMode}
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerContainer;
