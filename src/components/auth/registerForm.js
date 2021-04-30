import { Formik, Field, Form, FormikConsumer } from "formik";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import * as Yup from "yup";
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

const labelStyle = {
  fontFamily: "sans-serif",
  color: "orange.600",
  fontSize: [14, 16, 18],
};

// async function getMesseges (lang) {
//     const result = await new Promise(resolve => {
//         setTimeout(() => {
//             resolve('abcd');
//           }, 5000)
//     })
//     return result;
// }

function RegisterForm() {
  const { t, i18n } = useTranslation(["common", "auth"]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitForm = async (values, actions) => {
    handleOpenAlert();
    await dispatch(register(values.email, values.login, values.password))
      .then(() => {})
      .catch(() => {
        //history.push('/login');
      });
  };

  let timeoutID;
  const handleOpenAlert = () => {
    setIsOpen(true);
    timeoutID = setTimeout(() => {
      setIsOpen(false);
      history.push("/");
    }, 10000);
  };

  const handleCloseAlert = () => {
    setIsOpen(false);
    clearTimeout(timeoutID);
    history.push("/");
  };

  const validationSchema = Yup.object({
    login: Yup.string()
      .min(5, t("common:forms.errors.min", { number: 5 }))
      .max(15, t("common:forms.errors.max", { number: 15 }))
      .required(),
    password: Yup.string()
      .min(6, t("common:forms.errors.min", { number: 6 }))
      .max(15, t("common:forms.errors.max", { number: 15 }))
      .matches(/([a-z]+)/, t("common:forms.errors.password.lowerLetter"))
      .matches(/([A-Z]+)/, t("common:forms.errors.password.upperLetter"))
      .matches(/(\W+)/, t("common:forms.errors.password.special"))
      .matches(/(\d+)/, t("common:forms.errors.password.digit"))
      .required(t("common:forms.errors.reqired")),
    email: Yup.string().email().required(),
  });

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
          rememberMe: false,
        }}
        initialErrors={true}
        validationSchema={validationSchema}
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
