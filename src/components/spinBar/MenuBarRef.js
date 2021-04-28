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

function MenuPanel( {circleRadius = 150, crownsNumber= 8,
    onClicksFunctions,right, ...props} ) {

    const refs = Array();
    const [ initialCrownsState , getNextCrownsState] = crownsGenerator(refs,circleRadius,crownsNumber);
    const boxWidth = circleRadius*1.5, boxHeight = circleRadius*1.3;

    //console.log(onClicksFunctions)
    const childs = initialCrownsState.map( (element,index) => { 
        //debugger;
        return(
        <MenuCrown 
        top={ (circleRadius-element.y)}
        right={element.x}
        reff={el => refs.push(el)}
        key={index+""}
        active={element.active}
        alt={index+"_"+element.imageNumber}
        src={crowns[element.imageNumber]}
        transform={'rotate('+element.rotate+'deg)'}
        {...crownStyle}
        onClick={onClicksFunctions[index] ?? null}
    />
    )}); 

    return (
        <Box
            position='fixed'
            style={{borderRadius: "20px"}}
            top={"50%"} 
            w={boxWidth} 
            h={boxHeight*2} 
            transform='translate(50%,-50%)' 
            right={right || "0px"}
            >
                <Box position="relative" w={boxWidth}  
                zIndex='1000'
                top={"25%"/* boxHeight/3} h={boxHeight*(1 + 1/3) */}
                bottom={"-25%"}
                onWheel={ (e) => {
                    getNextCrownsState(e.deltaY < 0, crowns);
                    //console.log(refs[0].current.style);
                }}
                onMouseEnter={ () => disableScroll()}
                onMouseLeave={ () => enableScroll()}
                >
                {childs}
                </Box>
        </Box>
    )
}

function MenuCrown( {top,right,reff,active,inProp,title,w,h,alt,onClick,...props} ) {

    return (
        <Box ref={reff} key={props.alt} position="absolute" onClick={onClick}
            w={w} h={h} top={top} right={right}  /* ref={reff} */>
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