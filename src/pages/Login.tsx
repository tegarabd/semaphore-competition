import { type Component } from "solid-js";
import LoginForm from "../components/LoginForm";
import AuthWrapper from "../components/AuthWrapper";

const Login: Component = () => {
  return (
    <>
      <AuthWrapper title="Sign in to your account">
        <LoginForm />
      </AuthWrapper>
    </>
  );
};

export default Login;
