import { Formik, Field, Form, useFormikContext } from "formik";
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

import { useTranslation } from "react-i18next";
import {
  InputDate,
  InputNumber,
  InputText,
  InputTextArea,
  InputTime,
} from "../forms/InputElements";
import { ErrorMessage } from "../forms/elements";
import {
  CloseIconButton,
  DeleteIconButton,
  SubmitButton,
} from "../forms/buttons";
import lectureService from "src/services/lecture.service";
import { setMessage } from "src/actions/message";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_LECTURE_DATA } from "src/actions/types";
import { setLastUpdatedDataType } from "src/actions/events";
import { addLectureValidaitonSchema } from "../yupSchemas";

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

function FormLecture({ firstFieldRef, dispatchClose, initialValues, eventId }) {
  const { t, i18n } = useTranslation(["common", "events"]);
  const [submitError, setSubmitError] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const submitFrom = (values, actions) => {
    if (values.lectureId === null) {
      lectureService
        .addLecture(eventId, values.name, values.description, values.startDate)
        .then((response) => {
          dispatch(setMessage(t("events:formLecture.lecture.add.succesmessage"), "succes"));
          dispatchClose();
          dispatch(setLastUpdatedDataType(SET_LECTURE_DATA));
          actions.resetForm();
        })
        .catch((error) => {
          dispatch(setMessage(t("events:formLecture.lecture.add.errorMessage"), "error"));
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    } else {
      lectureService
        .modifyLecture(
          values.lectureId,
          eventId,
          values.name,
          values.description,
          values.startDate
        )
        .then((response) => {
          dispatch(
            setMessage(t("events:formLecture.lecture.modify.succesmessage"), "succes")
          );
          dispatchClose();
          dispatch(setLastUpdatedDataType(SET_LECTURE_DATA));

          actions.resetForm();
        })
        .catch((error) => {
          dispatch(setMessage(t("events:formLecture.lecture.modify.errorMessage"), "error"));
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    }
  };

  const deleteEvent = (eventId, lectureId, resetFormHandler) => {
    lectureService
      .deleteLecture(lectureId, eventId)
      .then((response) => {
        dispatch(setMessage(t("events:formLecture.lecture.delete.succesmessage"), "succes"));
        dispatchClose();
        dispatch(setLastUpdatedDataType(SET_LECTURE_DATA));

        resetFormHandler();
      })
      .catch((error) => {
        dispatch(setMessage(t("events:formLecture.lecture.delete.errorMessage"), "error"));
      });
  };

  let _initialValues = initialValues ?? {
    lectureId: null,
    name: "",
    description: "",
    startDate: new Date(),
    availableSeats: 0,
    // endTime:
    //   (initialValues && initialValues.endTime) ||
    //   new Date(Date.now() + 3600000),
  };

  return (
    <Stack spacing={4}>
      {/* {submitError && <ErrorMessage>{submitError}</ErrorMessage>} */}
      <Formik
        enableReinitialize
        initialValues={_initialValues}
        onSubmit={submitFrom}
        validationSchema={ addLectureValidaitonSchema(t) }
      >
        {(props) => (
          <Form>
            <InputText
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="name"
              labels={{ inputTitle: t("events:formLecture.input.name2.title") }}
            />
            <InputTextArea
              labelStyle={labelStyle}
              fieldName="description"
              labels={{ inputTitle: t("events:formLecture.input.description2.title") }}
            />
            <InputDate
              labelStyle={labelStyle}
              fieldName="startDate"
              labels={{ inputTitle: t("events:formLecture.input.startTime2.title") }}
            />
            {/* <InputNumber
              labelStyle={labelStyle}
              fieldName="availableSeats"
              labels={{
                inputTitle: t("events:formLecture.input.availableSeats.title"),
              }}
            /> */}

            {/* <InputTime
              labelStyle={labelStyle}
              fieldName="endTime"
              labels={{ inputTitle: t("events:formLecture.input.endTime.title") }}
            /> */}

            <Flex align="center" mt={4}>
              <Box>
                <ButtonGroup>
                  <SubmitButton isSubmitting={props.isSubmitting} />
                  {initialValues && !!initialValues.lectureId && (
                    <DeleteIconButton
                      onClick={() => {
                        deleteEvent(
                          eventId,
                          props.values.lectureId,
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
export default FormLecture;
