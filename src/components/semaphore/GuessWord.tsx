import { Grid, Paper, Stack } from "@suid/material";
import {
  Accessor,
  Component,
  createEffect,
  createResource,
  from,
} from "solid-js";
import { createStore } from "solid-js/store";
import { useWord } from "../../hooks/words";
import { GuessWordData } from "../../schema/semaphore";
import H2 from "../typography/H2";
import GuessInput from "./GuessInput";
import GuessWordForm from "./GuessWordForm";
import ResponsiveStickMan from "./ResponsiveStickMan";
import { Language } from "../../schema/word";
import { useCounter, useInterval } from "solidjs-hooks";

interface State {
  word: string;
  wordIndex: number;
  guess: string;
  guessRunning: boolean;
  signalRunning: boolean;
  countDown: number;
  language: Language;
  speed: number;
}

const GuessWord: Component = () => {
  let interval: number;
  const { getRandomWord } = useWord();

  const [state, setState] = createStore<State>({
    word: "!",
    wordIndex: 0,
    guess: "",
    guessRunning: false,
    signalRunning: false,
    countDown: 3,
    language: "id",
    speed: 0,
  });

  const [randomWord, { refetch }] = createResource(
    () => state.language,
    getRandomWord
  );

  const handleOnChange = (
    event: Event & {
      currentTarget: HTMLInputElement;
    }
  ) => {
    setState({
      guess: event.currentTarget.value.toUpperCase(),
    });
  };

  const handleOnSubmit = (event: Event) => {
    event.preventDefault();
    setState({
      guess: "",
    });
  };

  const startGuess = async (guessWordData: GuessWordData) => {
    setState({
      language: guessWordData.language,
      speed: 1000 / guessWordData.speed,
      guessRunning: true,
    });

    startCountDown(resetWord);
  };

  const startCountDown = (callback: TimerHandler) => {
    interval = setInterval(() => {
      setState({
        countDown: state.countDown - 1,
      });

      if (state.countDown <= 1) {
        clearInterval(interval);
        setTimeout(callback, 1000);
      }
    }, 1000);
  };

  const resetWord = async () => {
    await refetch();
    setState({
      word: randomWord()?.word.toLowerCase(),
      countDown: 3,
    });
    startSignal();
  };

  const startSignal = () => {
    interval = setInterval(() => {
      setState({
        signalRunning: true,
        wordIndex: state.wordIndex + 1,
      });

      if (state.wordIndex >= state.word.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setState({ signalRunning: false, word: "!", wordIndex: 0 });
          startCountDown(resetWord);
        }, state.speed);
      }
    }, state.speed);
  };

  return (
    <>
      {state.countDown}
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
          <ResponsiveStickMan
            speed={state.speed}
            symbol={state.word[state.wordIndex]}
          />
        </Grid>
        <Grid item lg={2} flexGrow={1}>
          <Stack spacing={3} height="100%">
            <GuessInput
              title="Guess The Word"
              type="word"
              onSubmit={handleOnSubmit}
              onChange={handleOnChange}
              value={state.guess}
              disabled={!state.guessRunning && state.signalRunning}
            />
            <CorrectStreak />
          </Stack>
        </Grid>
        <Grid item lg={2} flexGrow={1}>
          <Stack spacing={3} height="100%">
            <GuessWordForm onSubmit={startGuess} />
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
