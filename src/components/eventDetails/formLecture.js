import { Formik,Field, Form } from 'formik';
import React, { Suspense, useEffect, useState,useContext } from "react";
import * as Yup from 'yup';
import {
    Box,
    Button,ButtonGroup,
    Flex,Stack,
    Spacer,
    DividerWithText,
    IconButton
} from "@chakra-ui/react";

import { useTranslation } from 'react-i18next';
import { InputDate, InputText,InputTextArea,InputTime } from '../forms/InputElements';
import { ErrorMessage } from '../forms/elements';
import { CloseIconButton, DeleteIconButton, SubmitButton } from "../forms/buttons";
  
const labelStyle = {
    fontFamily:'sans-serif',
    color:'orange.600',
    fontSize:[14,16,18]
}

  function FormLecture ({ firstFieldRef, onCancel,initialValues }) {
    const { t, i18n } = useTranslation(['common','formLecture']);
    const [ submitError, setSubmitError ] = useState();

    const submitFrom = async (values, actions) => {    
        alert("")
        actions.setSubmitting(false);
    
    }

    const deleteForm = () => {

    }
    
    // const validationSchema = Yup.object({
    //     login: Yup.string()
    //     .min(5,t('common:forms.errors.min',{number: 5}) )
    //     .max(15,t('common:forms.errors.max', {number: 15}) )
    //     .required(t('common:forms.errors.required')),
        
    // });
    
    let _initialValues = {
        id: (initialValues && initialValues.id) || '',
        lectureName: (initialValues && initialValues.lectureName) || '',
        description:(initialValues &&  initialValues.description) || "",
        startTime:(initialValues &&  initialValues.startTime) || new Date(),
        endTime:(initialValues &&  initialValues.endTime) || new Date(Date.now() + 3600000),
    }

    console.log(initialValues);

    return (
      <Stack spacing={4}>

        {/* {submitError && <ErrorMessage>{submitError}</ErrorMessage>} */}
            <Formik
                enableReinitialize
                initialValues={_initialValues}
                onSubmit={submitFrom}
            >      
                {( props ) => (    
                      <Form>          
                        <InputText 
                            labelStyle={labelStyle}
                            innerRef={firstFieldRef}
                            fieldName='lectureName' 
                            labels={{inputTitle: t('formLecture:input.name.title')}}
                        />
                        <InputTextArea 
                            labelStyle={labelStyle}
                            fieldName='description' 
                            labels={{inputTitle: t('formLecture:input.description.title')}}
                        />
                        <InputTime 
                            labelStyle={labelStyle}
                            fieldName='startTime' 
                            labels={{inputTitle: t('formLecture:input.startTime.title')}}
                        />
                        <InputTime 
                            labelStyle={labelStyle}
                            fieldName='endTime' 
                            labels={{inputTitle: t('formLecture:input.endTime.title')}}
                        />

                        <Flex align='center' mt={4}>
                        <Box>
                            <ButtonGroup>
                                <SubmitButton isSubmitting={props.isSubmitting} />
                                {initialValues && !!initialValues.id && 
                                    <DeleteIconButton 
                                        onClick={() => {
                                            onCancel();
                                            deleteForm();
                                        }} />
                                }
                                <CloseIconButton onClick={onCancel} />
                            </ButtonGroup>

                        </Box>
                        </Flex>
                    </Form>     
                )}
            </Formik>
      </Stack>

    )
  }
  export default FormLecture;