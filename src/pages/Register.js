import { Flex, Stack, Box, Heading } from '@chakra-ui/react';
import RegisterForm from '../components/register/registerForm';
import React, { Suspense } from "react";

export function Register() {

  return (
      <Stack spacing={8} mx="auto" w="full" maxW="md" py={12} px={6}>
        <Heading fontSize="3xl" textAlign="center">
          Register
        </Heading>
        <Box rounded="lg" bg="white" boxShadow="lg" p={{ base: 4, md: 8 }}>
        <Stack direction={["column", "row"]} spacing="24px">
            <Box w="240px">
              <Stack direction={["column", "row"]} spacing="24px">
                <Box w="240px">
                  <RegisterForm />
                </Box>
              </Stack>
            </Box>
          </Stack> 
        </Box>
      </Stack>
  );
}
