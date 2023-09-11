import { Component, createSignal } from "solid-js";
import { Button, Paper, Stack, Typography } from "@suid/material";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { guessWordSchema } from "../../schema/semaphore";
import { SelectChangeEvent } from "@suid/material/Select";
import { RadioInput } from "../input/RadioInput";
import { SelectInput } from "../input/SelectInput";
import { SliderInput } from "../input/SliderInput";
import H2 from "../typography/H2";

const GuessWordForm: Component = () => {
  const formHandler = useFormHandler(yupSchema(guessWordSchema));
  const { formData } = formHandler;

  return (
    <>
      <Stack
        component={Paper}
        sx={{
          p: 4,
        }}
        spacing={3}
      >
        <H2>Start Practice</H2>
        <SliderInput
          formHandler={formHandler}
          name="speed"
          label="Speed"
          width="900"
          value={5}
          min={1}
          max={10}
          fullWidth
          showValue
          valueUnit="Sign/Sec"
        />
        <SelectInput
          formHandler={formHandler}
          name="language"
          label="Language"
          options={[
            { value: "id", label: "Bahasa Indonesia" },
            { value: "en", label: "English" },
          ]}
        />
        <Button size="large" variant="contained">
          Start
        </Button>
      </Stack>
    </>
  );
};

export default GuessWordForm;
