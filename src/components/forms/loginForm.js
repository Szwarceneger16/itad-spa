import { Formik,Field, Form } from 'formik';
import React, { Suspense, useEffect, useState,useContext } from "react";
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
import {
    useHistory,
  } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { DividerWithText, ErrorMessage } from './elements.js';
import { sessionManager } from './../sessionManager.js';
import api from '../../api/apiEntity';

const labelStyle = {
    fontFamily:'sans-serif',
    color:'orange.600',
    fontSize:[14,16,18]
}

function LoginForm() {
    const { t, i18n } = useTranslation(['common','loginForm']);
    //debugger;
    const [ submitError, setSubmitError ] = useState();
    let history = useHistory();
    i18n.loadNamespaces('loginForm');

    const submitFrom = async (values, actions) => {    
        api.login(values.login,values.password,values.rememberMe)
        .then((res) => {       
            sessionManager.dispatch({
                type: 'setAuth', 
                payload: {userData: res}
            });
            history.push('/about'); 
        })
        .catch(err => {
            console.log(err);
            setSubmitError(t("common:forms.errors.submit400"));
            actions.setSubmitting(false);
        });  
    }

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
            <>
            {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
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
                        <DividerWithText></DividerWithText>
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
            </>
    );
}

export default LoginForm;