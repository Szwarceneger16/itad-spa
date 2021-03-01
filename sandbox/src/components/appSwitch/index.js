import React, { Component, useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";

function AppRoutes( {route} ) {
    
    return (
        <Switch>
            {route.map(el =>{
                if ( !el.component ) return;
                return (
                    <Route 
                    key={el.name} 
                    path={el.to}
                    exact={true}
                    render={ props => (
                        <el.component />
                    )} 
                    />
                );
            })}
            <Route key='all' path="*">
                <Redirect to='/' />
            </Route>
        </Switch>
    );
}

export default AppRoutes;