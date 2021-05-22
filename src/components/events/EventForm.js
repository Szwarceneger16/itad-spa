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

  const submitFrom = (values, actions) => {
    if (Number.isNaN(eventId)) {
      EventService.addEvent(
        values.name,
        values.description,
        values.startDate.toISOString(),
        values.availableTickets,
        values.ticketPrice
      )
        .then((response) => {
          dispatch(setMessage(t("events:event.add.succesmessage"), "succes"));
          history.push("/eventsAll");
        })
        .catch((error) => {
          dispatch(setMessage(t("events:event.add.errorMessage"), "error"));
        });
    } else {
      EventService.modifyEvent(
        eventId,
        values.name,
        values.description,
        values.startDate,
        values.availableTickets,
        values.ticketPrice
      )
        .then((response) => {
          dispatch(setMessage(t("events:event.modify.succesmessage"), "succes"));
          history.push("/eventsAll");
        })
        .catch((error) => {
          dispatch(setMessage(t("events:event.modify.errorMessage"), "error"));
        });
    }
  };

  const deleteEvent = () => {
    EventService.deleteEvent(eventId)
      .then((response) => {
        dispatch(setMessage(t("events:vent.edelete.succesmessage"), "succes"));
        history.push("/eventsAll");
      })
      .catch((error) => {
        dispatch(setMessage(t("events:event.delete.errorMessage"), "error"));
        history.push("/eventsAll");
      });
  };

  if (eventData) {
    for (const [key, value] of Object.entries(eventData)) {
      if (value === null || value === undefined) {
        eventData[key] = 0;
      }
    }
  }

  let _initialValues = eventData ?? {
    name: "",
    description: "",
    startDate: new Date(),
    // endDate: new Date(),
    availableTickets: 0,
    ticketPrice: 0,
    // owner: 0,
    //file:(initialValues &&  initialValues.file) || '',
  };

  return (
    <>
      {/* {submitError && <ErrorMessage>{submitError}</ErrorMessage>} */}
      <Formik
        enableReinitialize
        initialValues={_initialValues}
        //validationSchema={eventModifyValidaitonSchema(t)}
        //initialErrors={true}

        onSubmit={submitFrom}
        // initialTouched={{
        //   eventId: true,
        // }}
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
              fieldName="startDate"
              disablePast
              labels={{
                inputTitle: t("events:event.input.startDate"),
              }}
            ></InputDate>
            {/* <InputDate
              labelStyle={labelStyle}
              fieldName="endDate"
              disablePast
              labels={{
                inputTitle: t("events:event.input.endDate"),
              }}
            ></InputDate> */}
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
            />

            <Flex align="center" mt={4}>
              <Box>
                <ButtonGroup>
                  <SubmitButton isSubmitting={props.isSubmitting} />
                  {eventData && !!eventData.eventId && (
                    <DeleteIconButton
                      onClick={() => {
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
