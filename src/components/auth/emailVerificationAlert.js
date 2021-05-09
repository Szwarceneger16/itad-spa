import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Spinner,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function ({ isOpen, onClose }) {
  const cancelRef = useRef();
  const { t, i18n } = useTranslation(["common", "auth"]);

  // useEffect( () => {
  //     setIsOpen(true);
  // }, [open])

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t("auth:emailregistration.header")}
            </AlertDialogHeader>

            <AlertDialogBody>
              {t("auth:emailregistration.body")}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Flex flexWrap="wrap">
                <Box>
                  <Text>{t("auth:emailregistration.redirect")}</Text>
                </Box>
                <Box>
                  <Spinner height="20px" />
                </Box>

                <Button ref={cancelRef} onClick={onClose}>
                  {t("common:button.cancel")}
                </Button>
              </Flex>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
