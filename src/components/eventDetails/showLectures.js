import {
  Flex,
  VStack,
  Box,
  Heading,
  Grid,
  Image,
  Text,
  Divider,
  GridItem,
  Wrap,
  WrapItem,
  Table,
  Th,
  Tr,
  Thead,
  Tbody,
  TableCaption,
  Td,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import InputPopover from "../forms/InputPopover";
import FormLecture from "./formLecture";
import BindSpeakers from "src/components/eventDetails/bindSpeaker";
import styles from "./style";
import MyTable from "../table";
import * as DateFns from "date-fns";
import { useLecturesData } from "src/hooks/useLectureData";
import { useDispatch } from "react-redux";
import { setLectureData } from "src/actions/events";

const cellWidths = [["25%"], ["25%"], ["40%"], ["10%"]];
export default function ({ eventId }) {
  const { t, i18n } = useTranslation(["common", "event"]);
  const [initialFormValues, setInitialFormvalues] = useState(undefined);
  const lecturesData = useLecturesData(eventId, initialFormValues);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!!lecturesData) {
      dispatch(setLectureData(lecturesData));
    }
  }, [lecturesData]);

  const initEditPopover = (rowIndex) => {
    setInitialFormvalues(lecturesData[rowIndex]);
  };

  const headers = [
    t("eventDetails:lecture.name"),
    t("eventDetails:lecture.description"),
    t("eventDetails:lecture.startTime"),
    // t("eventDetails:lecture.endTime"),
    t("eventDetails:lecture.availableSeats"),
  ];
  const loadingData = [
    [
      t("common:message.waitingForData"),
      t("common:message.waitingForData"),
      t("common:message.waitingForData"),
      "",
    ],
  ];

  return (
    <>
      <Heading {...styles.text}>{t("eventDetails:main.showLecture")}</Heading>
      <InputPopover
        defaultIsOpen={!!initialFormValues}
        //OnOpen={() => setOpenPopover(true)}
        OnClose={() => {
          setInitialFormvalues(null);
        }}
        label={
          initialFormValues
            ? t("eventDetails:main.editLecture")
            : t("eventDetails:main.addLecture")
        }
        component={FormLecture}
        componentProps={{
          initialValues: initialFormValues,
          eventId,
        }}
      />
      <InputPopover
        defaultIsOpen={!!initialFormValues}
        //OnOpen={() => setOpenPopover(true)}
        OnClose={() => {
          setInitialFormvalues(null);
        }}
        label={
          initialFormValues
            ? t("eventDetails:main.bindSpeaker")
            : t("eventDetails:main.reBindSpeaker")
        }
        component={BindSpeakers}
        componentProps={{
          initialValues: initialFormValues,
          eventId,
        }}
      />

      <Divider size="40px"></Divider>

      <Skeleton isLoaded={!!lecturesData}>
        <MyTable
          columnsWidth={cellWidths}
          data={
            lecturesData
              ? lecturesData.map((element) => [
                  element.name,
                  element.description,
                  DateFns.format(element.startDate, "dd-yy-yyyy"),
                  element.availableSeats,
                ])
              : loadingData
          }
          labels={headers}
          onRowClick={initEditPopover}
        />
      </Skeleton>
    </>
    // </Box>
  );
}
