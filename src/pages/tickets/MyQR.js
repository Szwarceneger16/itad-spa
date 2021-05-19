import { Flex, Stack, Box, Heading } from "@chakra-ui/react";
import { QRViewer } from "src/components/qr/viewer";

import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export function MyQR() {
  const { t, i18n } = useTranslation(["common", "tickets"]);

  return (
    <Stack spacing={8} mx="auto" w="full" maxW="md" py={12} px={6}>
      <Heading fontSize="3xl" textAlign="center">
        {t("tickets:qr.viewer.title")}
      </Heading>
      <Box rounded="lg" bg="white" boxShadow="lg" p={{ base: 4, md: 8 }}>
        <Stack direction={"column"} spacing="24px" align="center">
          <QRViewer />
        </Stack>
      </Box>
    </Stack>
  );
}
