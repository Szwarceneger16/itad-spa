import {
  Heading,
  Divider,
  Text,
  Skeleton,
  Flex,
  Box,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputPopover from "../forms/InputPopover";
import styles from "./styles/showPartners";

import FormPartner from "./formPartner";
import { GetEventPartnerData } from "src/selectors";

const cellWidths = [["25%"], ["25%"], ["40%"], ["10%"]];
export default function ({ isOwner, eventId }) {
  const { t, i18n } = useTranslation(["common", "eventDetails"]);
  const [initialFormValues, setInitialFormvalues] = useState(undefined);
  const eventPartnerData = GetEventPartnerData();

  const initEditPopover = (rowIndex) => {
    setInitialFormvalues(eventPartnerData[rowIndex]);
  };

  return (
    <>
      <Heading {...styles.text}>
        {t("events:eventDetails.main.showEventPartner")}
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
              ? t("eventDetails:main.editEventPartner")
              : t("eventDetails:main.addEventPartner")
          }
          component={FormPartner}
          componentProps={{
            initialValues: initialFormValues,
            eventId,
          }}
        />
      )}

      <Divider size="40px"></Divider>
      <Skeleton isLoaded={!!eventPartnerData}>
        {/* flex box */}
        <Flex {...styles.ticketFlexConatiner}>
          {eventPartnerData ? (
            eventPartnerData.map((partner, index) => (
              <Box key={index} {...styles.ticketFlexItem}>
                <Text>{partner.name}</Text>
                <Text>{partner.description}</Text>
              </Box>
            ))
          ) : (
            <Spinner />
          )}
        </Flex>
      </Skeleton>
    </>
  );
}
