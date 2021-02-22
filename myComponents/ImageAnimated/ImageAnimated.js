import React, { useState } from "react";
import PropTypes from 'prop-types';
import './ImageAnimated.css';

function ImageAnime() {
  const [ mouseOver, setMouseOver ] = useState(false);
  
  const mouseOverHandler = (event) => {
    event.preventDefault();
    setMouseOver(true);
  }

  return (
    <div className="AnimateImage">
      <img 
            src={this.props.src} 
            className="App-logo"
            style={mouseOver ? {animationPlayState: 'running'} : {animationPlayState: 'paused'}}
            alt="logo" 
      />
      <div className="AnimateImageClickArea" 
        onMouseOver={mouseOverHandler}
        onMouseOut={mouseOverHandler}
      ></div>
    </div>
  );
}

ImageAnimepropTypes = {
  src: PropTypes.string.isRequired,
};

export default ImageAnime;