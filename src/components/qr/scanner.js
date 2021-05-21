import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Spinner,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState, Component, useRef } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import QrReader from "react-qr-scanner";
import style from "./style/scanner";
import { useEventsData } from "src/hooks/useEventData";
import eventService from "src/services/event.service";
import lectureService from "src/services/lecture.service";

const timeout = 5000;

export function QRScanner(params) {
  const { t, i18n } = useTranslation(["common", "tickets"]);
  const [infoMessage, setInfoMessage] = useState({});
  const [scannerError, setScannerError] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(0);
  const [eventData, setEventData] = useState();
  const [lecturesData, setLecturesData] = useState();
  const [selectedLectureId, setSelectedLectureId] = useState(0);

  useEffect(() => {
    eventService
      .getEventCurrentUser()
      .then((data) => setEventData(data.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedEventId > 0) {
      lectureService
        .getLecturesByEventID(selectedEventId)
        .then((data) => setLecturesData(data.data))
        .catch(() => {});
    }
  }, [selectedEventId]);

  const handleScan = (scanedData) => {
    // if (scanedData) console.log(scanedData.text);

    if (selectedEventId && scanedData && scanedData.text !== infoMessage.uuid) {
      Promise.all([
        eventService.markUserAttendanceOnEvent(
          selectedEventId,
          scanedData.text
        ),
        lectureService.markUserAttendanceOnLecture(
          selectedLectureId,
          scanedData.text
        ),
      ])
        .then((res) => {
          setInfoMessage({
            uuid: scanedData.text,
            message: t("tickets:scanner.message.payed"),
          });
        })
        .catch((err) => {
          if (err.response.status === 402) {
            setInfoMessage({
              uuid: scanedData.text,
              message: t("tickets:scanner.message.notPayed"),
            });
          } else {
            setInfoMessage({
              uuid: scanedData.text,
              message: t("tickets:scanner.message.notRezgonizedError"),
            });
          }
        })
        .finally(() => {
          setTimeout(() => {
            setInfoMessage({
              uuid: "",
              message: t("tickets:scanner.message.scanNext"),
            });
          }, timeout);
        });
    }
  };
  const handleError = (err) => {
    // setScannerError(true);
  };

  // cb99614f-d08c-475d-bbb6-63d61def98bd
  if (scannerError) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}></AlertTitle>
        <AlertDescription>
          {t("tickets:scanner.message.scannerError")}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} {...style.Vstack}>
      <FormControl id="eventId" isRequired>
        <FormLabel>{t("tickets:scanner.choose.event")}</FormLabel>
        <Select
          {...style.select}
          placeholder="....."
          fullWidth
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          {eventData ? (
            eventData.map((event) => (
              <MenuItem
                key={event.eventId}
                style={style.option}
                value={event.eventId}
              >
                {event.name}
              </MenuItem>
            ))
          ) : (
            <Spinner />
          )}
        </Select>
      </FormControl>
      {selectedEventId > 0 && (
        <FormControl id="eventId" isRequired>
          <FormLabel>{t("tickets:scanner.choose.lecture")}</FormLabel>
          <Select
            {...style.select}
            placeholder="....."
            fullWidth
            value={selectedLectureId}
            onChange={(e) => setSelectedLectureId(e.target.value)}
          >
            {lecturesData ? (
              lecturesData.map((lecture) => (
                <MenuItem
                  key={lecture.lectureId}
                  style={style.option}
                  value={lecture.lectureId}
                >
                  {lecture.name}
                </MenuItem>
              ))
            ) : (
              <Spinner />
            )}
          </Select>
        </FormControl>
      )}

      <QrReader
        delay={500}
        onError={handleError}
        onScan={handleScan}
        // facingMode={"user"}
        // showViewFinder={true}
        constraints={{ video: { facingMode: { exact: "environment" } } }}
        style={style.scannerWindow}
        resolution={600}
      />
      <Box
        borderRadius="15px"
        p={4}
        backgroundColor="#fff1cc"
        {...style.infoDisplay}
      >
        {infoMessage.uuid}
      </Box>

      <Box
        borderRadius="15px"
        p={4}
        backgroundColor="#fff1cc"
        {...style.infoDisplay}
      >
        {infoMessage.message}
      </Box>
    </VStack>
  );
}

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error(error, errorInfo);
//   }

//   render() {
//     const { t } = this.props;

//     if (this.state.hasError) {

//     }
//     return this.props.children;
//   }
// }

// const DeviceNotSupported = withTranslation()(ErrorBoundary);
