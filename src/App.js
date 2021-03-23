import worker from './workerStart.js';
import {sessionManager} from './components/sessionManager.js'
import React, { Component, Suspense,  useCallback, useContext, useState } from "react";
import {
  BrowserRouter  as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import { Container, Box,Flex } from '@chakra-ui/react';
import TopNav from './components/navbar/TopNavBar.js';
import AppSwitch from './components/appSwitch/appSwitch';
import './App.css';
import route from "./components/routes/route.js";
import i18next from './components/i18nextConfig.js';
import { userTokenContext } from './components/contexts.js';
import Menubar from './components/menubar';

const definedRoutes = route.filter( el => {
  if ( el.component === undefined) return false;
  return true;
}) 

export default function App() { 
    //const [ mrr, setMrr ] = useState('initial');

    //console.log('rerender = ' + mrr);
  return (
    <div>
      <Router basename="">
        <Suspense fallback={<h1>Page is loading</h1>}>
            <TopNav route={definedRoutes} store={sessionManager} />
            <Menubar />

          
            {/* <userTokenContext.Provider value={setMrr}> */}
            <Suspense fallback={<h1>Profile loading</h1>}>
              <AppSwitch route={route} />     
            </Suspense>
            {/* </userTokenContext.Provider> */}
               
        </Suspense>
      </Router>
    </div>
  )

};
