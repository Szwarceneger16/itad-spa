import React, { Component, Suspense,  useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import { Flex } from '@chakra-ui/react';
import TopNav from './components/navbar/TopNavBar.js';
import AppSwitch from './components/appSwitch';
import './App.css';
import route from "./route.js";
import i18next from './components/i18nextConfig.js'

//
export default function App() {  
    
  return (
    <div>
      <Router>
        <Suspense fallback={<h1>Loading profile...</h1>}>
          <TopNav route={route} />
          <Flex py='10vh' px='5vw' wrap='wrap' minH='100vh' align="center" justify="center" bg="gray.100">
            <AppSwitch route={route} />        
          </Flex>
        </Suspense>
      </Router>
    </div>
  )

};
