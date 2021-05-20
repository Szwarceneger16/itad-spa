import {
  Heading,
  Divider,
  Skeleton,
  Popover,
  Text,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputPopover from "../forms/InputPopover";
import FormLecture from "./formLecture";
import BindSpeakers from "src/components/eventDetails/bindSpeaker";
import styles from "./style";
import MyTable from "../table";
import * as DateFns from "date-fns";
import { GetLectureData } from "src/selectors";
import { ChatIcon, InfoIcon } from "@chakra-ui/icons";
import { Box, Input } from "@material-ui/core";
import FormQuestion from "./formQuestion";

import { FaUserTie } from "react-icons/fa";

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

const cellWidths = [["25%"], ["35%"], ["20%"], ["5%"], ["5%"]];
export default function ({ isOwner, eventId }) {
  const { t, i18n } = useTranslation(["common", "events"]);
  const [initialFormValues, setInitialFormvalues] = useState(undefined);
  const lectureData = GetLectureData();

  const [popover1NubmerOpen, setPopover1NubmerOpen] = useState(-1);
  const close1 = () => {
    setPopover1NubmerOpen(-1);
  };

  const initEditPopover = (rowIndex) => {
    setInitialFormvalues(lectureData[rowIndex]);
  };

  const headers = [
    t("events:showLectures.lecture.name"),
    t("events:showLectures.lecture.description"),
    t("events:showLectures.lecture.startTime"),
    // t("events:showLectures.lecture.endTime"),
    "",
    "",
  ];
  const loadingData = [
    [
      t("common:message.waitingForData"),
      t("common:message.waitingForData"),
      t("common:message.waitingForData"),
      "",
    ],
  ];

  const ownEventTableCallbacks = [
    {
      cellNumber: 3,
      callback: (dataRowNumber) => {
        if (popover1NubmerOpen === dataRowNumber) setPopover1NubmerOpen(-1);
        else setPopover1NubmerOpen(dataRowNumber);
      },
    },
    {
      cellNumber: 4,
      callback: (dataRowNumber) => {},
    },
  ];

  return (
    <>
      <Heading {...styles.text}>
        {t("events:showLectures.main.showLecture")}
      </Heading>
      {isOwner && (
        <InputPopover
          defaultIsOpen={!!initialFormValues}
          //OnOpen={() => setOpenPopover(true)}
          OnClose={() => {
            setInitialFormvalues(null);
          }}
          label={
            initialFormValues
              ? t("events:showLectures.main.editLecture")
              : t("events:showLectures.main.addLecture")
          }
          component={FormLecture}
          componentProps={{
            initialValues: initialFormValues,
            eventId,
          }}
        />
      )}
      {isOwner && (
        <InputPopover
          defaultIsOpen={false}
          //OnOpen={() => setOpenPopover(true)}
          OnClose={() => {
            setInitialFormvalues(null);
          }}
          label={
            initialFormValues
              ? t("events:speakerBind.main.bindSpeaker")
              : t("events:speakerBind.main.reBindSpeaker")
          }
          component={BindSpeakers}
          componentProps={{
            eventId,
          }}
        />
      )}

      <Divider size="40px"></Divider>

      <Skeleton isLoaded={!!lectureData}>
        <MyTable
          columnsWidth={cellWidths}
          onCellsClick={ownEventTableCallbacks}
          data={
            lectureData
              ? lectureData.map((element, index) => [
                  element.name,
                  element.description,
                  DateFns.format(element.startDate, "dd-yy-yyyy"),
                  element.speakers.length !== 0 ? (
                    <SpeakersPopover
                      isOpen={popover1NubmerOpen === index}
                      onClose={close1}
                      data={element}
                    />
                  ) : null,
                  <InputPopover
                    defaultIsOpen={false}
                    OnClose={() => {
                      // close2();
                    }}
                    label={t("events:comment.question.heading")}
                    component={FormQuestion}
                    customButton={
                      <Box>
                        <ChatIcon />
                      </Box>
                    }
                    componentProps={{
                      data: element,
                    }}
                  />,
                ])
              : loadingData
          }
          labels={headers}
          onRowClick={initEditPopover}
        />
      </Skeleton>
    </>
  );
}

const SpeakersPopover = ({ isOpen, onClose, data }) => {
  const { t, i18n } = useTranslation(["common", "events"]);
  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={true}
      isLazy
    >
      <PopoverTrigger>
        <Box>
          <FaUserTie />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>{t("events:comment.speakers.heading")}</PopoverHeader>
        <PopoverCloseButton onClick={onClose} />
        <PopoverBody>
          {data.speakers.map((speaker, index) => (
            <Box key={index}>
              <Text>{speaker.name + " " + speaker.surname}</Text>
            </Box>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
