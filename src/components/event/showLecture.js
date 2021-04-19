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
        // <Box h={styles.table.h} d={styles.table.d} overflowY={styles.table.overflowY}>
        <Table {...styles.table} >
            <Thead d="block">
                <Tr w="100%" d="block">
                <Th {...styles.th("30%")}><Text {...styles.thText}>{t('eventDetails:lecture.name')}</Text></Th>
                <Th {...styles.th("30%")} ><Text {...styles.thText}>{t('eventDetails:lecture.description')}</Text></Th>
                <Th {...styles.th("20%")} ><Text {...styles.thText}>{t('eventDetails:lecture.startTime')}</Text></Th>
                <Th {...styles.th("20%")} ><Text {...styles.thText}>{t('eventDetails:lecture.endTime')}</Text></Th>
                </Tr>
            </Thead>
            <Tbody >
                {Array(10).fill("").map( (el,index) => (
                <Tr key={index}>
                    <Td {...styles.td("md")} ><Text {...styles.tdText}>'some data'</Text></Td>
                    <Td {...styles.td("4xl")} ><Text {...styles.tdText}>{'somedata '.repeat(10)}</Text></Td>
                    <Td {...styles.td("xs")} ><Text {...styles.tdText}>'some data'</Text></Td>
                    <Td {...styles.td("xs")} ><Text {...styles.tdText}>'some data'</Text></Td>
                </Tr>
                ))}
            </Tbody>
        </Table>

        // </Box>
    )
}