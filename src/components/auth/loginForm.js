import { Formik, Field, Form } from "formik";
import React, { Suspense, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import * as Yup from "yup";
import {
  InputPassword,
  InputText,
  InputSwitch,
} from "../forms/InputElements.js";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DividerWithText, ErrorMessage } from "../forms/elements.js";
//import { sessionManager } from '../sessionStore/sessionManager.js.bak';
import api from "../../api/apiEntity";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import { setMessage } from "../../actions/message";

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

function LoginForm() {
  const { t, i18n } = useTranslation(["common", "auth"]);
  //debugger;
  const [submitError, setSubmitError] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const submitFrom = async (values, actions) => {
    await dispatch(login(values.login, values.password, values.rememberMe))
      .then(() => {
        dispatch(
          setMessage("aaaa" /* t("auth:alert.login.succes") */, "succes")
        ).then(() => {
          actions.setSubmitting(false);
          history.push("/");
        });
      })
      .catch(() => {
        //history.push('/login');
        actions.setSubmitting(false);
        dispatch(setMessage(t("auth:alert.login.error"), "error"));
      });
  };

  const validationSchema = Yup.object({
    login: Yup.string()
      // .min(5,t('common:forms.errors.min',{number: 5}) )
      // .max(15,t('common:forms.errors.max', {number: 15}) )
      .required(t("common:forms.errors.required")),
    password: Yup.string()
      // .min(6,t('common:forms.errors.min',{number: 6}))
      // .max(15,t('common:forms.errors.max', {number: 15}))
      // .matches(/([a-z]+)/,t('common:forms.errors.password.lowerLetter') )
      // .matches(/([A-Z]+)/,t('common:forms.errors.password.upperLetter') )
      // .matches(/(\W+)/,t('common:forms.errors.password.special') )
      // .matches(/(\d+)/,t('common:forms.errors.password.digit'))
      .required(t("common:forms.errors.required")),
  });

  return (
    <>
      {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      <Formik
        initialValues={{
          login: "",
          password: "",
          rememberMe: false,
        }}
        initialErrors={true}
        validationSchema={validationSchema}
        onSubmit={submitFrom}
      >
        {(props) => (
          <Form>
            <InputText
              labelStyle={labelStyle}
              fieldName="login"
              labels={{ inputTitle: t("auth:input.login.title") }}
            />
            <InputPassword
              labelStyle={labelStyle}
              fieldName="password"
              labels={{
                inputTitle: t("auth:input.password.title"),
                buttonHide: t("common:buttons.passwordVisibilityToggle.hide"),
                buttonShow: t("common:buttons.passwordVisibilityToggle.show"),
              }}
            />
            <DividerWithText></DividerWithText>
            <Flex align="center" flexWrap="wrap" mt={4}>
              <Box>
                <InputSwitch fieldName="rememberMe">Remember Me</InputSwitch>
              </Box>
              <Spacer />
              <Box>
                <Button isLoading={props.isSubmitting} type="submit">
                  {t("common:buttons.submit.title")}
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
}

// function mapStateToProps(state) {
//     const { isLoggedIn } = state.auth;
//     const { message } = state.message;
//     return {
//       isLoggedIn,
//       message
//     };
//   }

// export default connect(mapStateToProps)(LoginForm);
export default LoginForm;
