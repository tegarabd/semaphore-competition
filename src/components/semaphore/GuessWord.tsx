import CancelIcon from "@suid/icons-material/Cancel";
import CheckCircleIcon from "@suid/icons-material/CheckCircle";
import ErrorIcon from "@suid/icons-material/Error";
import { Box, Button, Grid, Paper, Stack, Typography } from "@suid/material";
import { Component, Show } from "solid-js";
import { useGuessWord } from "../../context/GuessWordContext";
import H1 from "../typography/H1";
import H2 from "../typography/H2";
import GuessInput from "./GuessInput";
import GuessWordForm from "./GuessWordForm";
import ResponsiveStickMan from "./ResponsiveStickMan";

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

            <Paper>
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

const CountDown: Component = () => {
  const { state } = useGuessWord();

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(250,250,250,0.7)",
        }}
      ></Box>
      <Typography
        sx={{
          fontSize: {
            xs: "6.4rem",
            md: "9.6rem",
            lg: "12.8rem",
            xl: "16rem",
          },
          fontWeight: "900",
          position: "absolute",
          inset: "auto",
        }}
      >
        {state().countDown}
      </Typography>
    </>
  );
};

const GuessInformation: Component = () => {
  const { correct, state, resetPractice } = useGuessWord();

  const iconSize = () => ({
    width: "6rem",
    height: "6rem",
  });

  return (
    <Stack spacing={3} p={4} alignItems="center">
      <H2>Guess Information</H2>

      <Show when={state().resultShow}>
        <Typography>
          <Show when={correct()}>
            <CheckCircleIcon color="success" sx={iconSize()} />
          </Show>
          <Show when={!correct()}>
            <CancelIcon color="error" sx={iconSize()} />
          </Show>
        </Typography>
        <H1
          sx={{
            wordWrap: "break-word",
            textAlign: "center",
            maxWidth: "100%",
          }}
        >
          {state().word.toUpperCase()}
        </H1>
      </Show>

      <Show when={!state().resultShow}>
        <ErrorIcon color="disabled" sx={iconSize()} />
        <H1 sx={{ opacity: 0.6 }}>{state().guessIndicator}</H1>
      </Show>

      <Button variant="contained" onClick={resetPractice} fullWidth>
        Reset
      </Button>
    </Stack>
  );
};

const PersonalBest: Component = () => {
  const { personalBest } = useGuessWord();

  return (
    <Paper>
      <Stack alignItems="center" p={4} spacing={3}>
        <H2>Personal Best</H2>
        <Show
          when={personalBest().bestCorrectStreak || personalBest().bestSpeed}
        >
          <H1>{personalBest()?.bestCorrectStreak}</H1>
          <Typography>{personalBest()?.bestSpeed} Signals/Second</Typography>
        </Show>
        <Show
          when={!personalBest().bestCorrectStreak && !personalBest().bestSpeed}
        >
          <Typography>No Personal Best yet</Typography>
        </Show>
      </Stack>
    </Paper>
  );
};

const CorrectStreak: Component = () => {
  const { correctStreak } = useGuessWord();

  return (
    <Paper>
      <Stack alignItems="center" p={4} spacing={3}>
        <H2>Correct Streak</H2>
        <H1>{correctStreak()}</H1>
      </Stack>
    </Paper>
  );
};
