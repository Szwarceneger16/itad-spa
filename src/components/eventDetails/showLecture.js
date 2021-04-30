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
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import InputPopover from "../forms/InputPopover";
import FormLecture from "./formLecture";
import * as Yup from "yup";
import styles from "./style";
import MyTable from "../table";

const cellWidths = ["25%", "25%", "40%", "10%"];
export default function (params) {
  const { t, i18n } = useTranslation(["common", "eventDetails"]);
  const [initialFormValues, setInitialFormvalues] = useState(null);

  const initEditPopover = (el) => {
    const values = {
      id: el,
      lectureName: "asdsd",
      description: "nazwisko",
      startTime: undefined,
      endTime: undefined,
    };
    setInitialFormvalues(values);
  };

  const headers = [
    t("eventDetails:lecture.name"),
    t("eventDetails:lecture.description"),
    t("eventDetails:lecture.startTime"),
    t("eventDetails:lecture.endTime"),
  ];
  const data = [["some data", "some data", "some data", "some data"]];

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
        initialValues={initialFormValues}
      />

      <Divider size="40px"></Divider>

      <MyTable
        columnsWidth={cellWidths}
        data={data}
        labels={headers}
        onRowClick={initEditPopover}
      />
    </>
    // </Box>
  );
}
