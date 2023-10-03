import { Component } from "solid-js";
import { TextInput } from "../input/TextInput";
import { useRegisterFormContext } from "../../pages/Register";

const Step1: Component = () => {
  const { formHandler } = useRegisterFormContext();

  return (
    <>
      <TextInput
        formHandler={formHandler}
        label="Email"
        name="step1.email"
        type="email"
      />
      <TextInput
        formHandler={formHandler}
        label="Password"
        name="step1.password"
        type="password"
      />
      <TextInput
        formHandler={formHandler}
        label="Confirm Password"
        name="step1.confirmPassword"
        type="password"
      />
    </>
  );
};

export default Step1;
