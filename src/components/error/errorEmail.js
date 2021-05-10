import { 
    Flex, 
    Stack, 
    Box, 
    Heading,
    Text,
    Image
} from '@chakra-ui/react';
import React from "react";

export default function ErrorEmail() {

    return (
      <Stack spacing={8} mx="auto" w="full" maxW="md" py={12} px={6}>
        <Heading fontSize="3xl" textAlign="center">
          Information
        </Heading>
        <Box rounded="lg" bg="white" boxShadow="lg" p={{ base: 4, md: 8 }}>
          <Stack direction={ "column"} spacing="24px" align="center">
            <Image
              boxSize="200px"
              objectFit="cover"
              src="https://i.ibb.co/6XX6yKW/Blad-email2.png"
              //src="src/components/img/Blad_email2.png"
              alt="Error email"
            />
            <Text fontSize={{ 
              base: "24px", 
              md: "30px", 
              lg: "40px" }}
              fontFamily = "Arial, sans-serif" 
              textAlign = "center">
              Your email is not verified 
            </Text>
          </Stack> 
        </Box>
      </Stack>
    )
  }

