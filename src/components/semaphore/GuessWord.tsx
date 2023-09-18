import { Box, Button, Grid, Paper, Stack, Typography } from "@suid/material";
import { Component, Show } from "solid-js";
import { useGuessWord } from "../../context/GuessWordContext";
import H1 from "../typography/H1";
import H2 from "../typography/H2";
import GuessInput from "./GuessInput";
import GuessWordForm from "./GuessWordForm";
import ResponsiveStickMan from "./ResponsiveStickMan";
import CountDown from "./guess-word/CountDown";
import GuessInformation from "./guess-word/GuessInformation";
import PersonalBest from "./guess-word/PersonalBest";
import CorrectStreak from "./guess-word/CorrectStreak";

const GuessWord: Component = () => {
  const {
    state,
    symbol,
    countDownShow,
    submitGuess,
    changeGuess,
    startPractice,
    helperText,
  } = useGuessWord();

  return (
    <>
      <Grid
        spacing={3}
        container
        columns={{
          xl: 7,
        }}
        sx={{
          minHeight: "calc(100vh - 10rem)",
        }}
      >
        <Grid
          item
          xl={3}
          flexGrow={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <ResponsiveStickMan speed={state().speed} symbol={symbol()} />
          <Show when={countDownShow()}>
            <CountDown />
          </Show>
        </Grid>

        <Grid item xl={2} flexGrow={1}>
          <Stack spacing={3}>
            <GuessInput
              title="Guess The Word"
              type="word"
              helperText={helperText()}
              onSubmit={submitGuess}
              onChange={changeGuess}
              value={state().guess}
            />

            <Paper
              sx={{
                flexGrow: 1,
              }}
            >
              <Show when={!state().practiceRunning}>
                <GuessWordForm onSubmit={startPractice} />
              </Show>
              <Show when={state().practiceRunning}>
                <GuessInformation />
              </Show>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xl={2} flexGrow={1}>
          <Stack spacing={3}>
            <CorrectStreak />
            <PersonalBest />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default GuessWord;
