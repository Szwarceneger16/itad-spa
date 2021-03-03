import { Flex, Stack, Box, Heading } from '@chakra-ui/react';
import LoginForm from '../components/loginForm';

function RegisterPage() {

  return (
      <Stack spacing={8} mx="auto" w="full" maxW="md" py={12} px={6}>
        <Heading fontSize="3xl" textAlign="center">
          Register
        </Heading>
        <Box rounded="lg" bg="white" boxShadow="lg" p={{ base: 4, md: 8 }}>
          <LoginForm />
        </Box>
      </Stack>
  );
}

export default RegisterPage;