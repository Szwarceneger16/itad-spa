import { Formik,Field, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import {
    Stack,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    InputGroup,
    InputRightElement,
    Input,
    Button
  } from "@chakra-ui/react"

const validationSchema = Yup.object({
    login: Yup.string()
    .min(5, 'Must be 5 characters or more')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
    pass: Yup.string()
    .min(6, 'Must be 6 characters or more')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
//   lastName: Yup.string()
//     .max(20, 'Must be 20 characters or less')
//     .required('Required'),
  // email: Yup.string()
  //   .email('Invalid email address')
  //   .required('Required'),
});

function LoginForm() {

  return (
        <Stack direction={["column", "row"]} spacing="24px">
            <Box w="240px" h="240px">
                <Formik
                    initialValues={{
                        login: 'piotr',
                        pass: 'aa'
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                          alert(JSON.stringify(values, null, 2))
                          actions.setSubmitting(false)
                        }, 3000)
                      }}
                >
                    {( props ) => (
                        <Form>
                            <FormControlWrapperText fieldName='login' label='Login' />
                            <FormControlWrapperPassword fieldName='pass' label='Password'/>
                            <Button 
                                mt={4} 
                                isLoading={props.isSubmitting}
                                type="submit"
                            >Submit</Button > 
                        </Form>
                    )}
                </Formik>   
             </Box>
        </Stack>
  );
}


function FormControlWrapperText( {fieldName, label}) {
    return (
        <Field name={fieldName} >
        {( { field,form } ) => {
            //debugger;
            return (
            <FormControl pd={4} isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel fontFamily='sans-serif' htmlFor={fieldName}>
                    {label ? label : fieldName}
                </FormLabel>
                <Input {...field} type='text' id={fieldName} placeholder="name" />
                <FormErrorMessage d='block'>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
        )}}
        </Field>
    );
}

function FormControlWrapperPassword( {fieldName, label}) {
    const [show, setShow] = useState(false);
    const handleMouseDown = () => setShow(true);
    const handleMouseUp = () => setShow(false);

    return (
        <Field name={fieldName} >
        {( { field,form } ) => {
            //debugger;
            return (
            <FormControl pd={4} isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel fontFamily='sans-serif' htmlFor={fieldName}>
                    {label ? label : fieldName}
                </FormLabel>
                    <InputGroup size="md">
                        <Input {...field} type={show ? "text" : "password"} id={fieldName} placeholder="name" />
                        <InputRightElement width="4.5rem">
                            <Button 
                                h="1.75rem" 
                                size="sm" 
                                onMouseDown={handleMouseDown}
                                onMouseLeave={handleMouseUp}
                            >
                            {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    
                <FormErrorMessage d='block'>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
        )}}
        </Field>
    );
}

export default LoginForm;