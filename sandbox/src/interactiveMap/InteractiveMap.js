import React, { createRef  } from "react";
import PropTypes from 'prop-types';
import './InteractiveMap.css';

class InteractiveMap extends React.Component {
    constructor(props) {
        super(props);

        //this.wrapper = React.createRef();

        if ( this.props.defaultChildProps ) {
            this.childrenWithProps = React.Children.map(this.props.children, (child,index) => {
                // checking isValidElement is the safe way and avoids a typescript error too
                if (React.isValidElement(child)) {
                    let newProps = {};
                    for (const [key,val] of Object.entries(this.props.defaultChildProps)) {
                        if ( !child.props[key] ) {
                            newProps[key] = val;
                        }
                    }
                    return React.cloneElement(child, newProps);
                }
                return child;
            });
        } else {
            this.childrenWithProps = this.props.children;
        }

        // this.calcRatio = this.calcRatio.bind(this);
        //this.getImageOrginalSize = this.getImageOrginalSize.bind(this);
    }

    componentDidUpdate () {
        
        const img = new Image();
        img.src = this.props.src;
        let widthRatio,heightRatio;
        const fontSize = getComputedStyle( this.wrapper.current, "").fontSize;

        if ( /px/.test(this.props.width) ) {
            widthRatio = 
            (Number.parseInt(this.props.width)/img.naturalWidth);
            heightRatio = 
                (Number.parseInt(this.props.height)/img.naturalHeight);
        } else {
            widthRatio = 
            (Number.parseInt(this.props.width)*fontSize/img.naturalWidth);
            heightRatio = 
                (Number.parseInt(this.props.height)*fontSize/img.naturalHeight);
        }

        let imageRatio = widthRatio < heightRatio ? widthRatio : heightRatio;
            
        this.imageWidth = imageRatio * img.naturalWidth;
        this.imageHeight = imageRatio * img.naturalHeight;
    }

    render() {

        return ( 
        <div
            ref={this.wrapper}
            id="tryms"
            style={ {
                ...this.props.style,
                width: this.props.width,
                height: this.props.height,
                position: 'relative'
            }}
            className='mapClass'
        >
            <img 
                style={{
                    position: "absolute",
                    top: '50%',
                    left: '50%',
                    transform: 'translateY(-50%) translateX(-50%)',
                }}
                src={this.props.src}
                width={this.imageWidth || 'auto'}
                height={this.imageHeight || 'auto'}
            ></img>
            <div style={ {
                position: "absolute",
                top: '50%',
                left: '50%',
                transform: 'translateY(-50%) translateX(-50%)',
                width: this.imageWidth || 'auto',
                height: this.imageHeight || 'auto',
            }
            }>
                { this.childrenWithProps }
            </div>
        </div> 
        );
    }
}


// InteractiveMap.PropTypes = {
//     position: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
// }


export default InteractiveMap;