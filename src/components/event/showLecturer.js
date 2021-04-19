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
  import React, { Suspense } from "react";
  import { useTranslation } from 'react-i18next';
  import * as Yup from 'yup';
import styles from "./style";

export default function (params) {
    
    const { t, i18n } = useTranslation(['common','eventDetails']);
    return (
        <>

        <Table {...styles.table} >
            <Thead d="block">
                <Tr w="100%" d="block">
                <Th {...styles.th("25%")}><Text {...styles.thText}>{t('eventDetails:lecture.firstname')}</Text></Th>
                <Th {...styles.th("25%")} ><Text {...styles.thText}>{t('eventDetails:lecture.secondName')}</Text></Th>
                <Th {...styles.th("40%")} ><Text {...styles.thText}>{t('eventDetails:lecture.description')}</Text></Th>
                <Th {...styles.th("10%")} ><Text {...styles.thText}>Photo</Text></Th>
                </Tr>
            </Thead>
            <Tbody >
                {Array(10).fill("").map( (el,index) => (
                <Tr key={index}>
                    <Td {...styles.td("25%")} ><Text {...styles.tdText}>'some data'</Text></Td>
                    <Td {...styles.td("25%")} ><Text {...styles.tdText}>'some data'</Text></Td>
                    <Td {...styles.td("40%")} ><Text {...styles.tdText}>'some data'</Text></Td>
                    <Td {...styles.td("10%")} ><Image w="100%" margin="auto" fallbackSrc="https://bit.ly/sage-adebayo" alt="Segun Adebayo" /></Td>
                </Tr>
                ))}
            </Tbody>
        </Table>
        </>
    )
}