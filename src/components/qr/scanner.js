import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  CloseButton,
  Flex,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState, Component } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import QrReader from "react-qr-scanner";
import userService from "src/services/user.service";

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error(error, errorInfo);
//   }

//   render() {
//     const { t } = this.props;

//     if (this.state.hasError) {

//     }
//     return this.props.children;
//   }
// }

// const DeviceNotSupported = withTranslation()(ErrorBoundary);
const timeout = 3000;

export function QRScanner(params) {
  const { t, i18n } = useTranslation(["common", "tickets"]);
  const [infoMessage, setInfoMessage] = useState({});
  const [scannerError, setScannerError] = useState(false);

  const handleScan = (scanedData) => {
    if (scanedData && scanedData.text !== infoMessage.uuid) {
      setInfoMessage({ uuid: scanedData.text, waitForResposnse: true });
      userService
        .verificateTicket()
        .then((res) => {
          setInfoMessage({
            ...infoMessage,
            waitForResposnse: false,
            isPayed: true,
          });
          setTimeout(() => {
            setInfoMessage({ ...infoMessage, uuid: undefined });
          }, timeout);
        })
        .catch((err) => {
          if (err.response.status === 402) {
            setInfoMessage({
              ...infoMessage,
              waitForResposnse: false,
              isPayed: false,
            });
          } else {
            setInfoMessage({ errorMessage: err.response.data.message });
          }
          setTimeout(() => {
            setInfoMessage({ ...infoMessage, uuid: undefined });
          }, timeout);
        });
    }
  };
  const handleError = (err) => {
    setScannerError(true);
  };

  let infoDisplay;

  if (infoMessage.errorMessage) {
    infoDisplay = (
      <>
        <Text>{t("tickets:scanner.message.ticketError")}</Text>
        <Text>{infoMessage.errorMessage}</Text>
      </>
    );
  } else {
    let message;

    if (!infoMessage.uuid) {
      message = <Text>{t("tickets:scanner.message.scanNextMessage")}</Text>;
    } else if (infoMessage.waitForResposnse) {
      message = <Text>{t("tickets:scanner.message.waitForVerification")}</Text>;
    } else if (infoMessage.isPayed) {
      message = (
        <Badge colorScheme="green">
          {t("tickets:scanner.message.ticketPayed")}
        </Badge>
      );
    } else {
      message = (
        <Badge colorScheme="red">
          {t("tickets:scanner.message.ticketNotPayed")}
        </Badge>
      );
    }

    infoDisplay = (
      <VStack>
        <Text>{infoMessage.uuid}</Text>
        {message}
      </VStack>
    );
  }

  // cb99614f-d08c-475d-bbb6-63d61def98bd
  if (scannerError) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}></AlertTitle>
        <AlertDescription>
          {t("tickets:scanner.message.scannerError")}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
      <QrReader
        delay={500}
        onError={handleError}
        onScan={handleScan}
        // facingMode={"user"}
        // showViewFinder={true}
        constraints={{ video: { facingMode: { exact: "environment" } } }}
        style={{ width: "100%" }}
        resolution={600}
      />
      <Box borderRadius="15px" p={4} backgroundColor="#fff1cc">
        {infoDisplay}
      </Box>
    </VStack>
  );
}
