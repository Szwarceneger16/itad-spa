import React from 'react';
import {
  Stack,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Image,
  Badge,
  StarIcon,
  color
} from "@chakra-ui/react";

const property = {
  imageUrl: "https://bit.ly/2Z4KKcF",
  imageAlt: "Rear view of modern home with pool",
  title: "Modern home in city center in the heart of historic Los Angeles",
  shortHand: "asdads",
  showCounts: 1
}

export function Home() {
    return (
      <>
        <Article {...property} width='100%'></Article>
        <Article {...property} ></Article>
        <Article {...property} ></Article>
        <Article {...property} ></Article>        

      </>
    );
  }

function Article({ imageUrl, imageAlt, title, shortHand, showCounts ,...props}) {

  return (
    <Box w={props.width || 'sm'} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={imageUrl} alt={imageAlt} />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {title}
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {showCounts} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

