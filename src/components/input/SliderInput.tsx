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
  Typography,
} from "@suid/material";
import "./SliderInput.css";

export type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  FieldProps & {
    label?: string;
    max: number;
    min: number;
    fullWidth?: boolean;
    showValue?: boolean;
    valueUnit?: string;
  };

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
            <FormControl
              sx={{ width: rest.fullWidth ? "100%" : undefined }}
              component={Stack}
              error={field.helpers.error}
            >
              <InputLabel
                for={field.props.id}
                sx={{ transform: "translateY(-1.5rem)" }}
              >
                {local.label}
              </InputLabel>
              <Box
                component="div"
                sx={{
                  display: rest.showValue ? "grid" : "flex",
                  gridTemplateColumns: "auto 4rem",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Box
                  component="div"
                  sx={{
                    position: "relative",
                  }}
                >
                  <input
                    type="range"
                    {...rest}
                    {...field.props}
                    style={{ width: rest.fullWidth ? "100%" : undefined }}
                  />
                  <div
                    class="indicator"
                    style={{
                      width: `${
                        ((field.props.value - rest.min) /
                          (rest.max - rest.min)) *
                        100
                      }%`,
                    }}
                  ></div>
                </Box>
                <Show when={rest.showValue}>
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.5}
                    direction="row"
                  >
                    <Typography component="span" variant="body2">
                      {field.props.value}
                    </Typography>
                    <Typography component="span" variant="body2">
                      {rest.valueUnit}
                    </Typography>
                  </Stack>
                </Show>
              </Box>
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
