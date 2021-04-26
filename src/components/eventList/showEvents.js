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
import { Icon } from '@material-ui/core';
import { InfoIcon } from '@chakra-ui/icons';
import { useHistory } from "react-router-dom";

export default function (params) {
    const { t, i18n } = useTranslation(['common','eventsList']);
    const [initialFormValues,setInitialFormvalues] = useState(null);
    let history = useHistory();

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
            <Heading {...styles.text}>{t('eventsList:main.showEvents')}</Heading>
            <InputPopover 
                defaultIsOpen={!!initialFormValues}
                //OnOpen={() => setOpenPopover(true)} 
                OnClose={() => { setInitialFormvalues(null); }} 
                label={ initialFormValues ? t('eventsList:main.editEvent') : t('eventsList:main.addEvent')}
                component={FormEvent}
                initialValues={initialFormValues}
            />

            <Divider size="40px"></Divider>

            <Table {...styles.table} >
                <Thead d="block">
                    <Tr w="100%" d="block">
                    <Th {...styles.th("30%")}><Text {...styles.thText}>{t('eventsList:event.name')}</Text></Th>
                    <Th {...styles.th("25%")} ><Text {...styles.thText}>{t('eventsList:event.description')}</Text></Th>
                    <Th {...styles.th("25%")} ><Text {...styles.thText}>{t('eventsList:event.date')}</Text></Th>
                    <Th {...styles.th("10%")} ><Text {...styles.thText}>{t('eventsList:event.info')}</Text></Th>
                    </Tr>
                </Thead>
                <Tbody >
                    {Array(10).fill("").map( (el,index) => (
                    <Tr 
                        key={index}
                        onClick={() => initEditPopover(index)}
                    >
                        <Td {...styles.td("30%")} ><Text {...styles.tdText}>'some data'</Text></Td>
                        <Td {...styles.td("25%")} ><Text {...styles.tdText}>{'somedata '.repeat(10)}</Text></Td>
                        <Td {...styles.td("25%")} ><Text {...styles.tdText}>'some data'</Text></Td>
                        <Td {...styles.td("10%")} ><Text {...styles.tdText}>
                            <Icon 
                                onClick={ (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    history.push('/eventDetails/1')
                                }}
                            >
                                <InfoIcon />
                            </Icon>
                        </Text></Td>
                    </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
        // </Box>
    )
}