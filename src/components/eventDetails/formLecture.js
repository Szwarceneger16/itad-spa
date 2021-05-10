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

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

function FormLecture({ firstFieldRef, dispatchClose, initialValues, eventId }) {
  const { t, i18n } = useTranslation(["common", "formLecture"]);
  const [submitError, setSubmitError] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const submitFrom = (values, actions) => {
    const _values = { ...values };
    if (_values.lectureId === null) delete _values.lectureId;
    //console.log(_values);
    lectureService
      .addLecture(eventId, _values.name, _values.description, _values.startDate)
      .then((response) => {
        dispatch(setMessage(t("events:lecture.input.succesmessage"), "succes"));
        dispatchClose();
      })
      .catch((error) => {
        dispatch(setMessage(t("events:lecture.input.errorMessage"), "error"));
      });
  };

  const deleteForm = () => {};

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

  console.log(initialValues);

  return (
    <Stack spacing={4}>
      {/* {submitError && <ErrorMessage>{submitError}</ErrorMessage>} */}
      <Formik
        enableReinitialize
        initialValues={_initialValues}
        onSubmit={submitFrom}
      >
        {(props) => (
          <Form>
            <InputText
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="name"
              labels={{ inputTitle: t("formLecture:input.name.title") }}
            />
            <InputTextArea
              labelStyle={labelStyle}
              fieldName="description"
              labels={{ inputTitle: t("formLecture:input.description.title") }}
            />
            <InputDate
              labelStyle={labelStyle}
              fieldName="startDate"
              labels={{ inputTitle: t("formLecture:input.startTime.title") }}
            />
            <InputNumber
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="availableSeats"
              labels={{
                inputTitle: t("formLecture:input.availableSeats.title"),
              }}
            />

            {/* <InputTime
              labelStyle={labelStyle}
              fieldName="endTime"
              labels={{ inputTitle: t("formLecture:input.endTime.title") }}
            /> */}

            <Flex align="center" mt={4}>
              <Box>
                <ButtonGroup>
                  <SubmitButton isSubmitting={props.isSubmitting} />
                  {initialValues && !!initialValues.lectureId && (
                    <DeleteIconButton
                      onClick={() => {
                        dispatchClose();
                        deleteForm();
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
