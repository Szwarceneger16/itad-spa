import { Flex, 
  VStack, 
  Box, 
  Heading, 
  Image,
  Text,
  Divider,
  
} from '@chakra-ui/react';
import { useFormik,Form } from "formik";
import ShowLecturer from '../components/eventDetails/showLecturer';
import ShowLecture from '../components/eventDetails/showLecture';
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import InputPopover from "../components/forms/InputPopover";
import { InputFile } from '../components/forms/InputElements';
import { 
  useParams
 } from "react-router-dom";
import styles from './styles/EventDetailsStyle.js'

// const labelStyle = {
//   fontFamily:'sans-serif',
//   color:'orange.600',
//   fontSize:[14,16,18]
// }


// const EditWrapper = ({children,editComponent,formik, ...props}) => {
//   const [ isEdit, setEdit ] = useState(false);

//   useEffect( () => {} ,[isEdit])
//   const newProps = isEdit ? { d: "none"} : { d: "block"};
//   return (
//     <Box {...props} onDoubleClick={() => setEdit(true)}>
//       <Form {...formik}>
//       {React.cloneElement(children, (isEdit ? { d: "none"} : { d: "block"}) )}
//       {isEdit && React.createElement(editComponent, {
//         labelStyle: labelStyle,
//         fieldName: formik.fieldName,
//         accept:"image/png, image/jpeg",
//         labels: {
//           inputTitle: "asdasd" /* t('addLecturer:input.file.title') */,
//           buttonTitle: "sadad" /* t('addLecturer:input.file.Button') */,
//         }
//       })}
//       </Form>
//     </Box>
//   )
// }
const eventData = {
  eventName: "tytul",
  eventDescription: "opis 123",
  eventImage: ""
}

export function EventDetails() {
  const { t, i18n } = useTranslation(['common','eventDetails']);
  const { eventId } = useParams();

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
          {t('eventDetails:main.heading') + ` ${eventId} `}
        </Heading>
        <Flex {...styles.flexContainer}>

            <Box w="xs" {...styles.flexItemImage}>
              <Image fallbackSrc="https://bit.ly/sage-adebayo" alt="Segun Adebayo" />
            </Box>
            {/* <EditWrapper w="xs" formik={formik} {...styles.flexItem} editComponent={InputFile}>
              <Image fallbackSrc="https://bit.ly/sage-adebayo" alt="Segun Adebayo" />
            </EditWrapper> */}
            
            <Box {...styles.flexItem}>
              <Heading {...styles.text}>{t('eventDetails:main.eventName')}</Heading>
              <Text {...styles.text}>{eventData.eventName}</Text>
              <Divider size="40px"></Divider>

              <Divider size="40px"></Divider>
              <Heading {...styles.text}>{t('eventDetails:main.Description')}</Heading>
              <Text {...styles.text}>{eventData.eventDescription}</Text>
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

