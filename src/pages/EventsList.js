import { Flex, 
  VStack, 
  Box, 
  Heading, 
  Image,
  Text,
  Divider,
  
} from '@chakra-ui/react';
import { useFormik,Form } from "formik";
import ShowEvents from '../components/eventList/showEvents';
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import InputPopover from "../components/forms/InputPopover";
import { InputFile } from '../components/forms/InputElements';
import styles from './styles/EventDetailsStyle.js'

const eventData = {
  eventName: "tytul",
  eventDescription: "opis 123",
  eventImage: ""
}

export function EventsList() {
  const { t, i18n } = useTranslation(['common','eventsList']);

  // const formik = useFormik({
  //   initialValues: {
  //     eventName: '',
  //     eventDescription: '',
  //     file: '',
  //   },
  //   onSubmit: values => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  return (
      <VStack spacing={8} mx="auto" w="100%" py={12} px={0} p={0} m={0}>
        <Heading fontSize="3xl" textAlign="center">
          {t('eventsList:main.heading')}
        </Heading>
        <Flex {...styles.flexContainer}>

            
            <Box {...styles.flexItem}>
              <Heading {...styles.text}>{t('eventsList:main.eventsList')}</Heading>
              <Text {...styles.text}>{eventData.eventName}</Text>
              <Divider size="40px"></Divider>

            </Box>

            <Box {...styles.flexItem} {...styles.flexItemTable}>

              <ShowEvents />
            </Box>

        </Flex >
      </VStack>
  );
}

