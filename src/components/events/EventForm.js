import { Formik, Field, Form } from "formik";
import React, { Suspense, useEffect, useState, useContext } from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Stack,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import {
  CloseIconButton,
  DeleteIconButton,
  SubmitButton,
} from "../forms/buttons";
import { useTranslation } from "react-i18next";
import {
  InputFile,
  InputNumber,
  InputText,
  InputTextArea,
  InputDate,
} from "../forms/InputElements";
import { ErrorMessage } from "../forms/elements";
import { useEventData } from "src/hooks/useEventData";
import EventService from "src/services/event.service";
import { eventModifyValidaitonSchema } from "src/components/yupSchemas";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setMessage } from "src/actions/message";

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

function FormEvent({ firstFieldRef, onCancel, eventId }) {
  const { t, i18n } = useTranslation(["common", "events"]);
  const eventData = useEventData(eventId);
  const history = useHistory();
  const dispatch = useDispatch();

<<<<<<< HEAD
function FormEvent({ firstFieldRef, onCancel, initialValues }) {
  const { t, i18n } = useTranslation(["common", "events"]);
  //const [submitError, setSubmitError] = useState("");
  //const user = undefined;

  const submitFrom = async (values, actions) => {
=======
  const submitFrom = (values, actions) => {
>>>>>>> develop
    const _values = { ...values };
    if (_values.eventId === null) delete values.eventId;
    console.log(_values);
    EventService.addEvent(_values)
      .then((response) => {
        dispatch(setMessage(t("events:event.input.succesmessage"), "succes"));
        history.push("/eventAll");
      })
      .catch((error) => {
        dispatch(setMessage(t("events:event.input.errorMessage"), "error"));
      });
  };

  const deleteEvent = (eventId) => {};

  let _initialValues = eventData ?? {
    name: "",
    description: "",
    startTime: new Date(),
    // endDate: new Date(),
    // availableTickets: 0,
    // ticketPrice: 0,
    // owner: 0,
    //file:(initialValues &&  initialValues.file) || '',
  };

  return (
    <>
      {/* {submitError && <ErrorMessage>{submitError}</ErrorMessage>} */}
      <Formik
        // enableReinitialize
        initialValues={_initialValues}
        validationSchema={eventModifyValidaitonSchema(t)}
        //initialErrors={true}

        onSubmit={submitFrom}
        initialTouched={{
          eventId: true,
        }}
      >
        {(props) => (
          <Form>
            <InputText
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="name"
              labels={{ inputTitle: t("events:event.input.name") }}
            />
            <InputTextArea
              labelStyle={labelStyle}
              fieldName="description"
              labels={{
                inputTitle: t("events:event.input.description"),
              }}
            />
            <InputDate
              labelStyle={labelStyle}
              fieldName="startTime"
              disablePast
              labels={{
<<<<<<< HEAD
                inputTitle: t("events:event.input.startDate"),
=======
                inputTitle: t("events:event.input.startTime"),
>>>>>>> develop
              }}
            ></InputDate>
            {/* <InputDate
              labelStyle={labelStyle}
              fieldName="endDate"
              disablePast
              labels={{
                inputTitle: t("events:event.input.endDate"),
              }}
            ></InputDate>
            <InputNumber
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="availableTickets"
              labels={{ inputTitle: t("events:event.input.availableTickets") }}
            />
            <InputNumber
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="ticketPrice"
              labels={{ inputTitle: t("events:event.input.ticketPrice") }}
<<<<<<< HEAD
            />
=======
            /> */}
>>>>>>> develop

            <Flex align="center" mt={4}>
              <Box>
                <ButtonGroup>
                  <SubmitButton isSubmitting={props.isSubmitting} />
                  {eventData && !!eventData.id && (
                    <DeleteIconButton
                      onClick={() => {
                        onCancel();
                        deleteEvent();
                      }}
                    />
                  )}
                  <CloseIconButton onClick={onCancel} />
                </ButtonGroup>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default FormEvent;
