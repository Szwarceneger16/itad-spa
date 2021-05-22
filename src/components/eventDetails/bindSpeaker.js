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
  InputSelect,
  InputText,
  InputTextArea,
  InputTime,
} from "../forms/InputElements";
import { ErrorMessage } from "../forms/elements";
import {
  CloseIconButton,
  DeleteButton,
  DeleteIconButton,
  SubmitButton,
} from "../forms/buttons";
import lectureService from "src/services/lecture.service";
import { setMessage } from "src/actions/message";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
  const lectureData = useSelector((state) => state.events.lecturesData);
  const speakersData = useSelector((state) => state.events.speakersData);

  const submitFrom = (values, actions) => {
    //console.log(values);
    if (values.lectureId && values.speakersAddId && values.addingMode) {
      lectureService
        .bindSpeaker(values.lectureId, values.speakersAddId)
        .then((response) => {
          dispatch(setMessage(t("events:speakerBind.add.succesmessage"), "succes"));
          dispatchClose();
          actions.resetForm();
        })
        .catch((error) => {
          dispatch(setMessage(t("events:speakerBind.add.errorMessage"), "error"));
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    } else if (
      values.lectureId &&
      values.speakersRemoveId &&
      !values.addingMode
    ) {
      lectureService
        .unbindSpeaker(values.lectureId, values.speakersRemoveId)
        .then((response) => {
          dispatch(
            setMessage(t("events:speakerBind.delete.succesmessage"), "succes")
          );
          dispatchClose();
          actions.resetForm();
        })
        .catch((error) => {
          dispatch(setMessage(t("events:speakerBind.delete.errorMessage"), "error"));
        });
    }
    //actions.setSubmitting(false);
  };

  let _initialValues = initialValues ?? {
    lectureId: null,
    speakersAddId: [],
    speakersRemoveId: [],
    addingMode: true,
  };

  const speakersDataToAdd = (lectureId) => {
    const lecture = lectureData.find((el) => el.lectureId === lectureId);
    return speakersData
      .filter((el) => !lecture.speakersIds.includes(el.speakerId))
      .map((element) => {
        return {
          value: element.speakerId,
          label: element.name + " " + element.surname,
        };
      });
  };

  const speakersDataToRemove = (lectureId) => {
    const lecture = lectureData.find((el) => el.lectureId === lectureId);
    return speakersData
      .filter((el) => lecture.speakersIds.includes(el.speakerId))
      .map((element) => {
        return {
          value: element.speakerId,
          label: element.name + " " + element.surname,
        };
      });
  };

  return (
    <Stack spacing={4}>
      {/* {submitError && <ErrorMessage>{submitError}</ErrorMessage>} */}
      <Formik
        enableReinitialize
        initialValues={_initialValues}
        onSubmit={submitFrom}
        handleChange={() => {}}
      >
        {(props) => (
          <Form>
            {/* <InputText
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="name"
              labels={{ inputTitle: t("events:input.name.title") }}
            /> */}
            <InputSelect
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="lectureId"
              placeholder={t("events:speakerBind.message.selectLectureFirst")}
              valueIsNumber={true}
              values={
                (lectureData &&
                  lectureData.map((element) => {
                    return {
                      value: element.lectureId,
                      label: element.name,
                    };
                  })) ??
                []
              }
              labels={{
                inputTitle: t("events:speakerBind.selectLecture.title"),
              }}
            />
            <InputSelect
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="speakersAddId"
              isDisabled={!props.values.lectureId}
              placeholder={t("events:speakerBind.message.selectSpeaker")}
              valueIsNumber={true}
              values={
                (props.values.lectureId &&
                  speakersData &&
                  speakersDataToAdd(props.values.lectureId)) ??
                []
              }
              labels={{
                inputTitle: t("events:speakerBind.selectSpeakerToAdd.title"),
              }}
            />
            <Flex align="center" mt={4}>
              <Box>
                <SubmitButton
                  isDisabled={!props.values.lectureId}
                  isSubmitting={props.isSubmitting}
                />
              </Box>
            </Flex>
            <InputSelect
              labelStyle={labelStyle}
              innerRef={firstFieldRef}
              fieldName="speakersRemoveId"
              isDisabled={!props.values.lectureId}
              placeholder={t("events:speakerBind.message.selectSpeaker")}
              valueIsNumber={true}
              values={
                (props.values.lectureId &&
                  speakersData &&
                  speakersDataToRemove(props.values.lectureId)) ??
                []
              }
              labels={{
                inputTitle: t("events:speakerBind.selectSpeakerToRemove.title"),
              }}
            />
            {/* <InputTime
              labelStyle={labelStyle}
              fieldName="endTime"
              labels={{ inputTitle: t("formLecture:input.endTime.title") }}
            /> */}

            <Flex align="center" mt={4}>
              <Box m={1}>
                <DeleteButton
                  onClick={() => {
                    props.values.addingMode = false;
                    props.submitForm();
                  }}
                />
              </Box>
              <Box m={1}>
                <CloseIconButton onClick={dispatchClose} />
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}
export default FormLecture;
