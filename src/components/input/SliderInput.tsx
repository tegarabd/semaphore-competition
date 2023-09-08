import { FieldProps, Field } from "solid-form-handler";
import { Component, JSX, Show, splitProps } from "solid-js";
import {
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  Stack,
  Box,
} from "@suid/material";

export type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  FieldProps & { label?: string };

export const SliderInput: Component<TextInputProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "classList",
    "label",
    "formHandler",
  ]);

  return (
    <Field
      {...props}
      mode="input"
      render={(field) => (
        <Box
          sx={{
            transform: "translateY(1.5rem)",
            height: field.helpers.error ? "4rem" : "3rem",
          }}
        >
          <FormControl component={Stack} error={field.helpers.error}>
            <InputLabel
              for={field.props.id}
              sx={{ transform: "translateY(-1.5rem)" }}
            >
              {local.label}
            </InputLabel>
            <input
              type="range"
              style={{
                "-webkit-appearance": "none",
                appearance: "none",
                background: "transparent",
                cursor: "pointer",
                width: "15rem",
              }}
              {...rest}
              {...field.props}
            />
            <FormHelperText>{field.helpers.errorMessage}</FormHelperText>
          </FormControl>
        </Box>
      )}
    />
  );
};
