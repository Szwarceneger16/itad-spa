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
import { InputFile, InputText, InputTextArea } from "../forms/InputElements";
import { ErrorMessage } from "../forms/elements";
import speakerService from "src/services/speaker.service";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMessage } from "src/actions/message";
import { setLastUpdatedDataType } from "src/actions/events";
import { SET_SPEAKER_DATA } from "src/actions/types";
import { addSpeakerValidaitonSchema } from "../yupSchemas";

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

function FormSpeaker({ firstFieldRef, dispatchClose, initialValues, eventId }) {
  const { t, i18n } = useTranslation(["common", "events"]);
  const dispatch = useDispatch();

  const submitFrom = async (values, actions) => {
    if (values.speakerId === null) {
      speakerService
        .addSpeaker(eventId, values.name, values.surname, values.description)
        .then((response) => {
          dispatch(setMessage(t("events:formSpeaker.add.succesmessage"), "succes"));
          dispatchClose();
          dispatch(setLastUpdatedDataType(SET_SPEAKER_DATA));
          actions.resetForm();
        })
        .catch((error) => {
          dispatch(setMessage(t("events:formSpeaker.add.errorMessage"), "error"));
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    } else {
      speakerService
        .modifySpeaker(
          values.speakerId,
          values.name,
          values.surname,
          values.description
        )
        .then((response) => {
          dispatch(
            setMessage(t("events:formSpeaker.modify.succesmessage"), "succes")
          );
          dispatchClose();
          dispatch(setLastUpdatedDataType(SET_SPEAKER_DATA));
          actions.resetForm();
        })
        .catch((error) => {
          dispatch(setMessage(t("events:formSpeaker.modify.errorMessage"), "error"));
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    }
  };

  const deleteSpeaker = (eventId, speakerId, resetFormHandler) => {
    speakerService
      .deleteSpeaker(speakerId, eventId)
      .then((response) => {
        dispatch(setMessage(t("events:formSpeaker.delete.succesmessage"), "succes"));
        dispatchClose();
        dispatch(setLastUpdatedDataType(SET_SPEAKER_DATA));
        resetFormHandler();
      })
      .catch((error) => {
        dispatch(setMessage(t("events:formSpeaker.delete.errorMessage"), "error"));
      });
  };

  let _initialValues = initialValues ?? {
    speakerId: null,
    name: "",
    surname: "",
    description: "",
  };

  return (
    <Stack spacing={4}>
      {/* {submitError && <ErrorMessage>{submitError}</ErrorMessage>} */}
      <Formik
        enableReinitialize
        initialValues={_initialValues}
        //initialErrors={true}
        onSubmit={submitFrom}
        // initialTouched
        validationSchema={ addSpeakerValidaitonSchema(t) }
      >
        {(props) => (
          <Form>
            <InputText
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="name"
              labels={{ inputTitle: t("events:formSpeaker.input.name") }}
            />
            <InputText
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="surname"
              labels={{
                inputTitle: t("events:formSpeaker.input.surname"),
              }}
            />
            <InputTextArea
              labelStyle={labelStyle}
              fieldName="description"
              labels={{
                inputTitle: t("events:formSpeaker.input.description"),
              }}
            />
            {/* <InputFile
                labelStyle={labelStyle}
                fieldName="file"
                accept="image/png, image/jpeg"
                labels={{
                  inputTitle: t("formLecturer:input.file.title"),
                  buttonTitle: t("formLecturer:input.file.Button"),
                }}
              /> */}

            <Flex align="center" mt={4}>
              <Box>
                <ButtonGroup>
                  <SubmitButton isSubmitting={props.isSubmitting} />
                  {initialValues && !!initialValues.speakerId && (
                    <DeleteIconButton
                      onClick={() => {
                        deleteSpeaker(
                          eventId,
                          props.values.speakerId,
                          props.resetForm
                        );
                      }}
                    />
                  )}
                  <CloseIconButton onClick={dispatchClose} />
                </ButtonGroup>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}
export default FormSpeaker;
