import worker from './workerStart.js';
import React, { Component, Suspense,  useCallback, useContext, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import { Flex } from '@chakra-ui/react';
import TopNav from './components/navbar/TopNavBar.js';
import AppSwitch from './components/appSwitch/appSwitch';
import './App.css';
import route from "./components/routes/route.js";
import i18next from './components/i18nextConfig.js';
import { userTokenContext } from './components/contexts.js';
import Menubar from './components/menubar';
import store from './components/sessionManager.js'

// let mrr = 'initial';
// function setMrr(params) {
//   mrr = params;
// }

//
export default function App() { 

    //const [ mrr, setMrr ] = useState('initial');

    //console.log('rerender = ' + mrr);
  return (
    <div>
      <Router basename="">
        <Suspense fallback={<h1>Page is loading</h1>}>
            <TopNav route={route} store={store} />
            <Menubar />

          <Flex py='10vh' px='5vw' wrap='wrap' minH='100vh' align="center" justify="center" bg="gray.100">
            {/* <userTokenContext.Provider value={setMrr}> */}
            <Suspense fallback={<h1>Profile loading</h1>}>
              <AppSwitch route={route} />     
            </Suspense>
            {/* </userTokenContext.Provider> */}
               
          </Flex>
        </Suspense>
      </Router>
    </div>
  )

};
