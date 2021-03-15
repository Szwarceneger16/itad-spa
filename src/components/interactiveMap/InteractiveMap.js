import React from "react";
import PropTypes from 'prop-types';
import ImageAnimated from './ImageAnimated.js';
import './InteractiveMap.css';

const containersParametrs = {
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
}

class InteractiveMap extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            imageWidth: '0px',
            imageHeight: '0px',
        }

        this.childrenWithProps = React.Children.map(this.props.children, (child,index) => {
            // checking isValidElement is the safe way and avoids a typescript error too
            if (React.isValidElement(child)) {
                
                return (
                    <ImageAnimated
                        key={index}
                        coords={this.props.childParametrs[index].coord}
                        width={this.props.childParametrs[index].width ||
                            this.props.defaultChildProps.width
                        }
                        height={this.props.childParametrs[index].height || ''}
                        animationClass={
                            this.props.childParametrs[index].animationClass ||
                            this.props.defaultChildProps.animationClass
                        }
                    >
                        {child}
                    </ImageAnimated>
                );
            }
        });

        this.setImageDemmensions = this.setImageDemmensions.bind(this);
        this.calcRatio = this.calcRatio.bind(this);
    }

    calcRatio (naturalWidth,naturalHeight,fontSize) {
        let widthRatio,heightRatio,imageRatio;
        
        if ( /px/.test(this.props.width) ) {
            widthRatio =  Number.parseFloat(this.props.width)/naturalWidth;
            heightRatio = Number.parseFloat(this.props.height)/naturalHeight;
        } else {
            widthRatio = (Number.parseFloat(this.props.width)*fontSize)/naturalWidth;
            heightRatio = (Number.parseFloat(this.props.height)*fontSize)/naturalHeight;
        }
        
        if (widthRatio && heightRatio) {
            imageRatio = widthRatio < heightRatio ? widthRatio : heightRatio;
        } else {
            imageRatio = widthRatio ? widthRatio : heightRatio;
        }
            
        this.setState({
            imageWidth: imageRatio * naturalWidth,
            imageHeight: imageRatio * naturalHeight,
        })
    }

    setImageDemmensions (element) { 
        if( !element) return;
        //debugger;
        const fontSize = Number.parseFloat(getComputedStyle( element).fontSize);
        const img = new Image();
        const calcRatio = this.calcRatio;
        img.onload = function() { 
            calcRatio(this.naturalWidth,this.naturalHeight,fontSize) };
        img.src = this.props.backgroundSrc;   
    }

    render() {

        //debugger;
        return ( 
        <div
            ref={this.setImageDemmensions}
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
                    ...containersParametrs,
                }}
                src={this.props.backgroundSrc}
                width={this.state.imageWidth}
                height={this.state.imageHeight}
            ></img>
            <div style={ {
                ...containersParametrs,
                width: this.state.imageWidth,
                height: this.state.imageHeight,
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

// let newProps = {};
// for (const [key,val] of Object.entries(this.props.defaultChildProps)) {
//     if ( !this.props.childParametrs[index][key] ) {
//         newProps[key] = val;
//     }
// }
// let newChild = Object.keys(newProps).length > 0 ? React.cloneElement(child, newProps) : child;


export default InteractiveMap;