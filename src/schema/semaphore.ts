import * as yup from "yup";
import { Language } from "./word";

export type GuessWordData = {
  speed: number;
  language: Language;
};

export const guessWordSchema: yup.Schema<GuessWordData> = yup.object({
  speed: yup
    .number()
    .typeError("Speed must be a number")
    .min(1, "Speed must be between 1 and 10")
    .max(10, "Speed must be between 1 and 10")
    .required("Spees is required"),
  language: yup.string().oneOf(["en", "id"]).required("language is required"),
});
