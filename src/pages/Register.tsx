import { A, useNavigate } from "@solidjs/router";
import {
  createSignal,
  type Component,
  createContext,
  useContext,
  Switch,
  Match,
  Show,
} from "solid-js";
import AuthWrapper from "../components/AuthWrapper";
import Step1 from "../components/register-form/Step1";
import { FormHandler, useFormHandler } from "solid-form-handler";
import { RegisterData, registerSchema } from "../schema/user";
import Step2 from "../components/register-form/Step2";
import Step3 from "../components/register-form/Step3";
import { yupSchema } from "solid-form-handler/yup";
import { useUser } from "../context/UserContext";
import { sendRequest } from "../lib/utils";

const RegisterFormContext = createContext(
  {} as {
    formHandler: FormHandler<RegisterData>;
  }
);

export const useRegisterFormContext = () => useContext(RegisterFormContext);

const Register: Component = () => {
  const formHandler = useFormHandler(yupSchema(registerSchema));
  const navigate = useNavigate();
  const { formData } = formHandler;
  const { register, login } = useUser();
  const [step, setStep] = createSignal(1);

  const submit = async (event: Event) => {
    event.preventDefault();

    try {
      await sendRequest(async () => {
        await formHandler.validateForm();
        await register(formData());
        await login({
          usernameOrEmail: formData().step1.email,
          password: formData().step1.password,
        });
      });
    } catch (error) {
      return;
    }

    formHandler.resetForm();
    navigate("/");
  };

  const next = () => {
    setStep((prev) => prev + 1);
  };

  const back = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <>
      <RegisterFormContext.Provider value={{ formHandler }}>
        <AuthWrapper title="Create an account">
          <form onSubmit={submit}>
            <Switch>
              <Match when={step() === 1}>
                <Step1 />
              </Match>
              <Match when={step() === 2}>
                <Step2 />
              </Match>
              <Match when={step() === 3}>
                <Step3 />
              </Match>
            </Switch>
            <div class="flex gap-4">
              <Show when={step() > 1}>
                <button
                  type="button"
                  class="my-4 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-blue-400 disabled:dark:bg-blue-500 disabled:cursor-not-allowed"
                  onClick={back}
                >
                  Back
                </button>
              </Show>
              <Show when={step() < 3}>
                <button
                  type="button"
                  class="my-4 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-blue-400 disabled:dark:bg-blue-500 disabled:cursor-not-allowed"
                  disabled={formHandler.isFieldInvalid(`step${step()}`)}
                  onClick={next}
                >
                  Next
                </button>
              </Show>
              <Show when={step() === 3}>
                <button
                  class="my-4 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-blue-400 disabled:dark:bg-blue-500 disabled:cursor-not-allowed"
                  disabled={formHandler.isFormInvalid()}
                >
                  Submit
                </button>
              </Show>
            </div>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <A
                href="/auth/login"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign in
              </A>
            </p>
          </form>
        </AuthWrapper>
      </RegisterFormContext.Provider>
    </>
  );
};

export default Register;
