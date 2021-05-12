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
//import EventsSummary from "../../components/events/EventsSummary.js.bak";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/EventsAll";
import { useEventsData } from "src/hooks/useEventData.js";
import { InfoIcon, EditIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import MyTable from "src/components/table";
import * as DateFns from "date-fns";
import { Button } from "@material-ui/core";

// const eventData = {
//   eventName: "tytul",
//   eventDescription: "opis 123",
//   eventImage: "",
// };

const cellWidths = [
  ["25%", "25%"],
  ["30%", "40%"],
  ["25%", "15%"],
  ["5%", "4%"],
  ["5%", "4%"],
];
export function Events() {
  const { t, i18n } = useTranslation(["common", "eventsList"]);
  let eventsData = useEventsData();
  let history = useHistory();

  const infoIcon = <InfoIcon />;
  const editIcon = <EditIcon />;

  const loadingData = [
    [
      t("common:message.waitingForData"),
      t("common:message.waitingForData"),
      t("common:message.waitingForData"),
      "",
      "",
    ],
  ];
  const headers = [
    t("event:summary.name"),
    t("event:summary.description"),
    t("event:summary.date"),
    infoIcon,
    editIcon,
  ];

  const callbacks = [
    {
      cellNumber: 4,
      callback: (dataRowNumber) => {
        history.push("/event/modify/" + eventsData[dataRowNumber].eventId);
      },
    },
    {
      cellNumber: 3,
      callback: (dataRowNumber) => {
        history.push("/event/detail/" + eventsData[dataRowNumber].eventId);
      },
    },
  ];

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
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              history.push("/event/modify");
            }}
          >
            {t("event:main.button.addEvent")}
          </Button>
        </Box>

        <Box {...styles.flexItem}>
          <Heading {...styles.text}>{t("event:main.showEvents")}</Heading>

          <Divider size="40px"></Divider>

          <MyTable
            columnsWidth={cellWidths}
            data={
              eventsData
                ? eventsData.map((eventData, index) => [
                    eventData.name,
                    eventData.description,
                    eventData.startDate &&
                      DateFns.format(eventData.startDate, "MM-dd-yyyy"),
                    infoIcon,
                    editIcon,
                  ])
                : loadingData
            }
            labels={headers}
            onCellsClick={callbacks}
          />
        </Box>
      </Flex>
    </VStack>
  );
}
