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
import { CloseIconButton, DeleteIconButton } from "../forms/buttons";
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
        
        console.log(values);
        console.log( values.file[0].name)
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
        firstName: (initialValues && initialValues.firstName) || '',
        secondName:(initialValues &&  initialValues.secondName) || "",
        description:(initialValues &&  initialValues.description) || "",
        //file:(initialValues &&  initialValues.file) || '',
    }

    return (
      <Stack spacing={4}>

        {/* {submitError && <ErrorMessage>{submitError}</ErrorMessage>} */}
            <Formik
                enableReinitialize
                initialValues={_initialValues}
                //initialErrors={true}
                onSubmit={submitFrom}
                initialTouched

            >      
                {( props ) => (    
                      <Form>   
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
                                {initialValues && initialValues.id && 
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
  export default AddLecture;