import { 
  Text,
  Heading,
  Stack,
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

export function About() {
  //let setter = useContext(userTokenContext);
  const [message, setMessage] = useState(res);

  //console.log('About',message)
  return (
    <div>
      <Center>
          <Stack spacing={3}>
            <Heading as="h1" size="4xl" style={mystyle}>
              Connect 
            </Heading>     
            <Text fontSize={{ 
              base: "24px", 
              md: "30px", 
              lg: "40px" }}
              fontFamily = "Arial, sans-serif" 
              textAlign = "center">
              Aplikacja do zarządzania wydarzeniami. 
            </Text> 
            <Text fontSize={{ 
              base: "24px", 
              md: "30px", 
              lg: "40px" }}
              fontFamily = "Arial, sans-serif"
              textAlign = "center">
              Dzieki niej będziesz mógł zroganizować wydarzenie.
            </Text> 
            <Text fontSize={{ 
              base: "24px", 
              md: "30px", 
              lg: "40px" }}
              fontFamily = "Arial, sans-serif"
              textAlign = "center">
              Dzieki niej będziesz mógł zroganizować wydarzenie.
            </Text> 
             
            </Stack>
            
        </Center>
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