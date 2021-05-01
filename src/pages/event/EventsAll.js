import {
  Flex,
  VStack,
  Box,
  Heading,
  Image,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useFormik, Form } from "formik";
import EventsSummary from "../../components/events/EventsSummary";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/EventsAll";
import EventService from "src/services/event.service";
import { InfoIcon, EditIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import MyTable from "src/components/table";

const fetchEventsData = EventService.getAllEvents();

// const eventData = {
//   eventName: "tytul",
//   eventDescription: "opis 123",
//   eventImage: "",
// };

const cellWidths = [
  ["25%"],
  ["30%", "40%"],
  ["25%", "15%"],
  ["5%", "4%"],
  ["5%", "4%"],
];
export function Events() {
  const { t, i18n } = useTranslation(["common", "eventsList"]);
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
    <VStack {...styles.vStack}>
      <Heading fontSize="3xl" textAlign="center">
        {t("eventsList:main.heading")}
      </Heading>
      <Flex {...styles.flexContainerForTable}>
        <Box {...styles.flexItem}>
          <Heading {...styles.text}>{t("eventsList:main.eventsList")}</Heading>
          <Text {...styles.text}>
            aaaaaaaaaaaaaaaaaaa{/* {eventData.eventName} */}
          </Text>
          <Divider size="40px"></Divider>
        </Box>

        <Box {...styles.flexItem}>
          <Heading {...styles.text}>{t("event:main.showEvents")}</Heading>

          <Divider size="40px"></Divider>

          <MyTable
            columnsWidth={cellWidths}
            data={data}
            labels={headers}
            onCellsClick={callbacks}
          />
        </Box>
      </Flex>
    </VStack>
  );
}
