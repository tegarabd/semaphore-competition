import { A, useNavigate } from "@solidjs/router";
import { Button, Stack, Typography } from "@suid/material";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { type Component } from "solid-js";
import AuthWrapper from "../components/AuthWrapper";
import { TextInput } from "../components/input/TextInput";
import { useUser } from "../context/UserContext";
import { sendRequest } from "../lib/utils";
import { loginSchema } from "../schema/user";

const Login: Component = () => {
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
      <AuthWrapper title="Sign in to your account">
        <Stack component="form" spacing={2} onSubmit={submit}>
          <TextInput
            formHandler={formHandler}
            label="Username or Email"
            name="usernameOrEmail"
          />
          <TextInput
            formHandler={formHandler}
            label="Password"
            name="password"
            type="password"
          />
          <Button
            variant="contained"
            disabled={formHandler.isFormInvalid()}
            type="submit"
          >
            Sign in
          </Button>
          <Typography variant="body2">
            Don't have an account yet? <A href="/auth/register">Sign up</A>
          </Typography>
        </Stack>
      </AuthWrapper>
    </>
  );
};

export default Login;
