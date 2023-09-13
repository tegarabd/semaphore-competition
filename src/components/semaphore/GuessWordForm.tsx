import { Button, Stack } from "@suid/material";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { Component } from "solid-js";
import { validateAndShowError } from "../../lib/utils";
import { GuessWordData, guessWordSchema } from "../../schema/semaphore";
import { SelectInput } from "../input/SelectInput";
import { SliderInput } from "../input/SliderInput";
import H2 from "../typography/H2";

const GuessWordForm: Component<{
  onSubmit: (guessWordData: GuessWordData) => void;
}> = (props) => {
  const formHandler = useFormHandler(yupSchema(guessWordSchema));
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();

    try {
      await validateAndShowError(async () => {
        await formHandler.validateForm();
      });
    } catch (error) {
      return;
    }

    props.onSubmit(formData());
  };

  return (
    <>
      <Stack
        component="form"
        onSubmit={submit}
        spacing={3}
        sx={{
          p: 4,
        }}
      >
        <H2>Start Practice</H2>
        <SliderInput
          formHandler={formHandler}
          name="speed"
          label="Speed"
          value={3}
          min={1}
          step={0.5}
          max={5}
          fullWidth
          showValue
          valueUnit="Sign/Sec"
        />
        <SelectInput
          formHandler={formHandler}
          name="language"
          label="Language"
          value="id"
          options={[
            { value: "id", label: "Bahasa Indonesia" },
            { value: "en", label: "English" },
          ]}
        />
        <Button
          disabled={formHandler.isFormInvalid()}
          size="large"
          variant="contained"
          type="submit"
        >
          Start
        </Button>
      </Stack>
    </>
  );
};

export default GuessWordForm;
