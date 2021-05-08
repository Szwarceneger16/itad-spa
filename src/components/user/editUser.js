import {
    Button,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Formik,Field, Form } from 'formik';
import { InputDate, InputText, InputPassword, InputEmail} from '../forms/InputElements';
import { CloseIconButton, DeleteIconButton, SubmitButton } from "../forms/buttons";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const labelStyle = {
    fontFamily:'sans-serif',
    color:'orange.600',
    fontSize:[14,16,18]
}

// const validationSchema = Yup.object({
//   firtName: Yup.string().max(20).required(),
// })

export default function EditUser(firstFieldRef) {
const { t, i18n } = useTranslation(['common','userDashboard']);
const submitFrom = async (values, actions) => {    
        alert("")
        actions.setSubmitting(false);
    
    }

    return (
      <div>
      <Formik
                //validateOnChange={true}
                initialValues={{ 
                  firstName: "Jan",
                  surname: "Kowalski",
                  password: "12#fA34",
                  email: "jan@gmail.com"
                }}
                onSubmit={submitFrom}
                //validationSchema={validationSchema}
            >  
            {(props) =>(
              <Form>
                <InputText 
                  labelStyle={labelStyle}
                  innerRef={firstFieldRef}
                  fieldName='firstName' 
                  labels={{inputTitle: t('userDashboard:input.firstName')}}   
                />
                <InputText 
                  labelStyle={labelStyle}
                  innerRef={firstFieldRef}
                  fieldName='surname' 
                  labels={{inputTitle: t('userDashboard:input.surname')}}   
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
                  <InputEmail
                    labelStyle={labelStyle}
                    fieldName="email"
                    labels={{ inputTitle: t('userDashboard:input.email')}}
                  />
                <SubmitButton isSubmitting={props.isSubmitting} />
              </Form>
            )}
        </Formik>  
      </div>  
    )
  }
  //<pre>{JSON.stringify(props.values, null, 2)}</pre>