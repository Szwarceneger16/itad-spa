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
  DividerWithText,
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
import EventService from "src/services/event.service";

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function FormEvent({ firstFieldRef, onCancel, initialValues }) {
  const { t, i18n } = useTranslation(["common", "event"]);
  //const [submitError, setSubmitError] = useState("");
  //const user = undefined;

  const submitFrom = async (values, actions) => {
    const _values = { ...values };
    if (_values.eventId === null) delete values.eventId;
    await EventService.addEvent(_values);
  };

  const deleteForm = (eventId) => {};

  // const validationSchema = Yup.object({
  //     login: Yup.string()
  //     .min(5,t('common:forms.errors.min',{number: 5}) )
  //     .max(15,t('common:forms.errors.max', {number: 15}) )
  //     .required(t('common:forms.errors.required')),

  // });

  let _initialValues = initialValues ?? {
    eventId: null,
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    availableTickets: 0,
    ticketPrice: 0,
    owner: 0,
    //file:(initialValues &&  initialValues.file) || '',
  };

  return (
    <>
      {/* {submitError && <ErrorMessage>{submitError}</ErrorMessage>} */}
      <Formik
        enableReinitialize
        initialValues={_initialValues}
        //initialErrors={true}
        onSubmit={submitFrom}
      >
        {(props) => (
          <Form>
            <InputText
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="name"
              labels={{ inputTitle: t("event:input.name.title") }}
            />
            <InputTextArea
              labelStyle={labelStyle}
              fieldName="description"
              labels={{
                inputTitle: t("event:input.description.title"),
              }}
            />
            <InputDate
              labelStyle={labelStyle}
              fieldName="startDate"
              disablePast
              labels={{
                inputTitle: t("event:input.startDate.title"),
              }}
            ></InputDate>
            <InputDate
              labelStyle={labelStyle}
              fieldName="endDate"
              disablePast
              labels={{
                inputTitle: t("event:input.endDate.title"),
              }}
            ></InputDate>
            <InputNumber
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="availableTickets"
              labels={{ inputTitle: t("event:input.availableTickets.title") }}
            />
            <InputNumber
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="ticketPrice"
              labels={{ inputTitle: t("event:input.ticketPrice.title") }}
            />

            <Flex align="center" mt={4}>
              <Box>
                <ButtonGroup>
                  <SubmitButton isSubmitting={props.isSubmitting} />
                  {initialValues && !!initialValues.id && (
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
    </>
  );
}
export default FormEvent;
