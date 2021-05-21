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

  //console.log('About',message)
  return (
    <div>
      <Heading 
      fontSize="57px" 
      textAlign="center" 
      color="tomato">
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
                >PROSTE <br/>TWORZENIE <Text color="tomato">WYDARZEŃ</Text></Text>
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
                  >Aplikacja została stworzona z myślą o ludziach chcących stworzyć swoje własne wydarzenia. 
                  Dzięki niej będziesz mógł nimi zarządzać, dodawać prelekcję, prelegentów po zakończonym wydarzeniu dostaniesz statystyki z nim związane.
                  Każdy z użytkowników będzie mógł zpisać się na twoje wydarzenie. Dzięki wygenerowanemu kodu QR oraz wersji mobilnej
                  w łatwy sposób sprawdzisz obecności na swoim wydarzeniu. Uczestnicy będą mogli zadawać pytania prowadzącym wykłady.</Text>
                </Box>
              </Box>
            </Box>
        </Flex>

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
                >
                  SIMPLE<br/>EVENT<Text color="tomato">CREATION</Text></Text>
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
                  > The application was created for people who want to create their own events. You will manage them, add lectures, speakers, 
                  after the event you will get statistics related to it. Every user will have the option to sign up for your event. With 
                  QR code and mobile version you can easily check the attendance on your event. Users will be able to ask questions to the speakers.</Text>
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