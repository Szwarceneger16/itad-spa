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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FormSpeaker from "./formSpeaker";
import InputPopover from "../forms/InputPopover";
import * as Yup from "yup";
import styles from "./style";
import MyTable from "../table";
import { useSpeakersData } from "src/hooks/useSpeakerData";

const cellWidths = [["25%"], ["25%"], ["40%"], ["10%"]];
export default function ({ eventId }) {
  const { t, i18n } = useTranslation(["common", "events"]);
  const [initialFormValues, setInitialFormvalues] = useState(undefined);
  const speakersData = useSpeakersData(eventId, initialFormValues);

  const initEditPopover = (rowIndex) => {
    setInitialFormvalues(speakersData[rowIndex]);
  };

  const headers = [
    t("events:showSpeaker.tableheading.firstname"),
    t("events:showSpeaker.tableheading.secondName"),
    t("events:showSpeaker.tableheading.description"),
    // t("events:showSpeaker.tableheading.photo"),
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
        {t("events:showSpeaker.main.showSpeakers")}
      </Heading>
      <InputPopover
        defaultIsOpen={!!initialFormValues}
        //OnOpen={() => setOpenPopover(true)}
        OnClose={() => {
          setInitialFormvalues(null);
        }}
        label={
          initialFormValues
            ? t("events:showSpeaker.main.editSpeaker")
            : t("events:showSpeaker.main.addSpeaker")
        }
        component={FormSpeaker}
        componentProps={{
          initialValues: initialFormValues,
          eventId,
        }}
      />

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
