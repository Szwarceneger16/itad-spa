import { Flex, 
  VStack, 
  Box, 
  Heading, 
  Image,
  Text,
  Divider,
} from '@chakra-ui/react';

import ShowLecturer from '../components/event/showLecturer';
import ShowLecture from '../components/event/showLecture';
import React, { Suspense } from "react";
import { useTranslation } from 'react-i18next';
import InputPopover from "../components/forms/InputPopover";

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

              <ShowLecture />
            </Box>

            <Box {...styles.flexItem} {...styles.flexItemTable} >
              
              <ShowLecturer />
            </Box>

        </Flex >
      </VStack>
  );
}

