import { Component } from "solid-js";
import { TextInput } from "../input/TextInput";
import { useRegisterFormContext } from "../../pages/Register";

const Step2: Component = () => {
  const { formHandler } = useRegisterFormContext();

  return (
    <>
      <TextInput
        formHandler={formHandler}
        label="Full Name"
        name="step2.name"
        type="text"
      />
      <TextInput
        formHandler={formHandler}
        label="Username"
        name="step2.username"
        type="text"
      />
    </>
  );
};

export default Step2;
