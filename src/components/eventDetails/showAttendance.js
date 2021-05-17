import { Heading, Divider, Skeleton, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AttandanceModal from "./attandanceModal";
import styles from "./style";

import { GetSpeakersData } from "src/selectors";

const cellWidths = [["25%"], ["25%"], ["40%"], ["10%"]];
export default function ({ openAttendance, attandanceData, eventId }) {
  const { t, i18n } = useTranslation(["common", "eventDetails"]);

  return (
    <>
      <Heading {...styles.text}>
        {t("events:eventDetails.main.showLecturer")}
      </Heading>

      <Divider size="40px"></Divider>
      {/* <Skeleton isLoaded={!!speakersData}> */}
      <Button>Pobierz lsite obencosci PDF</Button>
      <Button>Pobierz lsite obencosci CSV</Button>

      <AttandanceModal
        eventId={eventId}
        defaultIsOpen={openAttendance}
        attandanceData={attandanceData}
      />
      {/* </Skeleton> */}
    </>
  );
}
