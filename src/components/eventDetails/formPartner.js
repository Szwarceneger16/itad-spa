import { Formik, Field, Form } from "formik";
import React from "react";
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
import { useDispatch } from "react-redux";
import { setMessage } from "src/actions/message";
import eventPartnerService from "src/services/eventPartner.service";

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

function FormPartner({ firstFieldRef, dispatchClose, initialValues, eventId }) {
  const { t, i18n } = useTranslation(["common", "event"]);
  const dispatch = useDispatch();

  const submitFrom = async (values, actions) => {
    if (values.eventPartnerId === null) {
      eventPartnerService
        .addEventPartner(eventId, values.name, values.description)
        .then((response) => {
          dispatch(
            setMessage(t("event:eventPartner.add.succesmessage"), "succes")
          );
          dispatchClose();
          actions.resetForm();
        })
        .catch((error) => {
          dispatch(
            setMessage(t("event:eventPartner.add.errorMessage"), "error")
          );
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    } else {
      eventPartnerService
        .modifyEventPartner(
          values.eventPartnerId,
          values.name,
          values.description
        )
        .then((response) => {
          dispatch(
            setMessage(t("event:eventPartner.modify.succesmessage"), "succes")
          );
          dispatchClose();
          actions.resetForm();
        })
        .catch((error) => {
          dispatch(
            setMessage(t("event:eventPartner.modify.errorMessage"), "error")
          );
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    }
  };

  const deleteEventPartner = (eventPartnerId, resetFormHandler) => {
    eventPartnerService
      .deleteEventPartner(eventPartnerId)
      .then((response) => {
        dispatch(
          setMessage(t("event:eventPartner.delete.succesmessage"), "succes")
        );
        dispatchClose();
        resetFormHandler();
      })
      .catch((error) => {
        dispatch(
          setMessage(t("event:eventPartner.delete.errorMessage"), "error")
        );
      });
  };

  let _initialValues = initialValues ?? {
    eventPartnerId: null,
    name: "",
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
              labels={{ inputTitle: t("event:input.name.title") }}
            />
            <InputTextArea
              labelStyle={labelStyle}
              fieldName="description"
              labels={{
                inputTitle: t("event:input.description.title"),
              }}
            />

            <Flex align="center" mt={4}>
              <Box>
                <ButtonGroup>
                  <SubmitButton isSubmitting={props.isSubmitting} />
                  {initialValues && !!initialValues.speakerId && (
                    <DeleteIconButton
                      onClick={() => {
                        deleteEventPartner(
                          props.values.eventPartnerId,
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
export default FormPartner;
