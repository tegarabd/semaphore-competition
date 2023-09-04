import { A, useNavigate } from "@solidjs/router";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { type Component } from "solid-js";
import { loginSchema } from "../schema/user";
import { TextInput } from "./input/TextInput";
import { useUser } from "../context/UserContext";
import { sendRequest } from "../lib/utils";

const LoginForm: Component = () => {
  const formHandler = useFormHandler(yupSchema(loginSchema));
  const navigate = useNavigate();
  const { formData } = formHandler;
  const { login } = useUser();

  const submit = async (event: Event) => {
    event.preventDefault();

    try {
      await sendRequest(async () => {
        await formHandler.validateForm();
        await login(formData());
      });
    } catch (error) {
      return;
    }

    formHandler.resetForm();
    navigate("/");
  };

  return (
    <>
      <form onSubmit={submit}>
        <div class="relative z-0 w-full mb-6 group">
          <TextInput
            formHandler={formHandler}
            label="Username or Email"
            name="usernameOrEmail"
          />
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <TextInput
            formHandler={formHandler}
            label="Password"
            name="password"
            type="password"
          />
        </div>
        <button
          disabled={formHandler.isFormInvalid()}
          type="submit"
          class="my-4 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-blue-400 disabled:dark:bg-blue-500 disabled:cursor-not-allowed"
        >
          Sign in
        </button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Don't have an account yet?{" "}
          <A
            href="/auth/register"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign up
          </A>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
