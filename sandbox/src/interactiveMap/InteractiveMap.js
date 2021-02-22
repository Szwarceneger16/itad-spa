import React, { createRef  } from "react";
import PropTypes from 'prop-types';
import './';

class InteractiveMap extends React.Component {
    constructor(props) {
        super(props);

        // this.childrenWithProps = React.Children.map(this.props.children, child => {
        //     // checking isValidElement is the safe way and avoids a typescript error too
        //     if (React.isValidElement(child)) {
        //         return React.cloneElement(child, { position: 'absolute',
        //             className: child.className + ' AnimateImage-child',
        //             ...this.props.
        //         });
        //     }
        //     return child;
        // });
    }

    render() {
        this.props.elements.forEach(element => {
            
        });

        return ( 
        <div
            style={ { position: 'relative' } }
        >
            { this.props.children }
        </div> 
        );
    }
}

InteractiveMap.PropTypes = {
    position: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
}


export default InteractiveMap;