import {
  Flex,
  VStack,
  Box,
  Heading,
  Image,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useFormik, Form } from "formik";
import EventsSummary from "../../components/events/EventsSummary";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputPopover from "../../components/forms/InputPopover";
import { InputFile } from "../../components/forms/InputElements";
import styles from "./styles/Events";

const eventData = {
  eventName: "tytul",
  eventDescription: "opis 123",
  eventImage: "",
};

export function Events() {
  const { t, i18n } = useTranslation(["common", "eventsList"]);

  return (
    <VStack {...styles.vStack}>
      <Heading fontSize="3xl" textAlign="center">
        {t("eventsList:main.heading")}
      </Heading>
      <Flex {...styles.flexContainerForTable}>
        <Box {...styles.flexItem}>
          <Heading {...styles.text}>{t("eventsList:main.eventsList")}</Heading>
          <Text {...styles.text}>
            aaaaaaaaaaaaaaaaaaa{/* {eventData.eventName} */}
          </Text>
          <Divider size="40px"></Divider>
        </Box>

        <Box {...styles.flexItem}>
          <EventsSummary style={styles.flexItemTable} />
        </Box>
      </Flex>
    </VStack>
  );
}
