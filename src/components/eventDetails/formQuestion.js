import { Button, PopoverBody, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import MyTable from "../table";
import { useDispatch, useSelector } from "react-redux";
import { Box, Input } from "@material-ui/core";
import { InputText } from "src/components/forms/InputElements";
import { Form, Formik } from "formik";
import questionService from "src/services/question.service";
import { setMessage } from "src/actions/message";
import { addQuestionValidaitonSchema } from "../yupSchemas";

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

export default ({ firstFieldRef, dispatchClose, data }) => {
  const { t, i18n } = useTranslation(["common", "events"]);
  const dispatch = useDispatch();

  return (
    <Box minWidth="400px">
      <Formik
        initialValues={{
          question: "",
        }}
        onSubmit={(values, action) => {
          questionService
            .addQuestion(data.lectureId, values.question)
            .then(() => {
              dispatch(
                setMessage(t("events:comment.add.succesmessage"), "succes")
              );
              dispatchClose();
            })
            .catch(() =>
              dispatch(setMessage(t("events:comment.add.errorMessage"), "error"))
            );
        }}
        validationSchema={ addQuestionValidaitonSchema(t) }
      >
        {(props) => (
          <Form>
            <PopoverBody>
              <Box>
                <MyTable
                  columnsWidth={[["40%"], ["60%"]]}
                  labels={[
                    t("events:question.table.who"),
                    t("events:question.table.content"),
                  ]}
                  data={data.questions.map((question) => [
                    question.name + " " + question.surname,
                    question.question,
                  ])}
                />
              </Box>
              <Flex justifyContent="center" alignItems="end">
                <InputText
                  labelStyle={labelStyle}
                  fieldName="question"
                  innerRef={firstFieldRef}
                  labels={{
                    inputTitle: t("events:question.addComment"),
                  }}
                />
                <Button mx={2} onClick={props.handleSubmit}>
                  {t("events:question.button.submit")}
                </Button>
              </Flex>
            </PopoverBody>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
