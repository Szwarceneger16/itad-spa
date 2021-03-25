import { CSSTransitionGroup, Transition  } from 'react-transition-group';
import React, { useState,createRef,useReducer, useEffect, useRef } from 'react';
import {
    Image,
    Box,
    Button,
    Tooltip
} from '@chakra-ui/react';
import crowns from '../../img/crowns';
import {
    crownsGenerator,
    disableScroll,
    enableScroll
} from './dependencies.js';

const crownStyle = {
    w:'100px',
    h:'100px'
}

function MenuPanel( {circleRadius = 150, crownsNumber= 8 , ...props} ) {
    const refs = Array();

    const [ initialCrownsState , getNextCorwnsState] = crownsGenerator(refs,circleRadius,crownsNumber);

    const childs = initialCrownsState.map( (element,index) => { 
        return(
        <MenuCrown 
        top={circleRadius-element.y}
        right={element.x}
        reff={el => refs.push(el)}
        key={index+""}
        active={element.active}
        alt={index+"_"+element.imageNumber}
        src={crowns[element.imageNumber]}
        transform={'rotate('+element.rotate+'deg)'}
        {...crownStyle}
    />
    )}); 

    return (
        <Box
            onWheel={ (e) => {
                getNextCorwnsState(e.deltaY < 0, crowns);
                //console.log(refs[0].current.style);
            }}
            onMouseEnter={ () => disableScroll()}
            onMouseLeave={ () => enableScroll()}
            zIndex='1000'
            position='fixed' 
            top={"50%"} 
            w={circleRadius*1.1} 
            h={2*circleRadius*1.1} 
            transform='translate(50%,-50%)' 
            right='0px'>
            {childs}
        </Box>
    )
}

function MenuCrown( {top,right,reff,active,inProp,title,w,h,alt,...props} ) {

    return (
        <Box ref={reff} key={props.alt} position="absolute" 
            w={w} h={h} top={top} right={right} /* ref={reff} */>
            <Tooltip isDisabled={!active} label={alt} placement="left">
                <Image 
                    w={w} h={h} 
                    {...(title !== undefined ? {title: props.alt} : {})} 
                    {...props} />
            </Tooltip>
        </Box>
    )
}

export default MenuPanel;