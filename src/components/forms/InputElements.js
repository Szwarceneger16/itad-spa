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
    Button,
    Switch,
    Checkbox ,
    color
} from "@chakra-ui/react";
import { Field } from 'formik';
import { useState } from 'react';

function InputTextWrapper( {fieldName, labelStyle,labels}) {

    return (
        <Field name={fieldName} >
        {( { field,form } ) => {
            return (
            <FormControl pd={4} isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel htmlFor={fieldName} {...labelStyle}>
                    {/* {label ? label : fieldName} */ labels.inputTitle}
                </FormLabel>
                <Input {...field} type='text' id={fieldName} placeholder="name" />
                <FormErrorMessage d='block'>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
        )}}
        </Field>
    );
}

/* labels */
function InputPasswordWrapper( {fieldName, labelStyle, labels}) {
    const [show, setShow] = useState(false);
    const handleMouseDown = (e) => {
        setShow(true);
    }
    const handleMouseUp = (e) => setShow(false);

    return (
        <Field name={fieldName} >
        {( { field,form } ) => {
            //debugger;
            return (
            <FormControl pd={4} isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel htmlFor={fieldName} {...labelStyle}>
                    {/* {label ? label : fieldName} */ labels.inputTitle}
                </FormLabel>
                    <InputGroup size="md">
                        <Input 
                            {...field} 
                            type={show ? "text" : "password"} 
                            id={fieldName} 
                            placeholder="name" 
                        />
                        <InputRightElement width="4.5rem">
                            <Button 
                                h="1.75rem" 
                                size="sm" 
                                onMouseDown={handleMouseDown}
                                onMouseLeave={handleMouseUp}
                                onMouseUp={handleMouseUp}
                            >
                            {show ? labels.buttonHide : labels.buttonShow}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    
                <FormErrorMessage d='inline'>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
        )}}
        </Field>
    );
}

function SwitchWrapper({fieldName,children}) {
    
    return (
        <Field name={fieldName} >
        {( { field,form } ) => (
        <FormControl d="flex" alignItems="center">
            <FormLabel htmlFor={fieldName} mb="0">
                {children}
            </FormLabel>
            <Switch  id={fieldName} {...field} />
        </FormControl>
        )}
        </Field>
    )
}

export { InputTextWrapper, InputPasswordWrapper, SwitchWrapper};