import { Component } from "solid-js";
import { useRegisterFormContext } from "../../pages/Register";
import { FileImageInput } from "../input/FileImageInput";

const Step3: Component = () => {
  const { formHandler } = useRegisterFormContext();

  return (
    <>
      <div class="relative z-0 w-full mb-6 group">
        <FileImageInput
          label="Profile Picture"
          formHandler={formHandler}
          name="step3.avatarFile"
        />
      </div>
    </>
  );
};

export default Step3;
