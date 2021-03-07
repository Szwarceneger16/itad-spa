import { Flex, Stack, Box, Heading } from '@chakra-ui/react';
import LoginForm from '../components/forms/loginForm';
import React, { Suspense } from "react";

function LoginPage() {

  return (
      <Stack spacing={8} mx="auto" w="full" maxW="md" py={12} px={6}>
        <Heading fontSize="3xl" textAlign="center">
          Login
        </Heading>
        <Box rounded="lg" bg="white" boxShadow="lg" p={{ base: 4, md: 8 }}>
          <Stack direction={["column", "row"]} spacing="24px">
            <Box w="240px">
              <LoginForm />
            </Box>
          </Stack> 
        </Box>
      </Stack>
  );
}

export default LoginPage;