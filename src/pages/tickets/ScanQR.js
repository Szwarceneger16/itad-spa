import { Flex, Stack, Box, Heading } from "@chakra-ui/react";
import { QRScanner } from "src/components/qr/scanner";

import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export function ScanQR() {
  const { t, i18n } = useTranslation(["common", "tickets"]);

  return (
    <Stack spacing={[2, 2, 6]} mx="auto" w="100%" py={[0]} px={[1, 2, 6]}>
      <Heading fontSize="3xl" textAlign="center">
        {t("tickets:qr.viewer.heading")}
      </Heading>
      <Box rounded="lg" bg="white" boxShadow="lg" py={[2]} px={[2, 4, 6]}>
        <Stack direction={"column"} spacing="6px" align="center">
          <QRScanner />
        </Stack>
      </Box>
    </Stack>
  );
}
