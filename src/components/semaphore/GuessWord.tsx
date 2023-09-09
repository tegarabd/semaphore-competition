import { Grid, Paper, Stack } from "@suid/material";
import { Component, createSignal } from "solid-js";
import GuessInput from "./GuessInput";
import ResponsiveStickMan from "./ResponsiveStickMan";
import GuessWordForm from "./GuessWordForm";
import H2 from "../typography/H2";

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
      <Grid
        spacing={3}
        container
        columns={{
          lg: 7,
        }}
      >
        <Grid
          item
          lg={3}
          flexGrow={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ResponsiveStickMan symbol={symbol()} />
        </Grid>
        <Grid item lg={2} flexGrow={1}>
          <Stack spacing={3} height="100%">
            <GuessInput
              title="Guess The Word"
              type="word"
              onSubmit={handleOnSubmit}
              onChange={handleOnChange}
              value={guess()}
            />
            <CorrectStreak />
          </Stack>
        </Grid>
        <Grid item lg={2} flexGrow={1}>
          <Stack spacing={3} height="100%">
            <GuessWordForm />
            <PersonalBest />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default GuessWord;

const PersonalBest: Component = () => {
  return (
    <Paper sx={{ flexGrow: 1, p: 4 }}>
      <H2>Personal Best</H2>
    </Paper>
  );
};

const CorrectStreak: Component = () => {
  return (
    <Paper sx={{ flexGrow: 1, p: 4 }}>
      <H2>Correct Streak</H2>
    </Paper>
  );
};
