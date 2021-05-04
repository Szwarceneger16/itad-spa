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
  const { t, i18n } = useTranslation(["common", "events"]);
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
    t("events:showLecture.lecture.name"),
    t("events:showLecture.lecture.description"),
    t("events:showLecture.lecture.startTime"),
    t("events:showLecture.lecture.endTime"),
  ];
  const data = [["some data", "some data", "some data", "some data"]];

  return (
    <>
      <Heading {...styles.text}>{t("events:showLecture.main.showLecture")}</Heading>
      <InputPopover
        defaultIsOpen={!!initialFormValues}
        //OnOpen={() => setOpenPopover(true)}
        OnClose={() => {
          setInitialFormvalues(null);
        }}
        label={
          initialFormValues
            ? t("events:showLecture.main.editLecture")
            : t("events:showLecture.main.addLecture")
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
