import React, { Suspense, useContext, useEffect, useState } from "react";
import { Link, Box, Flex, Text, Button, Stack, Image } from "@chakra-ui/react";
// @ts-ignore
import dotNetLogo from "src/img/grupa-net-gear--color.ico";
import { MyLink, MenuToggle, Logo } from "./elements.js";
import { useTranslation } from "react-i18next";
import { popElement, createRouteComparator } from "./../../utils";
import { userTokenContext } from "./../contexts.js";
import * as styles from "./styles.js";
import { UserAvatar } from "./leftDrawer.js";
//import { sessionManager } from "../sessionManager";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useSelector, useDispatch } from "react-redux";

function MenuLinks({ route, onClick, isLoggedIn, ...props }) {
  const { t, i18n } = useTranslation("common");
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = async () => {
    await dispatch(logout());
    history.push("/home");
  };

  useEffect(() => {}, [isLoggedIn]);

  // let route = Array.from(props.route);

  route = route.filter((el) => {
    if (!el.navbarDisplay || el.navbarDisplay === false) {
      return false;
    }
    return true;
  });

  // create links elements
  route = route.map(({ name, path }) => {
    return (
      <MyLink
        {...styles.ButtonStyle[name]}
        onClick={onClick}
        className={name}
        key={"top" + name}
        to={path}
        label={t("routes." + name)}
      />
    );
  });

  return (
    <Box
      display={{ base: props.isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={6}
        align="center"
        justify={["center", "space-around", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
        pr={2}
        mb={[4, 4, 0, 0]}
      >
        {route}
        {isLoggedIn && <UserAvatar />}
        {isLoggedIn && (
          <Button
            {...styles.ButtonStyle.logout}
            onClick={() => {
              onClick();
              logoutHandler();
            }}
          >
            {
              t("common:TopNavBar.logout")
            }            
          </Button>
        )}
      </Stack>
    </Box>
  );
}

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      position="fixed"
      top="0"
      zIndex="100"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={2}
      p={2}
      bg={["green.500", "green.500", "orange.400", "orange.400"]}
      color={["white", "white", "green.700", "green.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

const NavBar = ({ route, isLoggedIn, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        src={dotNetLogo}
        to="/home"
        alt=""
        w={
          [
            "30px",
            "36px",
            "48px",
            "64px",
          ] /* { base: "42px", md: "50px", lg: "66px" } */
        }
        h={
          [
            "30px",
            "36px",
            "48px",
            "64px",
          ] /* { base: "42px", md: "50px", lg: "66px" } */
        }
        color={["white", "white", "green.500", "green.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks
        isLoggedIn={isLoggedIn}
        isOpen={isOpen}
        route={route}
        onClick={() => setIsOpen(false)}
      />
    </NavBarContainer>
  );
};

export default NavBar;
