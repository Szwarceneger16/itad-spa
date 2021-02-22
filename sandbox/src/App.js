import React from "react";
import logo from './img/logo.svg';
import './App.css';
import { render } from 'react-dom';
import ImageAnimated from './ImageAnimated/ImageAnimated.js';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ImageAnimated    
          width='200px'
          height='200px'
          animationClass='App-logo-animation'
        >
          {/* <img 
            src={logo}
            alt="logo"
          /> */}
          <h3>GHJ</h3>
        </ImageAnimated>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
};


