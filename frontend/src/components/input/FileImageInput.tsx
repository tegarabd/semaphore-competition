import { Field, FieldProps } from "solid-form-handler";
import { Component, JSX, Show, createSignal, splitProps } from "solid-js";
import { Input, Stack, Typography } from "@suid/material";
import { OutlinedInputProps } from "@suid/material/OutlinedInput";
import CloudUploadIcon from "@suid/icons-material/CloudUpload";

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
        <Stack alignItems="center" spacing={2} classList={local.classList}>
          <Stack
            component="label"
            for={field.props.id}
            alignItems="center"
            justifyContent="center"
            spacing={0.5}
            sx={{
              width: "14rem",
              height: "14rem",
              borderRadius: "50%",
              borderWidth: 4,
              borderStyle: "dashed",
              borderColor: "primary.main",
              backgroundColor: "background.default",
              padding: "1rem",
              cursor: "pointer",
            }}
          >
            <img
              ref={previewImg}
              style={{
                display: previewReady() ? "block" : "none",
                width: "12rem",
                height: "12rem",
                "border-radius": "50%",
                "object-fit": "cover",
              }}
            />

            <Show when={!previewReady()}>
              <Typography align="center" variant="body1">
                Click to upload <Show when={local.label}>{local.label}</Show> or
                drag and drop
              </Typography>
              <CloudUploadIcon color="primary" />
              <Typography align="center" variant="body2" fontWeight="bold">
                SVG, PNG, JPG or GIF
              </Typography>
            </Show>

            <input
              ref={fileInput}
              id={field.props.id}
              multiple={local.multiple}
              type="file"
              onChange={field.props.onChange}
              onchange={changePreview}
              style={{ display: "none" }}
            />
          </Stack>
          <Show when={field.helpers.error}>
            <Typography variant="body2" color="error.main">
              {field.helpers.errorMessage}
            </Typography>
          </Show>
        </Stack>
      )}
    />
  );
};
