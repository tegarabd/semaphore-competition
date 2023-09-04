import { Component } from "solid-js";
import { TextInput } from "../input/TextInput";
import { useRegisterFormContext } from "../../pages/Register";

const Step2: Component = () => {
  const { formHandler } = useRegisterFormContext();

  return (
    <>
      <div class="relative z-0 w-full mb-6 group">
        <TextInput
          formHandler={formHandler}
          label="Full Name"
          name="step2.name"
          type="text"
        />
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <TextInput
          formHandler={formHandler}
          label="Username"
          name="step2.username"
          type="text"
        />
      </div>
    </>
  );
};

export default Step2;
