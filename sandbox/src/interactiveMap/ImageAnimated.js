import React, { createRef  } from "react";
import PropTypes from 'prop-types';
import './ImageAnimated.css';

class ImageAnime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
    this.startAnimation = this.startAnimation.bind(this);
    this.endAnimation = this.endAnimation.bind(this);
    this.elementRef = createRef();

    this.childrenWithProps = React.Children.map(this.props.children, child => {
      // checking isValidElement is the safe way and avoids a typescript error too
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { ref: this.elementRef,
            className: child.className + ' AnimateImage-child',
            onAnimationEnd: this.endAnimation,
          });
      }
      return child;
    });
  }

  startAnimation = () => {
    this.setState({
      isPlaying: true,
    }) 
    this.elementRef.current.classList.add(this.props.animationClass);
  }

  endAnimation = () => {
    this.setState({
      isPlaying: false,
    }) 
    this.elementRef.current.classList.remove(this.props.animationClass);
  }

  render () {
    return (
      <div 
        className="AnimateImage" 
        style={ { height: this.props.height,
          width: this.props.width,
        } }
      >
        {this.childrenWithProps}
        <div className="AnimateImage-click-area" 
          onMouseOver={ this.startAnimation }
          //onMouseOut={ () => setMouseOver(false) }
        ></div>
      </div>
    );
  }
}

ImageAnime.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  animationClass: PropTypes.string.isRequired,
};

/* 
function ImageAnime(props) {
  const [ mouseOver, setMouseOver ] = useState(false);
  const elementRef  = useRef(null);


  console.log('here');
  const childrenWithProps = React.Children.map(this.props.children, child => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ref: elementRef,
          alt:"logo",
          // className: 'AppLogo',
          onAnimationEnd: () => {
            setMouseOver(false); 
            elementRef.current.classList.remove(this.props.animationClass);
          },
        });
    }
    return child;
  });

  return (
    <div 
      className="AnimateImage" 
      style={ { height: this.props.height,
        width: this.props.width,
      } }
    >
      {childrenWithProps}
      <div className="AnimateImageClickArea" 
        onMouseOver={ () => {
          setMouseOver(true);
          elementRef.current.classList.add(this.props.animationClass);
        } }
        //onMouseOut={ () => setMouseOver(false) }
      ></div>
    </div>
  );
}

ImageAnime.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};
*/

export default ImageAnime;