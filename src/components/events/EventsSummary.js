import {
  Flex,
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
  Th,
  Tr,
  Thead,
  Tbody,
  TableCaption,
  Td,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import InputPopover from "../forms/InputPopover";
import FormEvent from "./EventForm";
import * as Yup from "yup";
import styles from "./style";
import { Icon } from "@material-ui/core";
import { InfoIcon, EditIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import MyTable from "../table";
import EventService from "src/services/event.service";

const fetchEventsData = EventService.getAllEvents();

const cellWidths = [
  ["25%"],
  ["30%", "40%"],
  ["25%", "15%"],
  ["5%", "4%"],
  ["5%", "4%"],
];
export default function (params) {
  const { t, i18n } = useTranslation(["common", "event"]);
  const [eventsData, setEventsData] = useState([
    t("common:message.waitingForData"),
    t("common:message.waitingForData"),
    t("common:message.waitingForData"),
    "",
    "",
  ]);
  let history = useHistory();

  useEffect(() => {
    fetchEventsData.then((data) => {
      setEventsData(data);
    });
  }, []);

  // const initEditPopover = (el) => {
  //   const values = {
  //     id: el,
  //     eventName: data[el][0],
  //     eventDescription: data[el][1],
  //     eventDate: data[el][2],
  //     // eventImage: undefined,
  //   };
  //   setInitialFormvalues(values);
  // };

  const headers = [
    t("event:summary.name"),
    t("event:summary.description"),
    t("event:summary.date"),
    <InfoIcon />,
    <EditIcon />,
  ];

  const callbacks = [
    {
      cellNumber: 4,
      callback: (dataRowNumber) => {
        history.push("/event/modify/" + dataRowNumber);
      },
    },
    {
      cellNumber: 3,
      callback: (dataRowNumber) => {
        history.push("/event/detail/" + dataRowNumber);
      },
    },
  ];

  const data = [["aaa", "bbb", "ccc", <InfoIcon />, <EditIcon />]];

  return (
    <>
      <Heading {...styles.text}>{t("event:main.showEvents")}</Heading>

      <Divider size="40px"></Divider>

      <MyTable
        columnsWidth={cellWidths}
        data={data}
        labels={headers}
        onCellsClick={callbacks}
      />
    </>
    // </Box>
  );
}
