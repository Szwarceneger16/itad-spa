import {
    Button,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Formik,Field, Form } from 'formik';
import { InputDate, InputText, InputPassword, InputEmail} from '../forms/InputElements';
import { CloseIconButton, DeleteIconButton, SubmitButton } from "../forms/buttons";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { editUserFormValidationSchema } from "../auth/yupSchemas";
import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
export default function EditUser(firstFieldRef) {
const { t, i18n } = useTranslation(['common','userDashboard']);
const [toggle, setToggle] = React.useState(true);
const firstName = "Jan"
const surname = "Kowalski"
const password = "12#fA34"
const email = "jan@gmail.com"
    const submitFrom = async (values, actions) => {    
        alert("")
        actions.setSubmitting(false);

    }
    function toggleInput() {
      setToggle(false);
    }
    return (
      <div>
      <Formik
            initialValues={{ 
              firstName: firstName,
              surname: surname,
              password: password,
              email: email
            }}
            validationSchema={editUserFormValidationSchema(t)}
            onSubmit={submitFrom}
            >  
            {(props) =>(
              <Form>
                {toggle ? (
                  <p onDoubleClick={toggleInput}>
                    <TextField
                      id="firstName"
                      label="First name"
                      defaultValue = {firstName}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </p>
                ) : (
                  <InputText 
                  labelStyle={labelStyle}
                  innerRef={firstFieldRef}
                  fieldName='firstName' 
                  labels={{inputTitle: t('userDashboard:input.firstName')}}   
                />
                )}
                {toggle ? (
                  <p onDoubleClick={toggleInput}>
                    <TextField
                      id="surname"
                      label="Surname"
                      defaultValue = {surname}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </p>
                ) : (
                <InputText 
                  labelStyle={labelStyle}
                  innerRef={firstFieldRef}
                  fieldName='surname' 
                  labels={{inputTitle: t('userDashboard:input.surname')}}   
                />
                )}
                
                {toggle ? (
                  <p onDoubleClick={toggleInput}>
                  </p>
                ) : (
                 <InputPassword
                  labelStyle={labelStyle}
                  fieldName="password"
                  labels={{
                    inputTitle: t("auth:input.password.title"),
                    buttonHide: t("common:buttons.passwordVisibilityToggle.hide"),
                    buttonShow: t("common:buttons.passwordVisibilityToggle.show"),
                  }}
                /> 
                )}
                
                {toggle ? (
                  <p onDoubleClick={toggleInput}>
                    <TextField
                      id="email"
                      label="E-mail"
                      defaultValue = {email}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </p>
                ) : (
                  <InputEmail
                    labelStyle={labelStyle}
                    fieldName="email"
                    labels={{ inputTitle: t('userDashboard:input.email')}}
                  />
                )}      
                {toggle ? (
                  <p onDoubleClick={toggleInput}>
                  </p>
                ) : (
                  <SubmitButton isSubmitting={props.isSubmitting} />
                )}           
              </Form>
            )}
        </Formik>  
      </div>  
    )
  }
  //<pre>{JSON.stringify(props.values, null, 2)}</pre>