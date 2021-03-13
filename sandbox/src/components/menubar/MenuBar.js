import { Transition } from 'react-transition-group';
import React, { useState,createRef,useReducer, useEffect } from 'react';
import {
    Image,
    Box,
    Button,
    Tooltip
} from '@chakra-ui/react';
import logo_h from './../../img/logo_dotnet_vertically_arm.svg';

const initialState = { isExtended: Array(4).fill(false),};

function reducer(state, action) {
    let result;
  switch (action.type) {
      
    case 'extend/0':
        result = Array(4).fill(false);
        result[0] = true;
      return { isExtended: result};
    case 'extend/1':
        result = Array(4).fill(false);
        result[1] = true;
      return { isExtended: result};
    case 'extend/2':
        result = Array(4).fill(false);
        result[2] = true;
      return { isExtended: result};
    case 'extend/3':
        result = Array(4).fill(false);
        result[3] = true;
      return { isExtended: result};
    case 'collapse':
      return { isExtended: Array(4).fill(false),};
    default:
        debugger;
      throw new Error();
  }
}

function createAnimationProperties (x,y,offY,offX=0) {
    this.duration= 300;
    this.defaultStyle= {
        transition: `transform ${this.duration}ms ease-in-out`,
        opacity: 1,
    };
    this.transitionStyles= {
        entering: { transform: 'translate('+(offX+x)+'px,'+(offY+y)+'px)' },
        entered:  { transform: 'translate('+(offX+x)+'px,'+(offY+y)+'px)'  },
        exiting:  { transform: 'translate('+offX+'px,'+(offY)+'px)'  },
        exited:  { transform: 'translate('+offX+'px,'+(offY)+'px)'  },
    };
    this.tooltips = [
        "",
        "",
        "",
        ""
    ]
};

const animationProps = [
    new createAnimationProperties(-20,-15,-90),
    new createAnimationProperties(-20,-10,-33,-30),
    new createAnimationProperties(-20,10,33,-30),
    new createAnimationProperties(-20,15,90),
]

const crownStyle = {
    right: '0px',
    position:'absolute',
    w:'50px',
    h:'50px'
}
crownStyle.top = Number.parseInt(crownStyle.h)*2.2;

function MenuPanel(params) {
    const [extend, dispatchExtend] = useReducer(reducer, initialState);
    let childs = extend.isExtended.map( (element,index) => { 
            return(
            <MenuCrown 
            inProp={element}
            key={index}
            onMouseEnter={() => dispatchExtend({type:'extend/'+index})}
            animationProps={animationProps[index]} 
            alt={index}
            src={logo_h}
            transform={`rotate(${40-(20*(index >= extend.isExtended.length/2 ? index+1 : index))}deg)`}
            {...crownStyle}
        />
    )})
    console.log('aa');

    return (
        <Box onMouseLeave={() => dispatchExtend({type:'collapse'})} 
            position='fixed' top={"50%"} w='100px' h={crownStyle.top*2.5+'px'} transform='translate(0,-50%)' right='0px'>
            {childs}
            {/* <Button position='absolute' transform='translate(0,-50%)' top='0px'  onClick={change} >CLick</Button> */}
        </Box>
       
    )
}

function MenuCrown( {inProp,animationProps,onMouseEnter,title,w,h,...props} ) {
    const reff = createRef();

    return (
        <Transition in={inProp} nodeRef={reff} timeout={animationProps.duration}>
            {state => (
            <Box ref={reff} style={{
                ...animationProps.defaultStyle,
                ...animationProps.transitionStyles[state]
            }}>
                <Tooltip label="Auto start" placement="left" openDelay={animationProps.duration}>
                    <Image 
                        onMouseEnter={() => onMouseEnter()} 
                        w={w} h={h} 
                        {...(title !== undefined ? {title: props.alt} : {})} 
                        {...props} />
                </Tooltip>
            </Box>
            )}
        </Transition>
    )
}

function Crown({animationProps,title,w,h,...props}) {
    const [ hover , setHover ] = useState(false);
    const change = () =>  {
        setHover(!hover)
    };
    const reff = createRef();

    return (
        <Transition in={hover} nodeRef={reff} timeout={animationProps.duration}>
            {state => (
            <Box ref={reff} style={{
                ...animationProps.defaultStyle,
                ...animationProps.transitionStyles[state]
            }}>
                
                <Tooltip label="Auto start" placement="left">
                <Image onMouseLeave={change} onMouseEnter={change} w={w} h={h} {...(title === undefined ? {title: props.alt} : {})} {...props} />
                </Tooltip>
            </Box>
            )}
        </Transition>
        
    )
}

export default MenuPanel;