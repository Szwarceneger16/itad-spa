import { Heading, Divider, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FormSpeaker from "./formSpeaker";
import InputPopover from "../forms/InputPopover";
import * as Yup from "yup";
import styles from "./style";
import MyTable from "../table";
import { GetSpeakersData } from "src/selectors";

const cellWidths = [["25%"], ["25%"], ["40%"], ["10%"]];
export default function ({ isOwner, eventId }) {
  const { t, i18n } = useTranslation(["common", "eventDetails"]);
  const [initialFormValues, setInitialFormvalues] = useState(undefined);
  const speakersData = GetSpeakersData();

  const initEditPopover = (rowIndex) => {
    setInitialFormvalues(speakersData[rowIndex]);
  };

  const headers = [
    t("eventDetails:lecturer.tableheading.firstname"),
    t("eventDetails:lecturer.tableheading.secondName"),
    t("eventDetails:lecturer.tableheading.description"),
    // t("eventDetails:lecturer.tableheading.photo"),
  ];
  const loadingData = [
    [
      t("common:message.waitingForData"),
      t("common:message.waitingForData"),
      t("common:message.waitingForData"),
    ],
  ];

  return (
    <>
      <Heading {...styles.text}>
        {t("events:eventDetails.main.showLecturer")}
      </Heading>
      {isOwner && (
        <InputPopover
          defaultIsOpen={!!initialFormValues}
          //OnOpen={() => setOpenPopover(true)}
          OnClose={() => {
            setInitialFormvalues(null);
          }}
          label={
            initialFormValues
              ? t("eventDetails:main.editLecturer")
              : t("eventDetails:main.addLecturer")
          }
          component={FormSpeaker}
          componentProps={{
            initialValues: initialFormValues,
            eventId,
          }}
        />
      )}

      <Divider size="40px"></Divider>
      <Skeleton isLoaded={!!speakersData}>
        <MyTable
          // @ts-ignore
          columnsWidth={cellWidths}
          data={
            speakersData
              ? speakersData.map((element) => [
                  element.name,
                  element.surname,
                  element.description,
                ])
              : loadingData
          }
          labels={headers}
          onRowClick={initEditPopover}
        />
      </Skeleton>
    </>
  );
}
