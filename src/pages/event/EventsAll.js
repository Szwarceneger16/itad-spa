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
  ["35%", "40%"],
  ["25%", "15%"],
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
    ],
  ];

  const onwerEventsData =
    eventsData &&
    eventsData.filter((eventData) => eventData.owner.userId === userID);
  const ownEventTableHeaders = [
    t("events:event.summary.name"),
    t("events:event.summary.description"),
    t("events:event.summary.date"),
    editIcon,
  ];
  const ownEventTableCallback = (dataRowNumber) => {
    history.push("/event/detail/" + onwerEventsData[dataRowNumber].eventId);
  };
  const ownEventTableCallbacks = [
    {
      cellNumber: 4,
      callback: (dataRowNumber) => {
        history.push("/event/modify/" + onwerEventsData[dataRowNumber].eventId);
      },
    },
    // {
    //   cellNumber: 3,
    //   callback: (dataRowNumber) => {
    //     history.push("/event/detail/" + onwerEventsData[dataRowNumber].eventId);
    //   },
    // },
  ];

  const notOwnEventTableHeaders = [
    t("events:event.summary.name"),
    t("events:event.summary.description"),
    t("events:event.summary.date"),
  ];
  const notOwnEventData =
    eventsData &&
    eventsData.filter((eventData) => eventData.owner.userId !== userID);
  const notOwnEventTableCallback = (dataRowNumber) => {
    history.push("/event/detail/" + notOwnEventData[dataRowNumber].eventId);
  };
  // const otherEventTableCallbacks = [
  //   {
  //     cellNumber: 3,
  //     callback: (dataRowNumber) => {
  //       eventService
  //         .registerOnEvent(notOwnEventData[dataRowNumber].eventId)
  //         .catch();
  //     },
  //   },
  // ];

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
              onwerEventsData
                ? onwerEventsData.map((eventData) => [
                    eventData.name,
                    eventData.description,
                    eventData.startDate &&
                      DateFns.format(eventData.startDate, "MM-dd-yyyy"),
                    editIcon,
                  ])
                : loadingData
            }
            labels={ownEventTableHeaders}
            onCellsClick={ownEventTableCallbacks}
            onRowClick={ownEventTableCallback}
          />
        </Box>
        <Box {...styles.flexItem}>
          <Heading {...styles.text}>{t("events:event.main.showEvents")}</Heading>

          <Divider size="40px"></Divider>

          <MyTable
            columnsWidth={otherEventTableCellWidths}
            data={
              notOwnEventData
                ? notOwnEventData.map((eventData, index) => [
                    eventData.name,
                    eventData.description,
                    eventData.startDate &&
                      DateFns.format(eventData.startDate, "MM-dd-yyyy"),
                  ])
                : loadingData
            }
            labels={notOwnEventTableHeaders}
            onRowClick={notOwnEventTableCallback}
          />
        </Box>
      </Flex>
    </VStack>
  );
}
