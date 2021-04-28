import React from "react";
import { Link, Box, Flex, Text, Button, Stack,Image  } from "@chakra-ui/react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouterLink,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import dotNetLogo from './../../img/grupa-net-gear--color.ico';

//const NavBarOpenContext = React.createContext(setIsOpen);

function Logo({src,to,alt,...props}) {
    return (
      <Box {...props}>
        <RouterLink 
            to={to}
        >
          <Image w='inherit' h='inherit' src={src} alt={alt} ></Image >
        </RouterLink>
          
      </Box>
    );
  }

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

function MyLink({ label, onClick, secure, to, activeOnlyWhenExact,...rest }) {
    let match = !!useRouteMatch({
      path: to,
      exact: true
    });

    return (
        <RouterLink 
          onClick={() => onClick()}
            to={to}
        >
            <Text fontSize={[18,18,20,20]} {...rest}>
                {label}
            </Text>   
        </RouterLink> 
    );
}

export { MyLink , MenuToggle, Logo};