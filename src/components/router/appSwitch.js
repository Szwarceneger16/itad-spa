import React, { Component, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
//import Switch from 'react-router-transition-switch'
import { Box } from "@chakra-ui/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import { GetUserRoles } from "../../selectors";

function AppRoutes({ route }) {
  const transitionNodeRef = React.createRef();
  //const route = props.route;
  const location = useLocation();
  //const userRoles = GetUserRoles();

  const childRoutes = route.map((el) => {
    return (
      <Route
        key={el.name}
        path={el.path}
        exact={true}
        component={el.component}
      />
    );
  });

  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          classNames="page"
          timeout={600}
          nodeRef={transitionNodeRef}
        >
          <Box
            className="page"
            pt={["4vh", "8vh", "12vh"]}
            pb={["0vh", "0vh", "6vh"]}
            ref={transitionNodeRef}
            px="1vw"
            /* w='100%' minH='100vh' */ bg="gray.100"
          >
            <Switch /* key={location.key} */ location={location}>
              {childRoutes}
              <Route path="*" /* component={Home.component} */>
                <Redirect push to="/home" />
              </Route>
            </Switch>
          </Box>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default AppRoutes;
