import React, { Suspense, useContext,useEffect,useState } from "react";
import { Link, Box, Flex, Text, Button, Stack,Image  } from "@chakra-ui/react";
import dotNetLogo from './../../img/grupa-net-gear--color.ico';
import { MyLink , MenuToggle, Logo} from './elements.js';
import { useTranslation } from 'react-i18next';
import { popElement,createRouteComparator } from './../../utils';
import { userTokenContext } from './../contexts.js';
import * as styles from './styles.js';
import {UserAvatar} from './leftDrawer.js'
//import { sessionManager } from "../sessionManager";
import { useHistory } from "react-router";
import {
  useParams
} from "react-router-dom";
import { logout } from "../../actions/auth";
import {
  useSelector,
  useDispatch
} from 'react-redux';

function MenuLinks( {/* store, */ ...props} ) {
  const { t, i18n } = useTranslation('common');
  //const [isLoggedIn, setAuthenticated] = useState(!!store.getState().userData);
  const isLoggedIn = useSelector( state => state.auth.isLoggedIn);
  const dispatch = useDispatch()
  const history = useHistory();
  
  const userRoles = useSelector( state => (state.auth.user && state.auth.user.role)?? [] );
  //const userRoles = [];

  // useEffect( () => {
  //   const unsubscribe = store.subscribe(() => {
  //     //console.log('reload navbar',store.getState());
  //     setAuthenticated(!!store.getState().userData);
  //   })
  //   return unsubscribe;
  // }, [])

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/home');
  }

  let route = Array.from(props.route);

  route = route.filter( el => {
    //debugger;
    if (isLoggedIn && ["login","register"].includes(el.name) ) {
      return false;
    }

    if ( el.secure && !el.secure.some( el => userRoles.includes( el )) ) {
      return false;
    }
    if ( !el.navbarDisplay || el.navbarDisplay === false  ) {
      return false;
    }
    return true;
  }) 

  // create links elements
  route = route.map( ( {name,path} ) => {
    return (<MyLink {...styles.ButtonStyle[name]} className={name} key={'top'+name} to={path} label={t('routes.'+name)} />)
  })

  //
  
    return (
  <Box
    display={{ base: props.isOpen ? "block" : "none", md: "block" }}
    flexBasis={{ base: "100%", md: "auto" }}
  >
    {/* <userTokenContext.Consumer>
      {value => setAuthenticated(value)}
    </userTokenContext.Consumer> */}
    <Stack
      spacing={6}
      align="center"
      justify={["center", "space-around", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
      pt={[4, 4, 0, 0]}
      pr={2}
      mb={[4,4,0,0]}
    >
      {route}
      {/* {!isLoggedIn && loginRoute && <MyLink
          as='button'
          key={'top'+loginRoute.name} 
          to={loginRoute.path} 
          label={t('routes.'+loginRoute.name)}
          {...styles.loginButtonStyle}
      />}
      {!isLoggedIn && registerRoute && <MyLink
          as='button'
          key={'top'+registerRoute.name} 
          to={registerRoute.path} 
          label={t('routes.'+registerRoute.name)}
          {...styles.registerButtonStyle}
      />} */}
      {isLoggedIn && <UserAvatar /* userData={sessionManager.getState().userData} */ />}
      {isLoggedIn && <Button 
        {...styles.ButtonStyle.logout} 
        onClick={() => logoutHandler()}
      >Logout</Button>}
    </Stack>
  </Box>
  );
// )};
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

const NavBar = ( { route, logoSrc,auth,store , ...props}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        src={dotNetLogo}
        to='/home'
        w={['30px','36px','48px','64px']/* { base: "42px", md: "50px", lg: "66px" } */}
        h={['30px','36px','48px','64px']/* { base: "42px", md: "50px", lg: "66px" } */}
        color={["white", "white", "green.500", "green.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} store={store} route={route} auth={auth} />
    </NavBarContainer>
  );
};

export default NavBar;