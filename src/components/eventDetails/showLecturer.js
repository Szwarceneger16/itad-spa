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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FormLecturer from "./formLecturer";
import InputPopover from "../forms/InputPopover";
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
      firstName: "asdsd",
      secondName: "nazwisko",
      description: "description",
      file: undefined,
    };
    setInitialFormvalues(values);
  };

  const headers = [
    t("events:eventDetails.lecturer.tableheading.firstname"),
    t("events:eventDetails.lecturer.tableheading.secondName"),
    t("events:eventDetails.lecturer.tableheading.description"),
    t("events:eventDetails.lecturer.tableheading.photo"),
  ];
  const data = [
    [
      "some data",
      "some data",
      "some data",
      <Image
        w="100%"
        margin="auto"
        fallbackSrc="https://bit.ly/sage-adebayo"
        alt="Segun Adebayo"
      />,
    ],
  ];

  return (
    <>
      <Heading {...styles.text}>
        {t("events:eventDetails.main.showLecturer")}
      </Heading>
      <InputPopover
        defaultIsOpen={!!initialFormValues}
        //OnOpen={() => setOpenPopover(true)}
        OnClose={() => {
          setInitialFormvalues(null);
        }}
        label={
          initialFormValues
            ? t("events:eventDetails.main.editLecturer")
            : t("events:eventDetails.main.addLecturer")
        }
        component={FormLecturer}
        initialValues={initialFormValues}
      />

      <Divider size="40px"></Divider>
      <MyTable
        // @ts-ignore
        columnsWidth={cellWidths}
        data={data}
        labels={headers}
        onRowClick={initEditPopover}
      />
    </>
  );
}
