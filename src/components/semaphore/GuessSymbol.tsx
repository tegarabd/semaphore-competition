import { Paper, Stack } from "@suid/material";
import { Component, createSignal } from "solid-js";
import { getRandomAlphabet } from "../../lib/utils";
import GuessInput from "./GuessInput";
import ResponsiveStickMan from "./ResponsiveStickMan";

const GuessPerSymbol: Component = () => {
  const [guess, setGuess] = createSignal("");
  const [symbol, setSymbol] = createSignal(getRandomAlphabet());

  const handleOnChange = (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    setGuess(event.currentTarget.value.toUpperCase());
  };

  const handleOnSubmit = (
    event: Event & {
      submitter: HTMLElement;
    } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => {
    event.preventDefault();
    setSymbol(getRandomAlphabet());
    setGuess("");
  };

  const correct = () => guess().toUpperCase() === symbol().toUpperCase();

  return (
    <>
      <Stack
        direction={{
          xs: "column",
          lg: "row",
        }}
        spacing={3}
        justifyContent="stretch"
        sx={{
          alignItems: {
            xs: "stretch",
            lg: "start",
          },
        }}
      >
        <Stack component={Paper} variant="outlined" alignItems="center">
          <ResponsiveStickMan symbol={symbol()} />
        </Stack>
        <GuessInput
          title="Guess the letter"
          type="symbol"
          correct={correct()}
          onSubmit={handleOnSubmit}
          onChange={handleOnChange}
          value={guess()}
        />
      </Stack>
    </>
  );
};

export default GuessPerSymbol;
