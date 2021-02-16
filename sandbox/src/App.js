import logo from './logo.svg';
import React from "react";
import './App.css';
import { render } from 'react-dom';
import ImageAnimated from './ImageAnimated/ImageAnimated.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ImageAnimated src={logo} />
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
  );
}

export default App;
