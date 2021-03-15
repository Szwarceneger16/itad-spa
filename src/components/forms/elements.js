import { 
  Box, 
  Divider, 
  Flex, 
  FlexProps, 
  Alert,
  AlertIcon,
  AlertDescription,
  useColorModeValue as mode 
} from '@chakra-ui/react'
import * as React from 'react'

function DividerWithText (props) {
  
  return (
    <Flex align="center" color="gray.300" {...props}>
      { props.children ? (<>
        <Box flex="1">
          <Divider borderColor="currentcolor" />
        </Box>
        <Box as="span" px="3" color={mode('gray.600', 'gray.400')} fontWeight="medium">
          {props.children}
        </Box>
        <Box flex="1">
          <Divider borderColor="currentcolor" />
        </Box>
      </>) : (<>
        <Box flex="1">
          <Divider py="3" size='20px' borderColor="currentcolor" />
        </Box>
      </>)
      }
    </Flex>
    );
  }

function ErrorMessage(props) {
  return (
    <Box my={4}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{props.children}</AlertDescription>
      </Alert>
    </Box>
  );
}

export { ErrorMessage, DividerWithText };