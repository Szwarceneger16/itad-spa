import {
    Button,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Formik,Field, Form } from 'formik';
import { InputDate, InputText, InputPassword, InputEmail} from '../forms/InputElements';
import { CloseIconButton, DeleteIconButton, SubmitButton } from "../forms/buttons";
import { useTranslation } from 'react-i18next';
import { editUserFormValidationSchema } from "src/components/yupSchemas";
import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { GetUserId } from "src/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import  userService from "../../services/user.service";
import { setMessage } from "src/actions/message";

const labelStyle = {
    fontFamily:'sans-serif',
    color:'orange.600',
    fontSize:[14,16,18]
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
export default function EditUser(firstFieldRef, dispatchClose) {
const { t, i18n } = useTranslation(['common','auth']);
const [toggle, setToggle] = React.useState(true);
const userId = GetUserId();

const userData = {
  userID: { userId },
  firstName: "Jan",
  surname: "Kowalski",
  password: "",
  email: "jan@gmail.com"
};

const dispatch = useDispatch();
const history = useHistory();

    const submitFrom = async (values, actions) => {    
        userService.modifyUser(values.email, values.firstName,values.password, values.surname)
        .then((response) => {
          dispatch(
            setMessage(t("auth:userDashboard.modify.succesmessage"), "succes")
          );
          //dispatchClose();
        })
        .catch((error) => {
          dispatch(setMessage(t("auth:userDashboard.modify.errorMessage"), "error"));
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
  };
    function toggleInput() {
      setToggle(false);
    }
    return (
      <div>
      <Formik
            initialValues={{ 
              userID: userData.userID,
              firstName: userData.firstName,
              surname: userData.surname,
              password: userData.password,
              email: userData.email
            }}
            validationSchema={editUserFormValidationSchema(t)}
            onSubmit={submitFrom}
            >  
            {(props) =>(
              <Form>
                <InputText 
                  labelStyle={labelStyle}
                  innerRef={firstFieldRef}
                  fieldName='firstName' 
                  labels={{inputTitle: t('auth:edit.drawer.firstName')}}   
                />
                 <InputText 
                  labelStyle={labelStyle}
                  innerRef={firstFieldRef}
                  fieldName='surname' 
                  labels={{inputTitle: t('auth:edit.drawer.surname')}}   
                />
                 <InputPassword
                  labelStyle={labelStyle}
                  fieldName="password"
                  labels={{
                    inputTitle: t("auth:input.password.title"),
                    buttonHide: t("common:buttons.passwordVisibilityToggle.hide"),
                    buttonShow: t("common:buttons.passwordVisibilityToggle.show"),}}   
                />
                <InputEmail
                    labelStyle={labelStyle}
                    fieldName="email"
                    labels={{ inputTitle: t('auth:edit.drawer.email')}}
                  />
                  <SubmitButton isSubmitting={props.isSubmitting} />                 
              </Form>
            )}
        </Formik>  
        
      </div>  
    )
  }
  //<pre>{JSON.stringify(props.values, null, 2)}</pre>