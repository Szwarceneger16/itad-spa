import { Formik,Field, Form } from 'formik';
import React, { Suspense } from "react";
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as Yup from 'yup';
import { InputPasswordWrapper, InputTextWrapper, SwitchWrapper} from './InputElements.js';
import {
    Box,
    Button,
    Flex,
    Spacer,
    Switch ,
} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';
import { DividerWithText } from './elements.js';

const labelStyle = {
    fontFamily:'sans-serif',
    color:'orange.600',
    fontSize:[14,16,18]
}

// async function getMesseges (lang) {
//     const result = await new Promise(resolve => {
//         setTimeout(() => {
//             resolve('abcd');
//           }, 5000)
//     })
//     return result;
// }



const submitFrom = async (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      actions.setSubmitting(false)
    }, 3000)
    // const resp = await fetch('https://f176f6fd-47ff-411c-bb08-83fad0dfd0e8.mock.pstmn.io/loginGood',{
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //       },
    //       body: JSON.stringify(values),
    // }).then(response => response.text())
    // .catch(e => {
    //     console.log(e);
    // })
    // console.log('Success:', resp);
    // return true;
  }

function LoginForm() {
    const { t, i18n } = useTranslation(['common','loginForm']);
    i18n.loadNamespaces('loginForm');

    const validationSchema = Yup.object({
        login: Yup.string()
        .min(5,t('common:forms.errors.min',{number: 5}) )
        .max(15,t('common:forms.errors.max', {number: 15}) )
        .required(t('common:forms.errors.required')),
        password: Yup.string()
        .min(6,t('common:forms.errors.min',{number: 6}))
        .max(15,t('common:forms.errors.max', {number: 15}))
        .matches(/([a-z]+)/,t('common:forms.errors.password.lowerLetter') )
        .matches(/([A-Z]+)/,t('common:forms.errors.password.upperLetter') )
        .matches(/(\W+)/,t('common:forms.errors.password.special') )
        .matches(/(\d+)/,t('common:forms.errors.password.digit'))
        .required(t('common:forms.errors.required')),
    });

    return (
        
            <Formik
                initialValues={{
                    login: 'piotr',
                    password: 'aa',
                    rememberMe: false
                }}
                initialErrors={true}
                validationSchema={validationSchema}
                onSubmit={submitFrom}
            >      
                {( props ) => (    
                    <Form>              
                        <InputTextWrapper 
                            labelStyle={labelStyle}
                            fieldName='login' 
                            labels={{inputTitle: t('loginForm:input.login.title')}}
                        />
                        <InputPasswordWrapper 
                            labelStyle={labelStyle}
                            fieldName='password' 
                            labels={{
                                inputTitle: t('loginForm:input.password.title'),
                                buttonHide: t('common:buttons.passwordVisibilityToggle.hide'),
                                buttonShow: t('common:buttons.passwordVisibilityToggle.show'),
                            }}
                        />
                        <Flex align='center' mt={4}>
                        <Box>
                            <SwitchWrapper fieldName='rememberMe'>Remember Me</SwitchWrapper>
                        </Box>
                        <Spacer />
                        <Box>
                            <Button 
                                isLoading={props.isSubmitting}
                                type="submit"
                            >{t('common:buttons.submit.title')}</Button > 
                        </Box>
                        </Flex>
                    </Form>      
                )}
                    
            </Formik>
    );
}

export default LoginForm;