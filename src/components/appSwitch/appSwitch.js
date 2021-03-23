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
            path={el.path}
            exact={true}
            component={el.component}
            />
        );
    })

    return (
        <>
            <TransitionGroup component={null}>
                <CSSTransition
                    key={location.key}
                    classNames="page"
                    timeout={600}
                    nodeRef={transitionNodeRef}
                >                     
                <Box className='page' py='10vh' ref={transitionNodeRef} px='1vw' /* w='100%' minH='100vh' */ bg="gray.100">
                    <Switch /* key={location.key} */ location={location}>
                        {childRoutes }
                        <Route path='*'>
                            <Redirect to="/home" />
                        </Route>      
                    </Switch>   </Box>
                </CSSTransition>
            </TransitionGroup>
        </>
    );
}

export default AppRoutes;