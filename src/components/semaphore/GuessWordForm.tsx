import { Button, Paper } from "@suid/material";
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

    console.log("hai");

    try {
      await validateAndShowError(async () => {
        await formHandler.validateForm();
      });
    } catch (error) {
      return;
    }

    formHandler.resetForm();
    props.onSubmit(formData());
  };

  return (
    <>
      <Paper
        component="form"
        onSubmit={submit}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
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
      </Paper>
    </>
  );
};

export default GuessWordForm;
