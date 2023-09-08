import { FieldProps, Field } from "solid-form-handler";
import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  splitProps,
} from "solid-js";
import {
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
} from "@suid/material";
import { SelectChangeEvent } from "@suid/material/Select";

type SelectableOption = { value: string | number; label: string };

export type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> &
  FieldProps & {
    label?: string;
    options?: Array<SelectableOption>;
    placeholder?: string;
  };

export const SelectInput: Component<SelectProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "placeholder",
    "options",
    "label",
    "classList",
    "class",
    "formHandler",
  ]);
  const [options, setOptions] = createSignal<SelectableOption[]>([]);

  /**
   * Computes the select options by using the placeholder and options props.
   */
  createEffect(() => {
    setOptions(() => [
      ...(local.placeholder ? [{ value: "", label: local.placeholder }] : []),
      ...(local.options || []),
    ]);
  });

  return (
    <Field
      {...props}
      mode="input"
      render={(field) => (
        <FormControl error={field.helpers.error} sx={{ minWidth: "8rem" }}>
          <InputLabel for={field.props.id}>{local.label}</InputLabel>
          <Select
            sx={{ pr: 1.5 }}
            label={local.label}
            onChange={
              field.props.onInput as (
                event: SelectChangeEvent<any>,
                child: JSX.Element
              ) => void
            }
            inputComponent="select"
          >
            <For each={options()}>
              {(option) => (
                <option
                  value={option.value}
                  selected={option.value == field.props.value}
                >
                  {option.label}
                </option>
              )}
            </For>
          </Select>
          <FormHelperText>{field.helpers.errorMessage}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
