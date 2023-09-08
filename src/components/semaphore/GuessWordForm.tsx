import { Component, createSignal } from "solid-js";
import { Paper, Stack, Typography } from "@suid/material";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { guessWordSchema } from "../../schema/semaphore";
import { SelectChangeEvent } from "@suid/material/Select";
import { RadioInput } from "../input/RadioInput";
import { SelectInput } from "../input/SelectInput";
import { SliderInput } from "../input/SliderInput";

const GuessWordForm: Component = () => {
  const formHandler = useFormHandler(yupSchema(guessWordSchema));
  const { formData } = formHandler;

  return (
    <>
      <Stack
        component={Paper}
        variant="outlined"
        sx={{
          p: 4,
        }}
        spacing={2}
        alignItems="start"
      >
        <Typography variant="h3">Start Practice</Typography>
        {/* <SelectInput
          formHandler={formHandler}
          name="speed"
          label="Speed"
          options={[
            { value: 1, label: "Slow" },
            { value: 3, label: "Medium" },
            { value: 5, label: "Fast" },
          ]}
        /> */}
        <SliderInput
          formHandler={formHandler}
          name="speed"
          label="Speed"
          width="900"
          min={0}
          max={10}
        />
        <RadioInput
          formHandler={formHandler}
          name="language"
          label="Language"
          options={[
            { value: "id", label: "Bahasa Indonesia" },
            { value: "en", label: "English" },
          ]}
        />
        <pre>
          <code>{JSON.stringify(formData(), null, 2)}</code>
        </pre>
      </Stack>
    </>
  );
};

export default GuessWordForm;
