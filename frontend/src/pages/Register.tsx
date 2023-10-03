import { A, useNavigate } from "@solidjs/router";
import { Button, Stack, Typography } from "@suid/material";
import { FormHandler, useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import {
  Match,
  Show,
  Switch,
  createContext,
  createSignal,
  useContext,
  type Component,
} from "solid-js";
import AuthWrapper from "../components/AuthWrapper";
import Step1 from "../components/register-form/Step1";
import Step2 from "../components/register-form/Step2";
import Step3 from "../components/register-form/Step3";
import { useUser } from "../context/UserContext";
import { validateAndShowError } from "../lib/utils";
import { RegisterData, registerSchema } from "../schema/user";

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
      await validateAndShowError(async () => {
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
          <Stack component="form" spacing={2} onSubmit={submit}>
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
            <Stack
              direction="row"
              spacing={2}
              alignItems="stretch"
              justifyContent="stretch"
            >
              <Show when={step() > 1}>
                <Button
                  variant="contained"
                  onClick={back}
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  Back
                </Button>
              </Show>
              <Show when={step() < 3}>
                <Button
                  variant="contained"
                  disabled={formHandler.isFieldInvalid(`step${step()}`)}
                  onClick={next}
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  Next
                </Button>
              </Show>
              <Show when={step() === 3}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={formHandler.isFormInvalid()}
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  Submit
                </Button>
              </Show>
            </Stack>
            <Typography variant="body2">
              Already have an account? <A href="/auth/login">Sign in</A>
            </Typography>
          </Stack>
        </AuthWrapper>
      </RegisterFormContext.Provider>
    </>
  );
};

export default Register;
