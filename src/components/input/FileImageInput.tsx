import { Field, FieldProps } from "solid-form-handler";
import { Component, JSX, Show, createSignal, splitProps } from "solid-js";

export type FileInputProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value"
> &
  FieldProps & { label?: string } & (
    | { multiple?: false; value?: File }
    | { multiple?: true; value?: File[] }
  );

export const FileImageInput: Component<FileInputProps> = (props) => {
  let fileInput: HTMLInputElement;
  let previewImg: HTMLImageElement;

  const [previewReady, setPreviewReady] = createSignal(false);

  const changePreview = () => {
    if (!fileInput.files || fileInput.files.length < 1) {
      setPreviewReady(false);
      return;
    }

    const [file] = fileInput.files;
    if (file) {
      previewImg.src = URL.createObjectURL(file);
      setPreviewReady(true);
    }
  };

  const [local] = splitProps(props, [
    "classList",
    "label",
    "formHandler",
    "multiple",
    "value",
  ]);

  return (
    <Field
      {...props}
      mode="file-input"
      render={(field) => (
        <div
          classList={local.classList}
          class="flex flex-col items-center justify-center w-full"
        >
          <label
            for={field.props.id}
            class="flex flex-col items-center justify-center w-64 h-64 border-4 p-4 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <img
              ref={previewImg}
              class={`w-56 h-56 object-cover rounded-full border ${
                previewReady() ? "block" : "hidden"
              }`}
            />

            <Show when={!previewReady()}>
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span>{" "}
                  <Show when={local.label}>{local.label}</Show> or drag and drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF
                </p>
              </div>
            </Show>

            <input
              ref={fileInput}
              id={field.props.id}
              multiple={local.multiple}
              type="file"
              classList={{ "d-none": true }}
              onChange={field.props.onChange}
              onchange={changePreview}
              class="hidden"
            />
          </label>
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
