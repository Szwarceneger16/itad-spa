import { 
    Image,
    Box,
    Center,
    Img,
    Text,
    Stack,
    Flex
} from "@chakra-ui/react"
import React from "react";

export function Error() {

  return (
    <Stack direction={"column"} spacing="1px" align="center">
        <Text
            fontSize={{
              base: "130px",
              md: "130px",
              lg: "130px",
            }}
            fontFamily="Arial, sans-serif"
            textAlign="center"
            color="red"
            fontWeight="bold">
            404
        </Text> 
        <Flex
            fontSize="30px"
            fontFamily="Arial, sans-serif"
            textAlign="center"
            flexDirection="column"
            //color="red"
            fontWeight="bold"
        >
        <Text>
            Oops!
        </Text>
        <Text>
            Maybe you are lost?
        </Text>
        <Text>
            It can happen to everyone.
        </Text>
        <Text>
            Go to home page and try again. 
        </Text>
        </Flex>
        <Box boxSize="sm">
            {/*<Image src="./notfound404.png" alt="Error 404" />*/}
            <Image src="https://i.ibb.co/z7vN9b4/notfound404.png" alt="Error 404" />
        </Box>
    </Stack>
        
    
  );
}

