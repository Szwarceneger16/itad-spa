import { Formik, Field, Form, useFormikContext } from "formik";
import React, { Suspense, useEffect, useState, useContext } from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Stack,
  Spacer,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import {
  InputDate,
  InputNumber,
  InputText,
  InputTextArea,
  InputTime,
} from "../forms/InputElements";
import { ErrorMessage } from "../forms/elements";
import {
  CloseIconButton,
  DeleteIconButton,
  SubmitButton,
} from "../forms/buttons";
import lectureService from "src/services/lecture.service";
import { setMessage } from "src/actions/message";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import MyTable from "../table";
import { GetLectureData } from "src/selectors";

export default function ({ defaultIsOpen, attandanceData }) {
  const { t, i18n } = useTranslation(["common", "event"]);
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen });

  const lectureData = GetLectureData();

  if (!lectureData || !attandanceData) {
    return <Spinner />;
  }

  const headers = [
    t("event:attendance.table,eventName"),
    ...lectureData.map((lecture) => lecture.name),
  ];
  const loadingData = [
    [
      t("common:message.waitingForData"),
      t("common:message.waitingForData"),
      t("common:message.waitingForData"),
    ],
  ];

  const allWidth = 4 + lectureData.length;

  const cellWidths =
    allWidth >= 10
      ? [["200px"], ...lectureData.map(() => ["50px"])]
      : [
          [Math.trunc(100 * (4 / allWidth)) + "%"],
          ...lectureData.map(() => [Math.trunc((1 / allWidth) * 100) + "%"]),
        ];

  return (
    <>
      <Button onClick={onOpen}>Open popraw Modal</Button>

      <Modal
        closeOnOverlayClick={false}
        size={"100%"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent m={[4, 6, 8, 12]}>
          <ModalHeader>obecnosci popraw</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MyTable
              columnsWidth={cellWidths}
              data={
                attandanceData
                  ? attandanceData.map((user) => [
                      "" + user.name + user.surname,
                      ...headers.slice(1),
                    ])
                  : loadingData
              }
              labels={headers || loadingData[0]}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close porpaw
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
