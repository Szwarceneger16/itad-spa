import { Formik, Field, Form, FormikConsumer } from "formik";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { registerFormValidationSchema } from "../yupSchemas";
import { register } from "../../actions/auth";
import {
  InputPassword,
  InputText,
  InputSwitch,
  InputEmail,
} from "../forms/InputElements.js";
import {
  Stack,
  Box,
  Flex,
  Spacer,
  Input,
  Button,
  color,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import EmailVerificationAlert from "./emailVerificationAlert";
import { setMessage } from "src/actions/message";

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

function RegisterForm() {
  const { t, i18n } = useTranslation(["common", "auth"]);
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutID, setTimeoutID] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitForm = async (values, actions) => {
    try {
      await dispatch(register(values.email, values.login, values.password));
      handleOpenAlert();
    } catch (error) {
      dispatch(setMessage(t("auth:alert.register.error"), "error"));
      actions.setSubmitting(false);
    }
  };

  const handleOpenAlert = () => {
    setIsOpen(true);
    setTimeoutID(
      setTimeout(() => {
        setIsOpen(false);
        history.push("/login");
      }, 10000)
    );
  };

  const handleCloseAlert = () => {
    setIsOpen(false);
    clearTimeout(timeoutID);
    history.push("/login");
  };

  return (
    <>
      <EmailVerificationAlert
        isOpen={isOpen}
        onClose={() => handleCloseAlert()}
      />
      <Formik
        initialValues={{
          login: "",
          password: "",
          email: "",
          rememberMe: true,
        }}
        //initialErrors={true}
        validationSchema={registerFormValidationSchema(t)}
        onSubmit={submitForm}
      >
        {(props) => (
          <Form>
            <InputEmail
              labelStyle={labelStyle}
              fieldName="email"
              labels={{ inputTitle: t("auth:input.email.title") }}
            />
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

            <Flex align="center" flexWrap="wrap" mt={4}>
              {/* <Box>
                        <InputSwitch fieldName='rememberMe'>Remember Me</InputSwitch>
                    </Box> */}
              <Spacer />
              <Box alignSelf="flex-end">
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

export default RegisterForm;
