import {
  Heading,
  Divider,
  Skeleton,
  Button,
  ButtonGroup,
  Popover,
  Text,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputPopover from "../forms/InputPopover";
import FormLecture from "./formLecture";
import BindSpeakers from "src/components/eventDetails/bindSpeaker";
import styles from "./style";
import MyTable from "../table";
import * as DateFns from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { GetLectureData } from "src/selectors";
import { ChatIcon, InfoIcon } from "@chakra-ui/icons";
import { Box } from "@material-ui/core";
import { InputText } from "src/components/forms/InputElements";
import { Form, Formik } from "formik";
import questionService from "src/services/question.service";
import { setMessage } from "src/actions/message";
import { SubmitButton } from "src/components/forms/buttons";
import FocusLock from "react-focus-lock";

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

const cellWidths = [["25%"], ["35%"], ["20%"], ["5%"], ["5%"]];
export default function ({ isOwner, eventId }) {
  const { t, i18n } = useTranslation(["common", "event"]);
  const [initialFormValues, setInitialFormvalues] = useState(undefined);
  const lectureData = GetLectureData();
  const dispatch = useDispatch();

  const [popover1NubmerOpen, setPopover1NubmerOpen] = useState(-1);
  const [popover2NubmerOpen, setPopover2NubmerOpen] = useState(-1);
  const initialFocusRef2 = React.useRef(null);
  const close1 = () => {
    setPopover1NubmerOpen(-1);
  };
  const close2 = () => {
    setPopover2NubmerOpen(-1);
  };

  const initEditPopover = (rowIndex) => {
    setInitialFormvalues(lectureData[rowIndex]);
  };

  const headers = [
    t("eventDetails:lecture.name"),
    t("eventDetails:lecture.description"),
    t("eventDetails:lecture.startTime"),
    // t("eventDetails:lecture.endTime"),
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
      callback: (dataRowNumber) => {
        // if (popover2NubmerOpen === dataRowNumber) setPopover2NubmerOpen(-1);
        // else
        setPopover2NubmerOpen(dataRowNumber);
      },
    },
  ];

  return (
    <>
      <Heading {...styles.text}>{t("eventDetails:main.showLecture")}</Heading>
      {isOwner && (
        <InputPopover
          defaultIsOpen={!!initialFormValues}
          //OnOpen={() => setOpenPopover(true)}
          OnClose={() => {
            setInitialFormvalues(null);
          }}
          label={
            initialFormValues
              ? t("eventDetails:main.editLecture")
              : t("eventDetails:main.addLecture")
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
              ? t("eventDetails:main.bindSpeaker")
              : t("eventDetails:main.reBindSpeaker")
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
                    <Popover
                      returnFocusOnClose={false}
                      isOpen={popover1NubmerOpen === index}
                      onClose={close1}
                      placement="right"
                      closeOnBlur={true}
                      isLazy
                    >
                      <PopoverTrigger>
                        <InfoIcon />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton onClick={close1} />
                        <PopoverBody>
                          <Heading as="h2">PrelegenciTrans</Heading>
                          {element.speakers.map((speaker, index) => (
                            <Box key={index}>
                              <Text>
                                {speaker.name + " " + speaker.surname}
                              </Text>
                            </Box>
                          ))}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  ) : null,
                  <Popover
                    returnFocusOnClose={true}
                    isOpen={popover2NubmerOpen === index}
                    onClose={close2}
                    placement="right"
                    closeOnBlur={true}
                  >
                    <PopoverTrigger>
                      <ChatIcon />
                    </PopoverTrigger>
                    <PopoverContent>
                      <Formik
                        initialValues={{
                          question: "aaaaa",
                        }}
                        onSubmit={(values, action) => {
                          questionService
                            .addQuestion(element.lectureId, values.question)
                            .then(() => {
                              dispatch(
                                setMessage(
                                  t("pozytywne.dodanie.komentarza"),
                                  "succes"
                                )
                              );
                              close2();
                            })
                            .catch(() =>
                              dispatch(
                                setMessage(
                                  t("negatywne.dodanie.komentarza"),
                                  "error"
                                )
                              )
                            );
                        }}
                      >
                        {(props) => (
                          <Form>
                            <PopoverArrow />
                            <PopoverCloseButton onClick={close2} />
                            <PopoverBody>
                              <Box>
                                <InputText
                                  labelStyle={labelStyle}
                                  fieldName="question"
                                  labels={{
                                    inputTitle: t(
                                      "eventDetails:input.name.wymyslCos"
                                    ),
                                  }}
                                />
                                <Button onClick={props.handleSubmit}>
                                  Submit
                                </Button>
                              </Box>
                            </PopoverBody>
                          </Form>
                        )}
                      </Formik>
                    </PopoverContent>
                  </Popover>,
                ])
              : loadingData
          }
          labels={headers}
          onRowClick={initEditPopover}
        />
      </Skeleton>
    </>
    // </Box>
  );
}
function dispatch(arg0) {
  throw new Error("Function not implemented.");
}
