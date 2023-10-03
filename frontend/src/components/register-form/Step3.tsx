import { Component } from "solid-js";
import { useRegisterFormContext } from "../../pages/Register";
import { FileImageInput } from "../input/FileImageInput";

const Step3: Component = () => {
  const { formHandler } = useRegisterFormContext();

  return (
    <>
      <FileImageInput
        label="Profile Picture"
        formHandler={formHandler}
        name="step3.avatarFile"
      />
    </>
  );
};

export default Step3;
