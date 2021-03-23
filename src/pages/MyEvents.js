import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import React,  { Suspense, useState, useTransition } from "react";

import { userTokenContext } from '../components/contexts.js';


export function MyEvents() {
    //let setter = useContext(userTokenContext);

    //console.log('About',message)
    return (
      <div>
        <h2>About</h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet, purus vitae eleifend tristique, lorem magna volutpat orci, et vehicula erat erat nec elit. Aenean posuere nunc ac cursus facilisis. Aenean vel porta turpis, ut iaculis justo.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet, purus vitae eleifend tristique, lorem magna volutpat orci, et vehicula erat erat nec elit. Aenean posuere nunc ac cursus facilisis. Aenean vel porta turpis, ut iaculis justo.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet, purus vitae eleifend tristique, lorem magna volutpat orci, et vehicula erat erat nec elit. Aenean posuere nunc ac cursus facilisis. Aenean vel porta turpis, ut iaculis justo.
      </div>
    );
  }
;
