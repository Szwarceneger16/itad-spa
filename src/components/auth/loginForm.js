import { Formik, Field, Form } from "formik";
import React, { Suspense, useEffect, useState, useContext } from "react";
import { loginFormValidationSchema } from "../yupSchemas";
import {
  InputPassword,
  InputText,
  InputSwitch,
} from "../forms/InputElements.js";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DividerWithText, ErrorMessage } from "../forms/elements.js";
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

  const submitFrom = (values, actions) => {
    try {
      dispatch(login(values.login, values.password, values.rememberMe));
      dispatch(setMessage(t("auth:alert.login.succes"), "succes"));
      actions.setSubmitting(false);
      history.push("/");
    } catch (error) {
      debugger;
      dispatch(setMessage(t("auth:alert.login.error"), "error"));
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      <Formik
        initialValues={{
          login: "",
          password: "",
          rememberMe: true,
        }}
        //initialErrors={true}
        validationSchema={loginFormValidationSchema(t)}
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
                <InputSwitch fieldName="rememberMe">
                  {t("auth:switch.rememberMe")}
                </InputSwitch>
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
