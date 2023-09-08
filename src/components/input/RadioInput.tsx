import { FieldProps, Field } from "solid-form-handler";
import { Component, For } from "solid-js";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  FormHelperText,
  RadioGroup,
} from "@suid/material";
import { ChangeEvent } from "@suid/types";

type SelectableOption = { value: string | number; label: string };

export type RadiosProps = FieldProps & {
  label?: string;
  options?: Array<SelectableOption>;
  value?: string | number;
  triggers?: string[];
};

export const RadioInput: Component<RadiosProps> = (props) => {
  return (
    <Field
      {...props}
      mode="radio-group"
      render={(field) => (
        <>
          <FormControl error={field.helpers.error}>
            <FormLabel id={props.label}>{props.label}</FormLabel>
            <RadioGroup aria-labelledby={props.label} name={props.name}>
              <For each={props.options}>
                {(option) => (
                  <FormControlLabel
                    onChange={
                      field.props.onChange as (
                        event: ChangeEvent<HTMLElement>,
                        checked: boolean
                      ) => void
                    }
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    checked={field.helpers.isChecked(option.value)}
                  />
                )}
              </For>
            </RadioGroup>
            <FormHelperText>{field.helpers.errorMessage}</FormHelperText>
          </FormControl>
        </>
      )}
    />
  );
};
