import { Flex, 
  VStack, 
  Box, 
  Heading, 
  Image,
  Text,
  Divider,
  Popover,PopoverTrigger,PopoverContent,PopoverArrow,
  PopoverHeader,PopoverCloseButton,PopoverBody,PopoverFooter,
  Button,useDisclosure,
  IconButton,useBreakpointValue
} from '@chakra-ui/react';
import { 
  AddIcon 
} from "@chakra-ui/icons";
import ShowLecturer from '../components/event/showLecturer';
import ShowLecture from '../components/event/showLecture';
import AddLecture from '../components/event/addLecture';
import AddLecturer from '../components/event/addLecturer';
import React, { Suspense } from "react";
import { useTranslation } from 'react-i18next';
import  FocusLock from "react-focus-lock"

const styles = {
  flexContainer: {
    wrap:"wrap",
    direction:"row",
    w:["100%","100%","90%"],
    p: 1 ,
    m: 2,
    justifyContent: "center",
    
  },
  flexItem:{
    p:[0,1,2],
    w:["xs","xs","sm","md"],
    display: "block",
    my: 8,
    mx: 2
    // overflow: "hidden"
  },
  flexItemTable: {
    w:["100%","100%","700px"],
    h:["80vh","80vh","60vh"],
  },
  text: {
    fontSize: ["xs","sm","md"],
    textAlign: "center"
  },
  
}

const AddPopover = function ({label,children}) {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null);
  const placement = useBreakpointValue({ base: "bottom", md: "right" })
  
  if ( !children) return (<></>);
  

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      placement={placement}
      closeOnBlur={false}
      marginLeft="10px"
      zIndex="1000"
    >
      <PopoverTrigger>
        <Button rightIcon={<AddIcon />} size="md" >{label}</Button>
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
            {React.cloneElement(children,{
              firstFieldRef: firstFieldRef,
              onCancel:onClose 
            })}
          </FocusLock>
        </PopoverBody>
      </PopoverContent>

    </Popover>
  )
}

export function EventDetails() {
  const { t, i18n } = useTranslation(['common','eventDetails']);

  return (
      <VStack spacing={8} mx="auto" w="100%" py={12} px={0} p={0} m={0}>
        <Heading fontSize="3xl" textAlign="center">
          {t('eventDetails:main.heading')}
        </Heading>
        <Flex {...styles.flexContainer}>

            <Box w="xs" {...styles.flexItem}>
              <Image  fallbackSrc="https://bit.ly/sage-adebayo" alt="Segun Adebayo" />
            </Box>
            
            <Box {...styles.flexItem}>
              <Text {...styles.text}>{t('eventDetails:main.eventName')}</Text>
              <Divider size="40px"></Divider>
              <Text {...styles.text}>{t('eventDetails:main.Description')}</Text>
            </Box>

            <Box {...styles.flexItem} {...styles.flexItemTable}>
              <Text {...styles.text}>{t('eventDetails:main.showLecture')}</Text>
              <AddPopover label={t('eventDetails:main.addLecture')}><AddLecture /></AddPopover>
              <Divider size="40px"></Divider>

              <ShowLecture />
            </Box>

            <Box {...styles.flexItem} {...styles.flexItemTable} >
              <Text {...styles.text}>{t('eventDetails:main.showLecturer')}</Text>
              <AddPopover label={t('eventDetails:main.addLecture')}><AddLecturer /></AddPopover>
              <Divider size="40px"></Divider>
              <ShowLecturer />
            </Box>

        </Flex >
      </VStack>
  );
}

