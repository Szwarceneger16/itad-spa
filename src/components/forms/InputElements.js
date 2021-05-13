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
  Checkbox,
  Select,
  color,
} from "@chakra-ui/react";
import { Field } from "formik";
import React, { useState } from "react";
import * as DateFns from "date-fns";
import { AttachmentIcon } from "@chakra-ui/icons";
import {
  DatePicker,
  KeyboardDatePicker,
  KeyboardTimePicker,
  TimePicker,
  DateTimePicker,
} from "@material-ui/pickers";

export function InputFile({
  fieldName,
  labelStyle,
  labels,
  multiple,
  accept,
  innerRef = undefined,
  placeholder = undefined,
}) {
  let ref;
  //const reffToInput = innerRef || ref;
  const setRef = (element) => {
    ref = element;
  };

  return (
    <Field /* innerRef={ref} */ name={fieldName}>
      {({ field, form }) => {
        // field.onChange= (event) => {
        //     form.setFieldValue(fieldName, event.currentTarget.files);
        //   };
        return (
          <FormControl
            pd={4}
            isInvalid={form.errors[fieldName] && form.touched[fieldName]}
          >
            <FormLabel htmlFor={fieldName} {...labelStyle}>
              {/* {label ? label : fieldName} */ labels.inputTitle}
            </FormLabel>
            <Input
              type="file"
              ref={setRef}
              accept={accept}
              id={fieldName}
              placeholder={placeholder}
              d="none"
              width="100%"
              onBlur={field.onBlur}
              multiple={multiple}
              onChange={(e) => {
                //form.setFieldTouched("file",true,false);
                form.setFieldValue("file", e.currentTarget.files);
              }}
            />
            <Button
              rightIcon={<AttachmentIcon />}
              colorScheme="blue"
              variant="outline"
              onClick={(e) => {
                ref.click();
                e.preventDefault();
              }}
            >
              {labels.buttonTitle}
            </Button>
            <FormErrorMessage d="block">
              {form.errors[fieldName]}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

export function InputText({
  fieldName,
  labelStyle,
  labels,
  innerRef = undefined,
  placeholder = undefined,
}) {
  return (
    <Field innerRef={innerRef} name={fieldName}>
      {({ field, form }) => {
        return (
          <FormControl
            pd={4}
            isInvalid={form.errors[fieldName] && form.touched[fieldName]}
          >
            <FormLabel htmlFor={fieldName} {...labelStyle}>
              {/* {label ? label : fieldName} */ labels.inputTitle}
            </FormLabel>
            <Input
              {...field}
              type="text"
              width="100%"
              id={fieldName}
              placeholder={placeholder}
            />

            <FormErrorMessage d="block">
              {form.errors[fieldName]}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

export function InputSelect({
  fieldName,
  labelStyle,
  labels,
  values,
  valueIsNumber,
  isDisabled,
  innerRef = undefined,
  placeholder = undefined,
}) {
  const multiple = undefined;
  values =
    values ??
    [
      /* {value: "",label:""} */
    ];
  return (
    <Field innerRef={innerRef} name={fieldName}>
      {({ field, form }) => {
        //let { value, ...field } = field;
        return (
          <FormControl
            pd={4}
            isInvalid={form.errors[fieldName] && form.touched[fieldName]}
          >
            <FormLabel htmlFor={fieldName} {...labelStyle}>
              {/* {label ? label : fieldName} */ labels.inputTitle}
            </FormLabel>
            <Select
              name={fieldName}
              onBlur={field.onBlur}
              variant="filled"
              multiple={multiple}
              isDisabled={isDisabled}
              placeholder={placeholder}
              onChange={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (multiple) {
                  const selected = Array.from(
                    event.currentTarget.selectedOptions
                  ).map((option) =>
                    valueIsNumber ? Number(option.value) : option.value
                  );
                  form.setFieldValue(field.name, selected, false);
                } else {
                  form.setFieldValue(
                    field.name,
                    valueIsNumber
                      ? Number(event.currentTarget.value)
                      : event.currentTarget.value,
                    false
                  );
                }
              }}
            >
              {values.map((el, index) => (
                <option
                  key={el.value ?? "null" + index}
                  disabled={!el.value}
                  value={el.value}
                >
                  {el.label}
                </option>
              ))}
            </Select>

            <FormErrorMessage d="block">
              {form.errors[fieldName]}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

export function InputNumber({
  fieldName,
  labelStyle,
  labels,
  innerRef = undefined,
  placeholder = undefined,
}) {
  return (
    <Field innerRef={innerRef} name={fieldName}>
      {({ field, form }) => {
        return (
          <FormControl
            pd={4}
            isInvalid={form.errors[fieldName] && form.touched[fieldName]}
          >
            <FormLabel htmlFor={fieldName} {...labelStyle}>
              {/* {label ? label : fieldName} */ labels.inputTitle}
            </FormLabel>
            <Input
              {...field}
              type="number"
              width="100%"
              id={fieldName}
              placeholder={placeholder}
            />

            <FormErrorMessage d="block">
              {form.errors[fieldName]}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

export function InputDate({
  fieldName,
  labelStyle,
  labels,
  innerRef = undefined,
  ...forCalendar
}) {
  // const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Field innerRef={innerRef} name={fieldName}>
      {({ field, form, ...rest }) => {
        return (
          <FormControl
            pd={4}
            isInvalid={form.errors[fieldName] && form.touched[fieldName]}
          >
            <FormLabel htmlFor={fieldName} {...labelStyle}>
              {labels.inputTitle}
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
              {...forCalendar}
              // disableToolbar
              //variant="static"
              name={fieldName}
              value={field.value}
              onChange={(date) => form.setFieldValue(field.name, date, false)}
              {...rest}
            />
            {/* </Box> */}

            <FormErrorMessage d="block">
              {form.errors[fieldName]}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

export function InputTime({
  fieldName,
  labelStyle,
  labels,
  innerRef = undefined,
  startDate,
  endDate,
  defaultDate,
}) {
  //const [selectedDate, handleDateChange] = useState(defaultDate || new Date());

  return (
    <Field innerRef={innerRef} name={fieldName}>
      {({ field, form, ...rest }) => {
        return (
          <FormControl
            pd={4}
            isInvalid={form.errors[fieldName] && form.touched[fieldName]}
          >
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
                //step="5"
                //variant="inline"
                minutesStep={5}
                name={fieldName}
                value={field.value}
                onChange={(date) => form.setFieldValue(field.name, date, false)}
                {...rest}
              />
              <FormErrorMessage d="block">
                {form.errors[fieldName]}
              </FormErrorMessage>
            </Box>
          </FormControl>
        );
      }}
    </Field>
  );
}

export function InputEmail({
  fieldName,
  labelStyle,
  labels,
  innerRef = undefined,
  placeholder = undefined,
}) {
  return (
    <Field innerRef={innerRef} name={fieldName}>
      {({ field, form }) => {
        return (
          <FormControl
            pd={4}
            isInvalid={form.errors[fieldName] && form.touched[fieldName]}
          >
            <FormLabel htmlFor={fieldName} {...labelStyle}>
              {/* {label ? label : fieldName} */ labels.inputTitle}
            </FormLabel>
            <Input
              {...field}
              width="100%"
              type="email"
              id={fieldName}
              placeholder={placeholder}
            />
            <FormErrorMessage d="block">
              {form.errors[fieldName]}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

export function InputTextArea({
  fieldName,
  labelStyle,
  labels,
  innerRef = undefined,
  placeholder = undefined,
}) {
  return (
    <Field
      //innerRef={innerRef}
      name={fieldName}
    >
      {({ field, form }) => {
        return (
          <FormControl
            pd={4}
            isInvalid={form.errors[fieldName] && form.touched[fieldName]}
          >
            <FormLabel htmlFor={fieldName} {...labelStyle}>
              {/* {label ? label : fieldName} */ labels.inputTitle}
            </FormLabel>
            <Textarea
              resize="vertical"
              {...field}
              width="100%"
              id={fieldName}
              placeholder={placeholder}
            />
            <FormErrorMessage d="block">
              {form.errors[fieldName]}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

/* labels */
export function InputPassword({
  fieldName,
  labelStyle,
  labels,
  innerRef = undefined,
  placeholder = undefined,
}) {
  const [show, setShow] = useState(false);
  const handleMouseDown = (e) => {
    setShow(true);
  };
  const handleMouseUp = (e) => setShow(false);

  return (
    <Field innerRef={innerRef} name={fieldName}>
      {({ field, form }) => {
        //debugger;
        return (
          <FormControl
            pd={4}
            isInvalid={form.errors[fieldName] && form.touched[fieldName]}
          >
            <FormLabel htmlFor={fieldName} {...labelStyle}>
              {/* {label ? label : fieldName} */ labels.inputTitle}
            </FormLabel>
            <InputGroup size="md" width="100%">
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

            <FormErrorMessage d="inline">
              {form.errors[fieldName]}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

export function InputSwitch({ fieldName, children }) {
  return (
    <Field name={fieldName}>
      {({ field, form }) => (
        <FormControl d="flex" alignItems="center">
          <FormLabel htmlFor={fieldName} mb="0">
            {children}
          </FormLabel>
          <ChakraSwitch
            id={fieldName}
            isChecked={field.value}
            value={field.value}
            {...field}
          />
        </FormControl>
      )}
    </Field>
  );
}
