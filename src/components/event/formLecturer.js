import { Formik,Field, Form } from 'formik';
import React, { Suspense, useEffect, useState,useContext } from "react";
import * as Yup from 'yup';
import {
    Box,
    Button,ButtonGroup,
    Flex,Stack,
    Spacer,
    DividerWithText,

} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';
import { InputFile, InputText,InputTextArea } from '../forms/InputElements';
import { ErrorMessage } from '../forms/elements';

  
const labelStyle = {
    fontFamily:'sans-serif',
    color:'orange.600',
    fontSize:[14,16,18]
}

  function AddLecture ({ firstFieldRef, onCancel,initialValues }) {
    const { t, i18n } = useTranslation(['common','addLecturer']);
    const [ submitError, setSubmitError ] = useState();

    const submitFrom = async (values, actions) => {    
        alert("")
        actions.setSubmitting(false);
    
    }
    
    // const validationSchema = Yup.object({
    //     login: Yup.string()
    //     .min(5,t('common:forms.errors.min',{number: 5}) )
    //     .max(15,t('common:forms.errors.max', {number: 15}) )
    //     .required(t('common:forms.errors.required')),
        
    // });

    let _initialValues = {
        id: (initialValues && initialValues.id) || '',
        firstName: (initialValues && initialValues.firstName) || '',
        secondName:(initialValues &&  initialValues.secondName) || "",
        description:(initialValues &&  initialValues.description) || "",
        file:(initialValues &&  initialValues.file) || undefined,
    }

    return (
      <Stack spacing={4}>

        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
            <Formik
                enableReinitialize
                initialValues={_initialValues}
                //initialErrors={true}
                onSubmit={submitFrom}
            >      
                {( props ) => (    
                      <>          
                        <InputText 
                            labelStyle={labelStyle}
                            innerRef={firstFieldRef}
                            fieldName='firstName' 
                            labels={{inputTitle: t('addLecturer:input.firstName.title')}}
                        />
                        <InputText 
                            labelStyle={labelStyle}
                            innerRef={firstFieldRef}
                            fieldName='secondName' 
                            labels={{inputTitle: t('addLecturer:input.secondName.title')}}
                        />
                        <InputTextArea 
                            labelStyle={labelStyle}
                            fieldName='description' 
                            labels={{inputTitle: t('addLecturer:input.description.title')}}
                        />
                        <InputFile 
                            labelStyle={labelStyle}
                            innerRef={firstFieldRef}
                            fieldName='file'
                            accept="image/png, image/jpeg"
                            labels={{inputTitle: t('addLecturer:input.file.title'),
                            buttonTitle: t('addLecturer:input.file.Button'),
                        }}
                        />

                        <Flex align='center' mt={4}>
                        <Box>
                            <ButtonGroup>
                                <Button 
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                >
                                    {t('common:buttons.submit.title')}
                                </Button > 
                                    <Button variant="outline" onClick={onCancel}>
                                    {t('common:buttons.cancel.title')}
                                </Button>
                            </ButtonGroup> 
                        </Box>
                        </Flex>
                    </>     
                )}
            </Formik>
      </Stack>

    )
  }
  export default AddLecture;