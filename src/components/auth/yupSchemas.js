import * as Yup from "yup";

const login = (t) =>
  Yup.string()
    .min(5, t("common:forms.errors.min", { number: 5 }))
    .max(15, t("common:forms.errors.max", { number: 15 }))
    .required();
const password = (t) =>
  Yup.string()
    .min(6, t("common:forms.errors.min", { number: 6 }))
    .max(15, t("common:forms.errors.max", { number: 15 }))
    .matches(/([a-z]+)/, t("common:forms.errors.password.lowerLetter"))
    .matches(/([A-Z]+)/, t("common:forms.errors.password.upperLetter"))
    //.matches(/(\W+)/, t("common:forms.errors.password.special"))
    .matches(/(\d+)/, t("common:forms.errors.password.digit"))
    .required(t("common:forms.errors.reqired"));
const email = (t) =>
  Yup.string()
    .email(t("common:forms.errors.email"))
    .required(t("common:forms.errors.reqired"));

export const registerFormValidationSchema = (t) =>
  Yup.object({
    login: login(t),
    password: password(t),
    email: email(t),
  });

export const loginFormValidationSchema = (t) =>
  Yup.object({
    login: login(t),
    password: password(t),
  });
