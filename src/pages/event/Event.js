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
import ShowAttendance from "src/components/eventDetails/showAttendance";
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
import { useAttendanceData } from "src/hooks/useAttendanceData";

export function EventDetails() {
  const { t, i18n } = useTranslation(["common", "events"]);
  // const [isModified, setIsModified] = useState();
  // const changeIsModified = () => setIsModified(!isModified);
  const params = useParams();
  const eventId = Number(params.eventId);
  const attendanceView = params.attendance === "attendance";

  const eventData = useEventData(eventId);
  const lecturesData = useLecturesData(eventId);
  const speakersData = useSpeakersData(eventId);
  const eventPartnerData = useEventPartnerData(eventId);
  const attandanceData = useAttendanceData(eventId);

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
              {isLogged && !currentUserRegistered && !isOwner && (
                <Button variant="outline" m="4" onClick={registerHandler}>
                  {t("events:eventDetails.registerButton")}
                </Button>
              )}
            </Box>
          </Box>

          <Box {...styles.flexItem} {...styles.flexItemTable}>
            <MyAccordion
              labels={
                isLogged
                  ? [
                      t("events:eventDetails.accordion.details"),
                      t("events:eventDetails.accordion.statistic"),
                      t("events:eventDetails.accordion.attendance"),
                      t("events:eventDetails.accordion.partners"),
                      t("events:eventDetails.accordion.lecture"),
                      t("events:eventDetails.accordion.speakers"),
                    ]
                  : [
                      t("events:eventDetails.accordion.details"),
                      t("events:eventDetails.accordion.partners"),
                      t("events:eventDetails.accordion.lecture"),
                      t("events:eventDetails.accordion.speakers"),
                    ]
              }
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

              {isLogged && <Box>Statistics</Box>}

              {isLogged && (
                <ShowAttendance
                  attandanceData={attandanceData}
                  openAttendance={attendanceView}
                  eventId={eventId}
                />
              )}

              <ShowPartners isOwner={isOwner} eventId={eventId} />

              <ShowLectures isOwner={isOwner} eventId={eventId} />

              <ShowSpeakers isOwner={isOwner} eventId={eventId} />
            </MyAccordion>
          </Box>
        </Flex>
      </Skeleton>
    </VStack>
  );
}
