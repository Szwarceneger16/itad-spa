import { Flex, Stack, Box, Heading } from '@chakra-ui/react';
import RegisterForm from '../components/auth/registerForm';
import EmailVerificationAlert from '../components/auth/emailVerificationAlert'
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export function Register() {
const { t, i18n } = useTranslation(["common"]);
  return (

      <Stack spacing={8} mx="auto" w="full" maxW="md" py={12} px={6}>
        <Heading fontSize="3xl" textAlign="center">
          {t("common:register.title")}
        </Heading>
        <Box rounded="lg" bg="white" boxShadow="lg" p={{ base: 4, md: 8 }}>
        <Stack direction={["column", "row"]} justifyContent="center"  spacing="24px">
                <Box w={["100%","100%","240px"]} >
                  <RegisterForm />
            </Box>
          </Stack> 
        </Box>
      </Stack>
  );
}
