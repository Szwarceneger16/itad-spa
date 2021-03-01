import { useFormik } from 'formik';
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
  firstName: Yup.string()
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

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
        <Stack direction={["column", "row"]} spacing="24px">
            <Box w="240px" h="240px">
                <FormControl id="login">
                    <FormLabel>Login</FormLabel>
                    <Input
                    name="login"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.login}
                    isInvalid={!!formik.errors.login}
                    isValid={formik.touched.login && !formik.errors.login}
                    />
                    <FormErrorMessage>
                    {formik.errors.login}
                    </FormErrorMessage>
                </FormControl>

                <Button type="submit">Submit</Button > 
            </Box>
        </Stack>

          {/* <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="mb-2"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              isInvalid={!!formik.errors.password}
              isValid={formik.touched.password && !formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group> */}

    </form>
  );
}

export default LoginForm;