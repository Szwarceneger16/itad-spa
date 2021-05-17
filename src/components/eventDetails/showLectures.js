import { Heading, Divider, Skeleton } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputPopover from "../forms/InputPopover";
import FormLecture from "./formLecture";
import BindSpeakers from "src/components/eventDetails/bindSpeaker";
import styles from "./style";
import MyTable from "../table";
import * as DateFns from "date-fns";
import { useSelector } from "react-redux";
import { GetLectureData } from "src/selectors";

const cellWidths = [["25%"], ["25%"], ["40%"], ["10%"]];
export default function ({ isOwner, eventId }) {
  const { t, i18n } = useTranslation(["common", "event"]);
  const [initialFormValues, setInitialFormvalues] = useState(undefined);
  const lectureData = GetLectureData();

  const initEditPopover = (rowIndex) => {
    setInitialFormvalues(lectureData[rowIndex]);
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
      {isOwner && (
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
      )}
      {isOwner && (
        <InputPopover
          defaultIsOpen={false}
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
            eventId,
          }}
        />
      )}

      <Divider size="40px"></Divider>

      <Skeleton isLoaded={!!lectureData}>
        <MyTable
          columnsWidth={cellWidths}
          data={
            lectureData
              ? lectureData.map((element) => [
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
