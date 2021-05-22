import * as Yup from "yup";

const login = (t) =>
  Yup.string()
    .min(4, t("common:forms.errors.min", { number: 5 }))
    .max(15, t("common:forms.errors.max", { number: 15 }))
    .required(t("common:forms.errors.required"));
const password = (t) =>
  Yup.string()
    .min(4, t("common:forms.errors.min", { number: 6 }))
    .max(15, t("common:forms.errors.max", { number: 15 }))
    // .matches(/([a-z]+)/, t("common:forms.errors.password.lowerLetter"))
    // .matches(/([A-Z]+)/, t("common:forms.errors.password.upperLetter"))
    //.matches(/(\W+)/, t("common:forms.errors.password.special"))
    // .matches(/(\d+)/, t("common:forms.errors.password.digit"))
    .required(t("common:forms.errors.required"));
const email = (t) =>
  Yup.string()
    .email(t("common:forms.errors.email"))
    .required(t("common:forms.errors.required"));

const eventId = Yup.number();
const eventName = (t) =>
  Yup.string()
    .min(4, t("events:event.errors.minName", { number: 4 }))
    .required(t("events:event.errors.required"));
const eventDescription = (t) =>
  Yup.string()
    .min(4, t("events:event.errors.minDescription", { number: 4 }))
    .required(t("events:event.errors.required"));
const eventStartDate = (t) =>
  Yup.date()
    .min(new Date(), t("events:event.errors.minStartDate"))
    .required(t("events:event.errors.required"));
const eventEndtDate = (t) =>
  Yup.date().required(t("events:event.errors.required"));
const availableTickets = (t) =>
  Yup.number().min(1).required(t("events:event.errors.required"));
const ticketPrice = (t) =>
  Yup.number().min(1).required(t("events:event.errors.required"));
const name = (t) =>
  Yup.string()
    .required(t("events:event.errors.required"));
const description = (t) =>
  Yup.string()
    .required(t("events:event.errors.required"));
const startDate = (t) =>
  Yup.date()
    .min(new Date(), t("events:event.errors.minStartDate"))
    .required(t("events:event.errors.required"));
const availableSeats = (t) =>
   Yup.number()
    .required(t("events:event.errors.required"));
const question = (t) =>
   Yup.string()
    .required(t("events:event.errors.required"));
const surname = (t) =>
  Yup.string()
    .required(t("events:event.errors.required"));
const firstName = (t) =>
  Yup.string()
    .required(t("common:forms.errors.required"));

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

export const eventModifyValidaitonSchema = (t) =>
  Yup.object({
    name: name(t),
    description: description(t),
    eventStartDate: eventStartDate(t),
    eventEndtDate: eventEndtDate(t),
    availableTickets: availableTickets(t),
    ticketPrice: ticketPrice(t),
  });

export const addLectureValidaitonSchema = (t) =>
  Yup.object({
    name: name(t),
    description: description(t),
    startDate: startDate(t),
    availableSeats: availableSeats(t),
  });

export const addPartnerValidaitonSchema = (t) =>
  Yup.object({
    name: name(t),
    description: description(t),
  });

export const addQuestionValidaitonSchema = (t) =>
  Yup.object({
    question: question(t),
  });

export const addSpeakerValidaitonSchema = (t) =>
  Yup.object({
    name: name(t),
    surname: surname(t),
    description: description(t),
  });

  
export const editUserFormValidationSchema = (t) =>
  Yup.object({
    firstName: firstName(t),
    surname: surname(t),
    password: password(t),
    email: email(t),
  });