import { Formik,Field, Form } from 'formik';
import * as Yup from 'yup';
import {
    Stack,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
  } from "@chakra-ui/react"

const validationSchema = Yup.object({
    login: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
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
                    }}
                    
                    onSubmit={(values, actions) => {
                        alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false)
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field name="login">
                                    <FormControl isInvalid={errors.login && touched.login}>
                                        <FormLabel htmlFor="login">Login</FormLabel>
                                        <Input id='login' />
                                        <FormErrorMessage>{errors.login}</FormErrorMessage>
                                    </FormControl>
                            </Field>

                            <Button type="submit">Submit</Button > 
                        </Form>
                    )}
                </Formik>
                
             </Box>
        </Stack>



  );
}

export default LoginForm;