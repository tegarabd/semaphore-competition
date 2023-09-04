import { ClientResponseError } from "pocketbase";
import { FormErrorsException } from "solid-form-handler";
import toast from "solid-toast";
import { ALPHABET } from "./constant";

export async function sendRequest(action: () => Promise<void>) {
  try {
    await action();
  } catch (error) {
    if (error instanceof FormErrorsException) {
      error.validationResult.forEach((e) => {
        toastError(`${e.path} ${e.message}`);
      });
      throw error;
    }

    if (error instanceof ClientResponseError) {
      toastError(error.message);
      (
        Object.keys(error.data.data) as (keyof typeof error.data.data)[]
      ).forEach((key) => {
        toastError((error as ClientResponseError).data.data[key].message);
      });
      throw error;
    }
  }
}

export function toastError(text: string) {
  toast.error(text, {
    position: "top-right",
    duration: 3000,
  });
}

export function getRandomAlphabet() {
  return ALPHABET.split("")[Math.floor(Math.random() * ALPHABET.length)];
}
