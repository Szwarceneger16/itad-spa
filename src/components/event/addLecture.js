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
import { InputDate, InputText,InputTextArea,InputTime } from '../forms/InputElements';
import { ErrorMessage } from '../forms/elements';

  
const labelStyle = {
    fontFamily:'sans-serif',
    color:'orange.600',
    fontSize:[14,16,18]
}

  function AddLecture ({ firstFieldRef, onCancel }) {
    const { t, i18n } = useTranslation(['common','addLecture']);
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

    return (
      <Stack spacing={4}>

        {/* {submitError && <ErrorMessage>{submitError}</ErrorMessage>} */}
            <Formik
                initialValues={{
                    eventName: '',
                    description: "",
                    startTime: new Date(),
                    endTime: new Date(Date.now() + 3600000),
                }}
                onSubmit={submitFrom}
            >      
                {( props ) => (    
                      <Form>          
                        <InputText 
                            labelStyle={labelStyle}
                            //innerRef={firstFieldRef}
                            fieldName='eventName' 
                            labels={{inputTitle: t('addLecture:input.name.title')}}
                        />
                        <InputTextArea 
                            labelStyle={labelStyle}
                            fieldName='description' 
                            labels={{inputTitle: t('addLecture:input.description.title')}}
                        />
                        <InputTime 
                            labelStyle={labelStyle}
                            fieldName='startTime' 
                            labels={{inputTitle: t('addLecture:input.startTime.title')}}
                        />
                        <InputTime 
                            labelStyle={labelStyle}
                            fieldName='endTime' 
                            labels={{inputTitle: t('addLecture:input.endTime.title')}}
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
                    </Form>     
                )}
            </Formik>
      </Stack>

    )
  }
  export default AddLecture;