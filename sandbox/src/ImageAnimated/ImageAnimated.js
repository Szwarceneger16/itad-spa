import React from "react";
import PropTypes from 'prop-types';
import './ImageAnimated.css';

class ImageAnime extends React.Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
      };

    constructor(props) {
      super(props);
      this.state = {
        isOver: false,
      }
  
      this.mouseOverHandler = this.mouseOverHandler.bind(this);
    }
  
    mouseOverHandler (event) {
      event.preventDefault();
      this.setState( (state,props) => ({
        isOver: !state.isOver,
      }));
    }
  
    render () {
      return (
        <div className="AnimateImage">
          <img 
                src={this.props.src} 
                className="App-logo"
                style={this.state.isOver ? {animationPlayState: 'running'} : {animationPlayState: 'paused'}}
                alt="logo" 
          />
          <div className="AnimateImageClickArea" 
            onMouseOver={this.mouseOverHandler}
            onMouseOut={this.mouseOverHandler}
          ></div>
        </div>
      );
    }
}

export default ImageAnime;