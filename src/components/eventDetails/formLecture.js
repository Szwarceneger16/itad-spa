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

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

function FormLecture({ firstFieldRef, onCancel, initialValues }) {
  const { t, i18n } = useTranslation(["common", "formLecture"]);
  const [submitError, setSubmitError] = useState();

  const submitFrom = async (values, actions) => {
    alert("");
    actions.setSubmitting(false);
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
            <InputTime
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
                        onCancel();
                        deleteForm();
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
    </Stack>
  );
}
export default FormLecture;
