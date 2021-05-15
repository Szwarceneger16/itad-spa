import {
  Flex,
  VStack,
  Box,
  Heading,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/myTickets";
import { useTicketsData } from "src/hooks/useTicketsData";

export function MyTickets() {
  const { t, i18n } = useTranslation(["common", "tickets"]);
  const userTicketsData = useTicketsData();

  const ticketsDisplay = userTicketsData ? (
    userTicketsData.map((ticket, index) => (
      <Box key={index} {...styles.ticketFlexItem}>
        <Stat>
          <StatLabel>{ticket?.eventName || "dodajce eventName"}</StatLabel>
          <StatNumber>{ticket.price}</StatNumber>
          <StatHelpText>
            {ticket.isPayed
              ? t("tickets:payedMessage.payed")
              : t("tickets:payedMessage.notPayed")}
          </StatHelpText>
        </Stat>
      </Box>
    ))
  ) : (
    <Spinner />
  );

  return (
    <VStack {...styles.vStack}>
      <Heading fontSize="3xl" textAlign="center">
        {t("tickets:main.heading")}
      </Heading>
      <Flex {...styles.ticketFlexConatiner}>{ticketsDisplay}</Flex>
    </VStack>
  );
}
