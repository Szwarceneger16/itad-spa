import {
    Popover,PopoverTrigger,PopoverContent,PopoverArrow,
    PopoverHeader,PopoverCloseButton,PopoverBody,PopoverFooter,
    Button,useDisclosure,
    IconButton,useBreakpointValue,useMergeRefs
  } from '@chakra-ui/react';
  import { 
    AddIcon 
  } from "@chakra-ui/icons";
import React, { useEffect } from "react";
import  FocusLock from "react-focus-lock"

export default function ({label,edit,OnOpen,OnClose,defaultIsOpen,/* initialFocusRef, */component,initialValues}) {
    const { onOpen, onClose, isOpen } = useDisclosure({defaultIsOpen: defaultIsOpen});
    const  _initialFocusRef  = React.useRef(null);
    //const _initialFocusRef = useMergeRefs(innerFirstFieldRef, initialFocusRef)
    const placement = useBreakpointValue({ base: "bottom", md: "right" })
    
    if ( !component) return (<></>);

    useEffect( () => {
      if (initialValues) onOpen();
    },[initialValues])
  
    return (
      <Popover
        isLazy={edit}
        isOpen={isOpen}
        initialFocusRef={_initialFocusRef}
        onOpen={onOpen}
        onClose={() => { 
          onClose();
          if (typeof OnClose === "function") OnClose();
        }}
        placement={placement}
        closeOnBlur={false}
        marginLeft="10px"
        zIndex="1000"
      >
        <PopoverTrigger>
          <Button rightIcon={<AddIcon />} 
            size="md" 
            onClick={() => { onOpen(); } }
            >{label}</Button>
          {/* <Button>asdas</Button> */}
        </PopoverTrigger>
        <PopoverContent p={1} w="min-content">
          <PopoverArrow />
          <PopoverHeader>{label}</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody >
             <FocusLock returnFocus persistentFocus={false}>
              <PopoverArrow />
              <PopoverCloseButton />
              {React.createElement(component,{
                firstFieldRef: _initialFocusRef,
                onCancel: () => {onClose(); OnClose(); } ,
                initialValues: initialValues
              })}
            </FocusLock>
          </PopoverBody>
        </PopoverContent>
  
      </Popover>
    )
  }