import {
  Flex,
  VStack,
  Box,
  Heading,
  Image,
  Text,
  Divider,
} from "@chakra-ui/react";
import ShowLecturer from "src/components/eventDetails/showLecturer";
import ShowLecture from "src/components/eventDetails/showLecture";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import styles from "./styles/EventDetails";
import MyAccordion from "src/components/accordion";

const eventData = {
  eventName: "tytul",
  eventDescription: "opis 123",
  eventImage: "",
};

export function EventDetails() {
  const { t, i18n } = useTranslation(["common", "event"]);
  const { eventId } = useParams();

  return (
    <VStack spacing={8} mx="auto" w="100%" py={12} px={0} p={0} m={0}>
      <Heading fontSize="3xl" textAlign="center">
        {t("event:eventDetails.heading") + ` ${eventId} `}
      </Heading>
      <Flex {...styles.flexContainer}>
        <Box {...styles.flexItem}>
          <Heading {...styles.text}>
            {t("event:eventDetails.eventName")}
          </Heading>
          <Text {...styles.text}>{eventData.eventName}</Text>
          <Divider size="40px"></Divider>
        </Box>

        <Box {...styles.flexItem} {...styles.flexItemTable}>
          <MyAccordion
            labels={[
              t("event:eventDetails.accordion.details"),
              t("event:eventDetails.accordion.statistic"),
              t("event:eventDetails.accordion.lecture"),
              t("event:eventDetails.accordion.lecturers"),
            ]}
          >
            <Box>
              <Box {...styles.flexItemImage}>
                <Image
                  src={eventData.imageSrc}
                  fallbackSrc="https://bit.ly/sage-adebayo"
                  alt="Segun Adebayo"
                />
              </Box>
              <Divider size="40px"></Divider>
              <Heading {...styles.text}>
                {t("event:eventDetails.Description")}
              </Heading>
              <Text {...styles.text}>{eventData.eventDescription}</Text>
            </Box>

            <Box>Statistics</Box>
            <Box>Obecnosci</Box>

            <ShowLecture />
            <ShowLecturer />
          </MyAccordion>
        </Box>
      </Flex>
    </VStack>
  );
}
