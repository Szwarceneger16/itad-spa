import {
  Flex,
  VStack,
  Box,
  Heading,
  Image,
  Text,
  Divider,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import ShowSpeakers from "src/components/eventDetails/showSpeakers";
import ShowLectures from "src/components/eventDetails/showLectures";
import ShowPartners from "src/components/eventDetails/showPartners";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useHistory, useParams } from "react-router-dom";
import styles from "./styles/EventDetails";
import MyAccordion from "src/components/accordion";
import { useEventData } from "src/hooks/useEventData";
import { GetLogginStatus, GetUserId } from "src/selectors";
import eventService from "src/services/event.service";
import { useLecturesData } from "src/hooks/useLectureData";
import { useSpeakersData } from "src/hooks/useSpeakerData";
import { useEventPartnerData } from "src/hooks/useEventPartnerData";

const eventData = {
  eventName: "tytul",
  eventDescription: "opis 123",
  eventImage: "",
};

export function EventDetails() {
  const { t, i18n } = useTranslation(["common", "events"]);
  const [isModified, setIsModified] = useState();
  const changeIsModified = () => setIsModified(!isModified);
  const params = useParams();
  const eventId = Number(params.eventId);

  const eventData = useEventData(eventId, [isModified]);
  const lecturesData = useLecturesData(eventId, [isModified]);
  const speakersData = useSpeakersData(eventId, [isModified]);
  const eventPartnerData = useEventPartnerData(eventId, [isModified]);

  const userId = GetUserId();
  const isLogged = GetLogginStatus();
  const isOwner =
    !!eventData && !!isLogged && userId === eventData.owner.userId;
  const currentUserRegistered = eventData?.currentUserRegistered;
  // -----------------------------------

  if (Number.isNaN(eventId)) {
    return <Redirect push to="/eventsAll" />;
  }

  const registerHandler = () => {
    eventService.registerOnEvent(eventId).catch((e) => console.error(e));
  };

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
            <Box textAlign="center">
              {!currentUserRegistered && !isOwner && (
                <Button variant="outline" m="4" onClick={registerHandler}>
                  {t("event:eventDetails.registerButton.title")}
                </Button>
              )}
            </Box>
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

              <ShowPartners
                modifyHandler={changeIsModified}
                isOwner={isOwner}
                eventId={eventId}
              />

              <ShowLectures
                modifyHandler={changeIsModified}
                isOwner={isOwner}
                eventId={eventId}
              />

              <ShowSpeakers
                modifyHandler={changeIsModified}
                isOwner={isOwner}
                eventId={eventId}
              />
            </MyAccordion>
          </Box>
        </Flex>
      </Skeleton>
    </VStack>
  );
}
