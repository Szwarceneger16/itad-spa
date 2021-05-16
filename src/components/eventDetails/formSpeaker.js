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

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

function FormLecturer({
  firstFieldRef,
  dispatchClose,
  initialValues,
  eventId,
}) {
  const { t, i18n } = useTranslation(["common", "speaker"]);
  const dispatch = useDispatch();

  const submitFrom = async (values, actions) => {
    if (values.speakerId === null) {
      speakerService
        .addSpeaker(eventId, values.name, values.surname, values.description)
        .then((response) => {
          dispatch(setMessage(t("event:speaker.add.succesmessage"), "succes"));
          dispatchClose();
          actions.resetForm();
        })
        .catch((error) => {
          dispatch(setMessage(t("event:speaker.add.errorMessage"), "error"));
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
            setMessage(t("event:speaker.modify.succesmessage"), "succes")
          );
          dispatchClose();
          actions.resetForm();
        })
        .catch((error) => {
          dispatch(setMessage(t("event:speaker.modify.errorMessage"), "error"));
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
        dispatch(setMessage(t("event:speaker.delete.succesmessage"), "succes"));
        dispatchClose();
        resetFormHandler();
      })
      .catch((error) => {
        dispatch(setMessage(t("event:speaker.delete.errorMessage"), "error"));
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
      >
        {(props) => (
          <Form>
            <InputText
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="name"
              labels={{ inputTitle: t("speaker:input.name.title") }}
            />
            <InputText
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="surname"
              labels={{
                inputTitle: t("formLecturer:input.surname.title"),
              }}
            />
            <InputTextArea
              labelStyle={labelStyle}
              fieldName="description"
              labels={{
                inputTitle: t("formLecturer:input.description.title"),
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
export default FormLecturer;
