import { Flex, 
    VStack, 
    Box, 
    Heading, 
    Grid,
    Image,
    Text,
    Divider,
    GridItem, 
    Wrap,
    WrapItem,
    Table,Th,Tr,Thead,Tbody,TableCaption, Td
  } from '@chakra-ui/react';
  import React, { useEffect, useRef, useState } from "react";
  import { useTranslation } from 'react-i18next';
  import InputPopover from "../forms/InputPopover";
  import FormEvent from './formEvent'
  import * as Yup from 'yup';
  import styles from "./style";

export default function (params) {
    const { t, i18n } = useTranslation(['common','eventsList']);
    const [initialFormValues,setInitialFormvalues] = useState(null);

    const initEditPopover = (el) => {
        const values = {
            id: el,
            eventName: "nazwa eventu",
            eventDescription: "opis 123123",
            eventDate: undefined,
            // eventImage: undefined,
        };
        setInitialFormvalues(values);
    }

    return (

        <>
            <Heading {...styles.text}>{t('eventsList:main.showLecture')}</Heading>
            <InputPopover 
                defaultIsOpen={!!initialFormValues}
                //OnOpen={() => setOpenPopover(true)} 
                OnClose={() => { setInitialFormvalues(null); }} 
                label={ initialFormValues ? t('eventsList:main.editLecture') : t('eventsList:main.addLecture')}
                component={FormEvent}
                initialValues={initialFormValues}
            />

            <Divider size="40px"></Divider>

            <Table {...styles.table} >
                <Thead d="block">
                    <Tr w="100%" d="block">
                    <Th {...styles.th("30%")}><Text {...styles.thText}>{t('eventsList:event.name')}</Text></Th>
                    <Th {...styles.th("20%")} ><Text {...styles.thText}>{t('eventsList:event.description')}</Text></Th>
                    <Th {...styles.th("20%")} ><Text {...styles.thText}>{t('eventsList:event.date')}</Text></Th>
                    <Th {...styles.th("20%")} ><Text {...styles.thText}>{t('eventsList:event.image')}</Text></Th>
                    </Tr>
                </Thead>
                <Tbody >
                    {Array(10).fill("").map( (el,index) => (
                    <Tr 
                        key={index}
                        onClick={() => initEditPopover(index)}
                    >
                        <Td {...styles.td("md")} ><Text {...styles.tdText}>'some data'</Text></Td>
                        <Td {...styles.td("4xl")} ><Text {...styles.tdText}>{'somedata '.repeat(10)}</Text></Td>
                        <Td {...styles.td("xs")} ><Text {...styles.tdText}>'some data'</Text></Td>
                        <Td {...styles.td("xs")} ><Text {...styles.tdText}>'some data'</Text></Td>
                    </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
        // </Box>
    )
}