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
import { Flex } from '@chakra-ui/react';
import TopNav from './components/navbar/TopNavBar.js';
import AppSwitch from './components/appSwitch';
import './App.css';
import route from "./route.js";

export default function App() {
  

  return (
    <div>
      <Router>
        <TopNav route={route} />
        <Flex minH='100vh' align="center" justify="center" bg="gray.100">
          <AppSwitch route={route} />        
        </Flex>
      </Router>
    </div>
  )

  // return (
  //   <TopNav route={route} />
  // )
};
