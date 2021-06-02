import { 
  Text,
  Heading,
  Stack,
  HStack,
  Flex, 
  Spacer,
  Center,
  Box,
  Square
} from "@chakra-ui/react"
import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import React, { Suspense, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { userTokenContext } from "./../components/contexts.js";

function fetchData(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (id) {
        case 0:
          resolve("ininininiinininininin");
          break;
        case 1:
          resolve("Ringo ooooooooooooooooooooooooooooooooooooooo Starr");
          break;
        default:
          resolve("dddddddddddddddddddddddddddddddddddddddddddd");
          break;
      }
    }, 5000);
  });
}

function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

function fetchProfileData(userId) {
  let userPromise = fetchData(userId);

  return {
    userId,
    user: wrapPromise(userPromise),
  };
}

const res = fetchProfileData(0);

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [50, 16, 50],
};

export function About() {
  //let setter = useContext(userTokenContext);
  const [message, setMessage] = useState(res);
  const { t, i18n } = useTranslation(["common"]); 
  //console.log('About',message)
  return (
    <div>
      <Heading 
      fontSize="57px" 
      textAlign="center" 
      color="tomato"
      style={{ marginTop: `30px` }}>
          CONNECT
      </Heading>
      <Flex wrap='wrap' minH='60vh' align="center" justify="center" >
        <Box w={'350px'} h={{ sm: "250px", md: "300px", lg: "330px" }} borderWidth="1px" borderRadius="25px" overflow="hidden" bg="white">
              <Box p="6">
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  
                >
                <Text 
                fontSize={{ sm: "41px", md: "41px", lg: "45px" }}
                textAlign="right" 
                fontFamily="sans-serif"
                >{t("common:aboutUs.heading.simple")}<br/>{t("common:aboutUs.heading.event")}<Text color="tomato">{t("common:aboutUs.heading.creation")}</Text></Text>
                </Box>
              </Box>
            </Box>
            <Box w={'500px'} h={{ sm: "250px", md: "300px", lg: "330px" }} borderWidth="1px" borderRadius="25px" overflow="hidden" bg="white">
              <Box p="6">
                <Box
                  mt="2"
                  
                  as="h4"
                  lineHeight="tight"
                  bg="white"
                >
                  <Text
                  fontSize={{ sm: "15px", md: "17px", lg: "18px" }} 
                  textAlign="left" 
                  fontFamily="sans-serif"
                  >{t("common:aboutUs.body")}</Text>
                </Box>
              </Box>
            </Box>
        </Flex>
    </div>
  );
}

function Ell({ resource }) {
  const user = resource.user.read();
  //console.log(user);
  return <h1>{user}</h1>;
}

/*
<Suspense fallback={<Spinner />}>
        <Button onClick={() => setMessage(fetchProfileData(1))}>Click</Button>
        <h2>About</h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet,
        purus vitae eleifend tristique, lorem magna volutpat orci, et vehicula
        erat erat nec elit. Aenean posuere nunc ac cursus facilisis. Aenean vel
        porta turpis, ut iaculis justo. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nullam aliquet, purus vitae eleifend tristique, lorem
        magna volutpat orci, et vehicula erat erat nec elit. Aenean posuere nunc
        ac cursus facilisis. Aenean vel porta turpis, ut iaculis justo.
        <Ell resource={message} />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet,
        purus vitae eleifend tristique, lorem magna volutpat orci, et vehicula
        erat erat nec elit. Aenean posuere nunc ac cursus facilisis. Aenean vel
        porta turpis, ut iaculis justo.
      </Suspense>
*/