import { Flex, Stack, Box, Heading, Spinner, Text } from "@chakra-ui/react";
import LoginForm from "../components/auth/loginForm";
import React, { Suspense, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import emailVerificationAlert from "src/components/auth/emailVerificationAlert";
import authService from "src/services/auth.service";
import { useDispatch } from "react-redux";
import { setMessage } from "src/actions/message";
import { useTranslation } from "react-i18next";
import { ErrorEmail } from "src/components/auth/errorEmail";

export function AccountVerification() {
  const { t, i18n } = useTranslation(["common", "auth"]);
  const { token } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isEmailVerify, setEmailVerify] = useState(null);

  useEffect(() => {
    if (token) {
      authService
        .emailVerify(token)
        .then((response) => {
          dispatch(
            setMessage(t("auth:input.accountVerification.succes"), "succes")
          );
          history.push("/login");
        })
        .catch((error) => {
          dispatch(
            setMessage(t("auth:input.accountVerification.error"), "error")
          );
          setEmailVerify(error.response);
        });
    } else {
      setEmailVerify(false);
    }
  }, []);

  return (
    <Stack spacing={8} mx="auto" w="full" maxW="md" py={12} px={6}>
      <Heading fontSize="3xl" textAlign="center">
        {t("auth:input.accountVerification.title")}
      </Heading>
      <Box rounded="lg" bg="white" boxShadow="lg" p={{ base: 4, md: 8 }}>
        <Stack direction={"column"} spacing="24px" align="center">
          {isEmailVerify === null ? (
            <Spinner />
          ) : isEmailVerify === true ? (
            <ErrorEmail
              label={t(
                "auth:input.accountVerification.errorDescription.server"
              )}
            />
          ) : (
            <ErrorEmail
              label={t(
                "auth:input.accountVerification.errorDescription.emptyToken"
              )}
            />
          )}
        </Stack>
      </Box>
    </Stack>
  );
}
