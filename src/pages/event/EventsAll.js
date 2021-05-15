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
import { InfoIcon, EditIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import MyTable from "src/components/table";
import * as DateFns from "date-fns";
import { Button } from "@material-ui/core";
import { GetUserId } from "src/selectors";
import eventService from "src/services/event.service";

// const eventData = {
//   eventName: "tytul",
//   eventDescription: "opis 123",
//   eventImage: "",
// };

const ownsEventTableCellWidths = [
  ["25%", "25%"],
  ["30%", "40%"],
  ["25%", "15%"],
  ["5%", "4%"],
  ["5%", "4%"],
];
const otherEventTableCellWidths = [
  ["25%", "25%"],
  ["35%", "40%"],
  ["25%", "15%"],
  ["5%", "4%"],
];

export function Events() {
  const { t, i18n } = useTranslation(["common", "events"]);
  let eventsData = useEventsData();
  let history = useHistory();
  const userID = GetUserId();

  const infoIcon = <InfoIcon />;
  const editIcon = <EditIcon />;
  const checkCircleIcon = <CheckCircleIcon />;

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
    t("events:event.summary.name"),
    t("events:event.summary.description"),
    t("events:event.summary.date"),
    infoIcon,
    editIcon,
  ];
  const otherEventTableHeaders = [
    t("events:event.summary.name"),
    t("events:event.summary.description"),
    t("events:event.summary.date"),
    infoIcon,
  ];

  const ownsEventTableCallbacks = [
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

  const otherEventTableCallbacks = [
    {
      cellNumber: 3,
      callback: (dataRowNumber) => {
        // history.push("/event/detail/" + eventsData[dataRowNumber].eventId);
        eventService.registerOnEvent(eventsData[dataRowNumber].eventId).catch();
      },
    },
  ];
  const otherEventTableCallback = (dataRowNumber) => {
    // history.push("/event/detail/" + eventsData[dataRowNumber].eventId);
    history.push("/event/detail/" + eventsData[dataRowNumber].eventId);
  };

  return (
    <VStack {...styles.vStack}>
      <Heading fontSize="3xl" textAlign="center">
        {t("events:event.eventsList.heading")}
      </Heading>
      <Flex {...styles.flexContainerForTable}>
        <Box {...styles.flexItem}>
          <Heading {...styles.text}>{t("events:event.eventsList.eventsListName")}</Heading>
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
            {t("events:event.main.button.addEvent")}
          </Button>
        </Box>
        <Box {...styles.flexItem}>
          <Heading {...styles.text}>
            {t("events:event.main.yourEvents")}
          </Heading>

          <Divider size="40px"></Divider>

          <MyTable
            columnsWidth={ownsEventTableCellWidths}
            data={
              eventsData
                ? eventsData
                    .filter((eventData) => eventData.owner.userId === userID)
                    .map((eventData) => [
                      eventData.name,
                      eventData.description,
                      eventData.startDate &&
                        DateFns.format(eventData.startDate, "MM-dd-yyyy"),
                      infoIcon,
                      editIcon,
                    ])
                : loadingData
            }
            labels={otherEventTableHeaders}
            onCellsClick={ownsEventTableCallbacks}
          />
        </Box>
        <Box {...styles.flexItem}>
          <Heading {...styles.text}>{t("events:event.main.showEvents")}</Heading>

          <Divider size="40px"></Divider>

          <MyTable
            columnsWidth={otherEventTableCellWidths}
            data={
              eventsData
                ? eventsData
                    .filter((eventData) => eventData.owner.userId !== userID)
                    .map((eventData, index) => [
                      eventData.name,
                      eventData.description,
                      eventData.startDate &&
                        DateFns.format(eventData.startDate, "MM-dd-yyyy"),
                      checkCircleIcon,
                    ])
                : loadingData
            }
            labels={otherEventTableHeaders}
            onCellsClick={otherEventTableCallbacks}
            onRowClick={otherEventTableCallback}
          />
        </Box>
      </Flex>
    </VStack>
  );
}
