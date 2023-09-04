import { Component } from "solid-js";
import { TextInput } from "../input/TextInput";
import { useRegisterFormContext } from "../../pages/Register";

const Step1: Component = () => {
  const { formHandler } = useRegisterFormContext();

  return (
    <>
      <div class="relative z-0 w-full mb-6 group">
        <TextInput
          formHandler={formHandler}
          label="Email"
          name="step1.email"
          type="email"
        />
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <TextInput
          formHandler={formHandler}
          label="Password"
          name="step1.password"
          type="password"
        />
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <TextInput
          formHandler={formHandler}
          label="Confirm Password"
          name="step1.confirmPassword"
          type="password"
        />
      </div>
    </>
  );
};

export default Step1;
