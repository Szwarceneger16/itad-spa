import React from 'react';
import {
  Stack,
  Box,
  Flex,
  Button,
  Image,
  Badge,
  StarIcon,
  color,
  Spinner,
  Heading
} from "@chakra-ui/react";
import { useEventsData } from "src/hooks/useEventData.js";
import * as DateFns from "date-fns";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const jpg = ["https://i.ibb.co/jry0Yqy/event1.png", "https://i.ibb.co/pWKXg5s/event3.png", "https://i.ibb.co/v4kg7Gd/event2.png", "https://i.ibb.co/R00fWq8/event4.png"]
const random = Math.floor(Math.random() * jpg.length)
const property = {
  imageUrl: jpg[random],
  imageAlt: "Wydarzenie",
  title: "Moje wydarzenie",
  description: "Przykładowy opis przykładowego wydarzenia",
  date: "10-12-2021"
}

export function Home() {
const { t, i18n } = useTranslation(["common", "events"]);
const eventsData = useEventsData();
let history = useHistory();

function handleClick(id){
  window.location.replace("http://localhost:3000/event/detail/" + 6);
}

const eventDisplay = eventsData ? (
  eventsData.map((event, index) => (
      
      <Box key={index} w={'sm'} h = {'sm'} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={jpg[ Math.floor(Math.random() * jpg.length)]} alt={"Wydarzenie"} />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
            { event.startDate &&
                          DateFns.format(event.startDate, "MM-dd-yyyy")}
            </Badge>
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h3"
            lineHeight="tight"
            isTruncated
          >
            {event.name}
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {event.description}
          </Box>
        </Box>
      </Box>
    ))
  ) : (
    <Spinner />
  );

    return (
      <>
      <Heading fontSize="50px" textAlign="center" minH='12vh'>
        {t("events:home.allEvents")}
      </Heading>
      <Flex wrap='wrap' minH='100vh' align="center" justify="center" >
        {eventDisplay}
      </Flex>
      </>
    );
  }

function Article({ imageUrl, imageAlt, title, description, date,...props}) {

  return (
    <Box w={'sm'} h = {'sm'} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={imageUrl} alt={imageAlt} w={'10px'} h={'10px'}/>

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
           {date}
          </Badge>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h3"
          lineHeight="tight"
          isTruncated
        >
          {title}
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {description}
        </Box>
      </Box>
    </Box>
  )
}

