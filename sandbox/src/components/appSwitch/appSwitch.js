import React, { Component, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import './styles.css'

function AppRoutes( props ) {
    const route = props.route;

    return (
        <>
        {/* <Switch> */}
            { 
            route.map(el =>{
                if ( !el.component ) return;
                return (
                    <Route 
                    key={el.name} 
                    path={el.to}
                    exact={true}
                    render={ props => (
                        <CSSTransition
                            in={props.match != null}
                            timeout={1300}
                            classNames="page"
                            unmountOnExit
                        >
                            <div className="page">
                            <el.component {...props} /> 
                            </div>
                                   
                        </CSSTransition>
                        
                    )} 
                    />
                );
            })}
            <Route key='all' path="*">
                <Redirect to='/' />
            </Route>
        {/* </Switch> */}
        </>
    );
}

export default AppRoutes;