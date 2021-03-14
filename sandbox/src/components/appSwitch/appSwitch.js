import React, { Component, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";
//import Switch from 'react-router-transition-switch'
import { Box } from '@chakra-ui/react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { CSSTransition } from 'react-transition-group';
import TransitionSwitch from 'react-router-transition-switch'
import Fader from 'react-fader'
import './styles.css'

function AppRoutes( props ) {
    const transitionNodeRef = React.createRef();
    const route = props.route;
    const location = useLocation();

    const childRoutes = route.map(el =>{
        if ( !el.component ) return;
        return (
            <Route 
            key={el.name} 
            path={el.to}
            exact={true}
            component={el.component}
            >
                {/* <el.component  /> */}
            </Route>
        );
    })

    return (
        <>
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="page"
                    transitionEnterTimeout={1600}
                    transitionLeaveTimeout={1600}
                    nodeRef={transitionNodeRef}
                >                     
                    <Switch key={location.key} location={location}>
                        <Box py='10vh' ref={transitionNodeRef} px='1vw' w='100%' minH='100vh' bg="gray.100">
                            {childRoutes }
                            <Route exact path="/">
                                <Redirect to="/home"></Redirect>
                            </Route>
                        </Box>
                    </Switch>   
                </CSSTransition>
            </TransitionGroup>
        </>
    );
}

export default AppRoutes;