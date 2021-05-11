import {
  Flex,
  VStack,
  Box,
  Heading,
  Image,
  Text,
  Divider,
  Skeleton,
} from "@chakra-ui/react";
import ShowSpeakers from "src/components/eventDetails/showSpeakers";
import ShowLectures from "src/components/eventDetails/showLectures";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import styles from "./styles/EventDetails";
import MyAccordion from "src/components/accordion";
import { useEventData } from "src/hooks/useEventData";

const eventData = {
  eventName: "tytul",
  eventDescription: "opis 123",
  eventImage: "",
};

export function EventDetails() {
  const { t, i18n } = useTranslation(["common", "events"]);
  const params = useParams();
  const eventId = Number(params.eventId);
  const eventData = useEventData(eventId);
  const history = useHistory();

  if (Number.isNaN(eventId)) {
    // ERORR PAGE
    history.push("/eventsAll");
  }

  return (
    <VStack spacing={8} mx="auto" w="100%" py={12} px={0} p={0} m={0}>
      <Skeleton isLoaded={!!eventData}>
        <Heading fontSize="3xl" textAlign="center">
          {t("events:eventDetails.heading") + ` ${eventId} `}
        </Heading>
        <Flex {...styles.flexContainer}>
          <Box {...styles.flexItem}>
            <Heading {...styles.text}>
              {t("events:eventDetails.eventName")}
            </Heading>
            <Text {...styles.text}>{eventData && eventData.name}</Text>
            <Divider size="40px"></Divider>
          </Box>

          <Box {...styles.flexItem} {...styles.flexItemTable}>
            <MyAccordion
              labels={[
                t("events:eventDetails.accordion.details"),
                t("events:eventDetails.accordion.statistic"),
                t("events:eventDetails.accordion.attendance"),
                t("events:eventDetails.accordion.lecture"),
                t("events:eventDetails.accordion.speakers"),
              ]}
            >
              <Box>
                <Box {...styles.flexItemImage}>
                  <Image
                    src={eventData && eventData.imageSrc}
                    fallbackSrc="https://bit.ly/sage-adebayo"
                    alt="Segun Adebayo"
                  />
                </Box>
                <Divider size="40px"></Divider>
                <Heading {...styles.text}>
                  {t("events:eventDetails.Description")}
                </Heading>
                <Text {...styles.text}>
                  {eventData && eventData.description}
                </Text>
              </Box>

              <Box>Statistics</Box>
              <Box>Obecnosci</Box>

              <ShowLectures eventId={eventId} />
              <ShowSpeakers eventId={eventId} />
            </MyAccordion>
          </Box>
        </Flex>
      </Skeleton>
    </VStack>
  );
}
