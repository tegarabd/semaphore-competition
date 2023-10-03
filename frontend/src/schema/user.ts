import * as yup from "yup";
import validator from "validator";

export type LoginData = {
  usernameOrEmail: string;
  password: string;
};

export const loginSchema: yup.Schema<LoginData> = yup.object({
  usernameOrEmail: yup.string().required("Username or Email is required"),
  password: yup.string().required("Password is required"),
});

export type RegisterData = {
  step1: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  step2: {
    name: string;
    username: string;
  };
  step3: {
    avatarFile: File;
  };
};

const validFileExtensions = ["jpg", "gif", "png", "jpeg", "svg", "webp"];

function isValidFileType(value?: File) {
  return (
    value?.name != null &&
    validFileExtensions.find((ext) => ext === value.name.split(".").pop()) !=
      null
  );
}

function isPresence(value?: File) {
  return value ? true : false;
}

export const registerSchema: yup.Schema<RegisterData> = yup.object({
  step1: yup
    .object({
      email: yup
        .string()
        .email("Email must be valid")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Paswords must match")
        .required("Confirm Password is required"),
    })
    .required(),
  step2: yup
    .object({
      name: yup.string().required("Name is required"),
      username: yup
        .string()
        .required("Username is required")
        .test(
          "is-valid-username",
          "Username must only contains (A-Za-z)",
          (username) => !username || validator.isAlpha(username)
        ),
    })
    .required(),
  step3: yup
    .object({
      avatarFile: yup
        .mixed<File>()
        .test("is-presence", "Profile Picture is required", isPresence)
        .test(
          "is-valid-type",
          "File must be a valid image type",
          isValidFileType
        )
        .required("Profile Picture is required"),
    })
    .required(),
});
