import { Heading, Divider, Skeleton, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AttandanceModal from "./attandanceModal";
import styles from "./style";

import { GetSpeakersData } from "src/selectors";

const cellWidths = [["25%"], ["25%"], ["40%"], ["10%"]];
export default function ({ openAttendance, attandanceData, eventId }) {
  const { t, i18n } = useTranslation(["common", "events"]);

  return (
    <>
      <Heading {...styles.text}>
        {t("events:eventDetails.showAttendance.showLecturer")}
      </Heading>

      <Divider size="40px"></Divider>
      {/* <Skeleton isLoaded={!!speakersData}> */}
      <Button>{t("events:eventDetails.showAttendance.attendanceListPDF")}</Button>
      <Button>{t("events:eventDetails.showAttendance.attendanceListCSV")}</Button>

      {/* <AttandanceModal
        eventId={eventId}
        defaultIsOpen={openAttendance}
        attandanceData={attandanceData}
      /> */}
      {/* </Skeleton> */}
    </>
  );
}
