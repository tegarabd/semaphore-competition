import { FieldProps, Field } from "solid-form-handler";
import { Component, JSX, Show, splitProps } from "solid-js";

export type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  FieldProps & { label?: string };

export const TextInput: Component<TextInputProps> = (props) => {
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
        <div classList={local.classList}>
          <input
            {...rest}
            {...field.props}
            classList={{
              "border-red-300": field.helpers.error,
              "form-control": true,
            }}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <Show when={local.label}>
            <label
              for={field.props.id}
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {local.label}
            </label>
          </Show>
          <Show when={field.helpers.error}>
            <div class="mt-2 text-xs text-red-600 dark:text-red-500">
              {field.helpers.errorMessage}
            </div>
          </Show>
        </div>
      )}
    />
  );
};
