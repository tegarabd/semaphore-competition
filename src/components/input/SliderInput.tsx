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
import "./SliderInput.css";

export type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  FieldProps & { label?: string; max: number };

export const SliderInput: Component<TextInputProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "classList",
    "label",
    "formHandler",
  ]);

  return (
    <>
      <Field
        {...props}
        mode="input"
        render={(field) => (
          <Box
            sx={{
              transform: "translateY(1.5rem)",
              height: field.helpers.error ? "6rem" : "4rem",
            }}
          >
            <FormControl component={Stack} error={field.helpers.error}>
              <InputLabel
                for={field.props.id}
                sx={{ transform: "translateY(-1.5rem)" }}
              >
                {local.label}
              </InputLabel>
              <div class="input-root">
                <input type="range" {...rest} {...field.props} />
                <div
                  class="indicator"
                  style={{ width: `${(field.props.value / props.max) * 100}%` }}
                ></div>
              </div>
              <FormHelperText sx={{ mt: -0.5 }}>
                {field.helpers.errorMessage}
              </FormHelperText>
            </FormControl>
          </Box>
        )}
      />
    </>
  );
};
