import React, { useCallback, useState } from "react";
import map from './img/map.jpg';
import './App.css';
import { render } from 'react-dom';
import ImageAnimated from './interactiveMap/ImageAnimated.js';
import InteractiveMap from './interactiveMap/InteractiveMap.js';

/* <img 
  src={logo}
  alt="logo"
/> */

export default function App() {
  const [ fontSize, setFontSize ] = useState(0);

  const measuredFontSize = useCallback(node => {
    if (node) {
      // debugger;
      setFontSize(getComputedStyle( node, "").fontSize)
    }
  })

  return (
    <div className="App">
      <header className="App-header" ref={measuredFontSize}>
        <InteractiveMap
          width='500px'
          height='500px'
          defaultChildProps={ { animationClass:'App-logo-animation',
            width: '20%'} }
          src={map}
          fontSize={fontSize}
        >
          <ImageAnimated
            coords={{left: '55%',top: '10%'}}
            width='10%'
            height='10%'
            animationClass='App-logo-animation'
          >
            <h5 style={ { color: 'green',   overflow: 'hidden', textOverflow: 'clip'}}>PolskaPolskaPolska</h5>
          </ImageAnimated>

        </InteractiveMap>
        

      </header>
    </div>
  )
};


