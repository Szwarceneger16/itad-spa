import React from "react";
import logo from './img/logo.svg';
import './App.css';
import { render } from 'react-dom';
import ImageAnimated from './interactiveMap/ImageAnimated.js';

/* <img 
  src={logo}
  alt="logo"
/> */

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ImageAnimated    
          width='200px'
          height='200px'
          animationClass='App-logo-animation'
        >
          <h3>Polska</h3>
        </ImageAnimated>

      </header>
    </div>
  )
};


