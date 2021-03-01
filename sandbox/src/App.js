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
import { useMediaQuery } from 'react-responsive';
import TopNav from './components/navbar/TopNav.js';
import AppSwitch from './components/appSwitch';
import './App.css';
import route from "./route.js";

export default function App() {
  
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  return (
    <div>
      <Router>
        <div className='nav-bar'>
          <TopNav route={route} />
        </div>

        <div fluid id='main'>
          <AppSwitch route={route} />        
        </div>
      </Router>
    </div>

  )
};
