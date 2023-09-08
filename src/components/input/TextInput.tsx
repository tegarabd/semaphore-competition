import { FieldProps, Field } from "solid-form-handler";
import { Component, JSX, splitProps } from "solid-js";
import { TextField } from "@suid/material";
import { OutlinedInputProps } from "@suid/material/OutlinedInput";

export type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  FieldProps & { label?: string };

export const TextInput: Component<TextInputProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "classList",
    "label",
    "formHandler",
    "type",
  ]);

  return (
    <Field
      {...props}
      mode="input"
      render={(field) => (
        <TextField
          inputProps={{ ...rest, ...field.props }}
          label={local.label}
          onChange={field.props.onInput as OutlinedInputProps["onChange"]}
          variant="outlined"
          error={field.helpers.error}
          helperText={field.helpers.errorMessage}
        />
      )}
    />
  );
};
