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

function Logo({src,alt,...props}) {
    return (
      <Box {...props}>
          <Image w='inherit' h='inherit' src={src} alt={alt} ></Image >
      </Box>
    );
  }

const NavBar = ( { route, logoSrc, ...props}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        src={dotNetLogo}
        w={['30px','36px','48px','64px']/* { base: "42px", md: "50px", lg: "66px" } */}
        h={['30px','36px','48px','64px']/* { base: "42px", md: "50px", lg: "66px" } */}
        color={["white", "white", "green.500", "green.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} route={route} />
    </NavBarContainer>
  );
};

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

function MyLink({ label, to, activeOnlyWhenExact,...rest }) {
    let match = !!useRouteMatch({
      path: to,
      exact: true
    });

    return (
        <RouterLink 
            to={to}
        >
            <Text fontSize={[18,18,20,20]} {...rest}>
                {label}
            </Text>   
        </RouterLink> 
    );
}

class MenuLinks extends React.Component {

    constructor(props) {
            //route = route.filter(el => !!el.component);
        super(props);
        const route = Array.from(props.route);
        function popElement (ro,name) {
            const index= ro.findIndex( el => el.name === name);
            if (index < 0) return null;
            return ro.splice( index,1)[0];
        }
        //const defaultRoute = popElement(route,'Home');
        this.loginRoute =popElement(route,'Login');
        console.log(route);
        //debugger;
        this.registerRoute =popElement(route,'Register');
        console.log(route);
        this.definedRoutes = route.map( el => {
            if ( el.component === undefined) return null;
            return (<MyLink key={'top'+el.name} to={el.to} label={el.name} />)
        })
        
    }


  render () { 
      return(
    <Box
      display={{ base: this.props.isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={6}
        align="center"
        justify={["center", "space-around", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
        pr={2}
        mb={[4,4,0,0]}
      >
            {!!this.definedRoutes && this.definedRoutes}
            <MyLink
                as='button'
                key={'top'+this.loginRoute.name} 
                to={this.loginRoute.to} 
                label={this.loginRoute.name}
                rounded="lg"
                px={4}
                py={2}
                color={["blue.600", "blue.800", "white", "white"]}
                bg={["orange.400", "blue.100", "green.500", "green.500"]}
                _hover={{
                bg: ["orange.200", "green.100", "green.600", "green.600"]}}
            />
            {this.registerRoute && <MyLink
                as='button'
                key={'top'+this.registerRoute.name} 
                to={this.registerRoute.to} 
                label={this.registerRoute.name}
                rounded="lg"
                px={4}
                py={2}
                color={["green.500", "ye", "green.600", "green.600"]}
                bg={["white", "white", "gray.100", "gray.100"]}
                _hover={{
                bg: ["gray.300", "gray.300", "gray.300", "gray.300"]}}
            />}
        {/* <MenuItem to="/signup" isLast>
          <Button
            size="sm"
            rounded="md"
            color={["green.500", "green.500", "white", "white"]}
            bg={["white", "white", "green.500", "green.500"]}
            _hover={{
              bg: ["green.100", "green.100", "green.600", "green.600"]
            }}
          >
            Create Account
          </Button>
        </MenuItem> */}
      </Stack>
    </Box>
  )};
};

const NavBarContainer = ({ children, ...props }) => {
  return (

    <Flex
        position='fixed' 
        top='0' 
        zIndex='100'
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

export default NavBar;