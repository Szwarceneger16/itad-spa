import {
    Stack,
    Box,
    Textarea,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    InputGroup,
    InputRightElement,
    Input,
    Button,
    Switch as ChakraSwitch,
    Checkbox ,
    color
} from "@chakra-ui/react";
import { Field } from 'formik';
import React, { useState } from 'react';
import * as DateFns from "date-fns";
import { AttachmentIcon } from "@chakra-ui/icons";
import { 
    DatePicker ,
    KeyboardDatePicker,
    KeyboardTimePicker,
    TimePicker ,
    DateTimePicker
  } from "@material-ui/pickers";

export function InputFile ( {fieldName, labelStyle,labels,multiple,innerRef,placeholder,accept}) {
    let ref;
    //const reffToInput = innerRef || ref;
    const setRef = element => { ref = element; };
    
    return (
        <Field /* innerRef={ref} */ name={fieldName} >
        {( { field,form } ) => {
            
            // field.onChange= (event) => {
            //     form.setFieldValue(fieldName, event.currentTarget.files);
            //   };
            return (
            <FormControl pd={4} isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel htmlFor={fieldName} {...labelStyle}>
                    {/* {label ? label : fieldName} */ labels.inputTitle}
                </FormLabel>
                <Input type='file' ref={setRef}
                    accept={accept} id={fieldName} placeholder={placeholder} 
                    d="none" 
                    onBlur={field.onBlur}
                    multiple={multiple}
                    onChange={(e) => { 
                        //form.setFieldTouched("file",true,false);
                        form.setFieldValue("file", e.currentTarget.files);
                    }}
                    
                />
                <Button rightIcon={<AttachmentIcon />} colorScheme="blue" variant="outline"
                onClick={ (e) => { ref.click(); e.preventDefault(); }}
                >
                    {labels.buttonTitle}
                </Button>
                <FormErrorMessage d='block'>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
        )}}
        </Field>
    );
}

export function InputText ( {fieldName, labelStyle,labels,innerRef,placeholder}) {
    
    return (
        <Field innerRef={innerRef} name={fieldName} >
        {( { field,form } ) => {

            return (
            <FormControl pd={4} isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel htmlFor={fieldName} {...labelStyle}>
                    {/* {label ? label : fieldName} */ labels.inputTitle}
                </FormLabel>
                <Input {...field} type='text' id={fieldName} placeholder={placeholder} />
                
                <FormErrorMessage d='block'>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
        )}}
        </Field>
    );
}

export function InputDate ( {fieldName, labelStyle,labels,innerRef,startDate,endDate,defaultDate}) {
    // const [selectedDate, handleDateChange] = useState(new Date());
    
    return (
        <Field innerRef={innerRef} name={fieldName} >
        {( { field,form,...rest } ) => {
            return (
                
                <FormControl pd={4} isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel htmlFor={fieldName} {...labelStyle}>
                    { labels.inputTitle}
                </FormLabel>
                {/* <Input {...field} type='date' 
                id={fieldName} 
                value={defaultDate.toISOString().split("T")[0]}
                min={startDate.toISOString().split("T")[0]} 
                max={startDate.toISOString().split("T")[0]}
                /> */}
                {/* <Box d="block" height="400px" width="100%" > */}
                <DatePicker
                    autoOk
                    // disableToolbar
                    
                    variant="static"
                    name={fieldName}
                    value={field.value}
                    onChange={date => form.setFieldValue(field.name, date, false)}
                    {...rest}
                />
                {/* </Box> */}
                
                <FormErrorMessage d='block'>{form.errors[fieldName]}</FormErrorMessage>
                
            </FormControl>
        )}}
        </Field>
    );
}

export function InputTime ( {fieldName, labelStyle,labels,innerRef,startDate,endDate,defaultDate}) {
    //const [selectedDate, handleDateChange] = useState(defaultDate || new Date());

    return (
        <Field innerRef={innerRef} name={fieldName} >
        {( { field,form,...rest } ) => {
            return (
            <FormControl pd={4} isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel htmlFor={fieldName} {...labelStyle}>
                    {/* {label ? label : fieldName} */ labels.inputTitle}
                </FormLabel>
                {/* <Input {...field} type='date' 
                id={fieldName} 
                value={defaultDate.toISOString().split("T")[0]}
                min={startDate.toISOString().split("T")[0]} 
                max={startDate.toISOString().split("T")[0]}
                /> */}
                <Box fontSize="1rem !important">
                <TimePicker
                    autoOk
                    // disableToolbar
                    step="5"
                    variant="inline"
                    name={fieldName}
                    value={field.value}
                    onChange={date => form.setFieldValue(field.name, date, false)}
                    {...rest}
                />
                <FormErrorMessage d='block'>{form.errors[fieldName]}</FormErrorMessage>
                </Box>
            </FormControl>
        )}}
        </Field>
    );
}

export function InputEmail ( {fieldName, labelStyle,labels,innerRef,placeholder}) {
    
    return (
        <Field innerRef={innerRef} name={fieldName} >
        {( { field,form } ) => {
            return (
            <FormControl pd={4} isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel htmlFor={fieldName} {...labelStyle}>
                    {/* {label ? label : fieldName} */ labels.inputTitle}
                </FormLabel>
                <Input {...field} type='email' id={fieldName} placeholder={placeholder} />
                <FormErrorMessage d='block'>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
        )}}
        </Field>
    );
}

export function InputTextArea ( {fieldName, labelStyle,labels,innerRef,placeholder}) {
    
    return (
        <Field innerRef={innerRef} name={fieldName} >
        {( { field,form } ) => {
            return (
            <FormControl pd={4} isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel htmlFor={fieldName} {...labelStyle}>
                    {/* {label ? label : fieldName} */ labels.inputTitle}
                </FormLabel>
                <Textarea 
                resize="vertical" {...field} 
                id={fieldName} placeholder={placeholder} />
                <FormErrorMessage d='block'>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
        )}}
        </Field>
    );
}

/* labels */
export function InputPassword ( {fieldName, labelStyle, labels,innerRef,placeholder}) {
    const [show, setShow] = useState(false);
    const handleMouseDown = (e) => {
        setShow(true);
    }
    const handleMouseUp = (e) => setShow(false);

    return (
        <Field innerRef={innerRef} name={fieldName} >
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
                            placeholder={placeholder}
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

export function InputSwitch ({fieldName,children}) {
    
    return (
        <Field name={fieldName} >
        {( { field,form } ) => (
        <FormControl d="flex" alignItems="center">
            <FormLabel htmlFor={fieldName} mb="0">
                {children}
            </FormLabel>
            <ChakraSwitch  id={fieldName} {...field} />
        </FormControl>
        )}
        </Field>
    )
}
