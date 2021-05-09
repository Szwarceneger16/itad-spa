import {
  Flex,
  VStack,
  Box,
  Heading,
  Image,
  Text,
  Divider,
} from "@chakra-ui/react";
import EventForm from "src/components/events/EventForm";
import { useTranslation } from "react-i18next";
import styles from "./styles/EventsAll.js";
import { useParams } from "react-router-dom";
import React from "react";

const eventData = {
  eventName: "tytul",
  eventDescription: "opis 123",
  eventImage: "",
};

export function EventAddEdit() {
  const { t, i18n } = useTranslation(["common", "events"]);
  const params = useParams();
  // @ts-ignore
  const eventId = Number(params.eventId);

  return (
    <VStack {...styles.vStack}>
      <Heading fontSize="3xl" textAlign="center">
        {t("event:main.heading")}
      </Heading>
      <Flex {...styles.flexContainer}>
        <Box {...styles.flexItem}>
          <Heading {...styles.text}>
            {t("events:EventModify.main.subheading")}
          </Heading>
          <Text {...styles.text}>{eventData.eventName}</Text>
          <Divider size="40px"></Divider>
        </Box>

        <Box {...styles.flexItem} {...styles.flexItemTable}>
          <EventForm eventId={eventId} />
        </Box>
      </Flex>
    </VStack>
  );
}
