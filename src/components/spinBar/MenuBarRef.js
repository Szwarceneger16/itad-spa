import { CSSTransitionGroup, Transition } from "react-transition-group";
import React, {
  useState,
  createRef,
  useReducer,
  useEffect,
  useRef,
} from "react";
import { Image, Box, Button, Tooltip, position } from "@chakra-ui/react";
import crowns from "../../img/crowns";
import {
  positionGenerator,
  disableScroll,
  enableScroll,
} from "./dependencies.js";
import { useTranslation } from "react-i18next";

const crownStyle = {
  w: "100px",
  h: "100px",
};

function MenuPanel({
  circleRadius = 150,
  crownsNumber = 8,
  data,
  right,
  ...props
}) {
  const { t, i18n } = useTranslation("common");
  //   const [initialCrownsState, getNextCrownsState] = crownsGenerator(
  //     refs,
  //     circleRadius,
  //     crownsNumber
  //   );
  const [generator, a] = useState(
    positionGenerator(circleRadius, crownsNumber)
  );

  const [actualCrownsState, setActualCrownState] = useState(
    () => generator.next(0).value
  );
  debugger;
  const boxWidth = circleRadius * 1.5,
    boxHeight = circleRadius * 1.3;

  const childs = actualCrownsState.map((actualCrownState, index) => {
    // debugger;
    return (
      <MenuCrown
        top={circleRadius - actualCrownState.y + "px"}
        // right={actualCrownState.x}
        right={actualCrownState.x + "px"}
        key={index + ""}
        active={actualCrownState.active}
        alt={t("routes." + data[actualCrownState.imageNumber]?.name)}
        // title={t("routes." + data[actualCrownState.imageNumber]?.name)}
        src={crowns[actualCrownState.imageNumber]}
        transform={"rotate(" + actualCrownState.rotate + "deg)"}
        {...crownStyle}
        onClick={data[actualCrownState.imageNumber]?.callback ?? null}
      />
    );
  });

  return (
    <Box
      position="fixed"
      style={{ borderRadius: "20px" }}
      top={"50%"}
      w={boxWidth}
      h={boxHeight * 2}
      transform="translate(50%,-50%)"
      right={right || "0px"}
    >
      <Box
        position="relative"
        w={boxWidth}
        zIndex="1000"
        top={"25%" /* boxHeight/3} h={boxHeight*(1 + 1/3) */}
        bottom={"-25%"}
        onWheel={(e) => {
          setActualCrownState(generator.next(e.deltaY < 0).value);

          //console.log(refs[0].current.style);
        }}
        onMouseEnter={() => disableScroll()}
        onMouseLeave={() => enableScroll()}
      >
        {childs}
      </Box>
    </Box>
  );
}

function MenuCrown({
  top,
  right,
  reff,
  active,
  inProp,
  title,
  w,
  h,
  alt,
  onClick,
  ...props
}) {
  debugger;
  return (
    <Box
      ref={reff}
      key={props.alt}
      position="absolute"
      onClick={onClick}
      w={w}
      h={h}
      top={top}
      right={right} /* ref={reff} */
    >
      <Tooltip isDisabled={!active} label={alt} placement="left">
        <Image
          w={w}
          h={h}
          {...(title !== undefined ? { title: props.alt } : {})}
          {...props}
        />
      </Tooltip>
    </Box>
  );
}

export default MenuPanel;
