import { Paper, Stack } from "@suid/material";
import { Component, createSignal } from "solid-js";
import GuessInput from "./GuessInput";
import ResponsiveStickMan from "./ResponsiveStickMan";
import GuessWordForm from "./GuessWordForm";

const GuessWord: Component = () => {
  const [guess, setGuess] = createSignal("");
  const [symbol, setSymbol] = createSignal("!");

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
    setSymbol("!");
    setGuess("");
  };

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
        <Stack
          component={Paper}
          variant="outlined"
          borderColor="secondary.main"
          alignItems="center"
          sx={{
            borderWidth: "0.5rem",
          }}
        >
          <ResponsiveStickMan symbol={symbol()} />
        </Stack>
        <Stack spacing={3}>
          <GuessWordForm />
          <GuessInput
            title="Guess the word"
            type="word"
            onSubmit={handleOnSubmit}
            onChange={handleOnChange}
            value={guess()}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default GuessWord;
