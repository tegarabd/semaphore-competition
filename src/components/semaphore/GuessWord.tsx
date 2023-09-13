import { Button, Grid, Paper, Stack } from "@suid/material";
import { Component, Show, createResource } from "solid-js";
import { createMutable, createStore } from "solid-js/store";
import { useWord } from "../../hooks/words";
import { GuessWordData } from "../../schema/semaphore";
import { Language } from "../../schema/word";
import H1 from "../typography/H1";
import H2 from "../typography/H2";
import GuessInput from "./GuessInput";
import GuessWordForm from "./GuessWordForm";
import ResponsiveStickMan from "./ResponsiveStickMan";

interface State {
  word: string;
  wordIndex: number;
  guess: string;
  practiceRunning: boolean;
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
    practiceRunning: false,
    signalRunning: false,
    countDown: 3,
    language: "id",
    speed: 0,
  });

  const [randomWord, { refetch }] = createResource(
    () => state.language,
    getRandomWord
  );

  const handleOnChangeGuess = (
    event: Event & {
      currentTarget: HTMLInputElement;
    }
  ) => {
    setState({
      guess: event.currentTarget.value.toUpperCase(),
    });
  };

  const handleOnSubmitGuess = (event: Event) => {
    event.preventDefault();
    setState({ guess: "" });
  };

  const handleOnResetPractice = () => {
    const highestId = setTimeout(() => {
      for (let i = 0; i <= highestId; i++) {
        clearInterval(i);
      }
    }, 0);

    setState({
      word: "!",
      wordIndex: 0,
      guess: "",
      practiceRunning: false,
      signalRunning: false,
      countDown: 3,
    });
  };

  const startPractice = async (guessWordData: GuessWordData) => {
    setState({
      language: guessWordData.language,
      speed: 1000 / guessWordData.speed,
      practiceRunning: true,
    });

    startCountDown(async () => {
      await resetWord();
      startSignal();
    });
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
    });
  };

  const restartPractice = () => {
    setState({
      signalRunning: false,
      word: "!",
      wordIndex: 0,
      countDown: 3,
    });
    startCountDown(async () => {
      await resetWord();
      startSignal();
    });
  };

  const startSignal = () => {
    setState({
      signalRunning: true,
    });

    interval = setInterval(() => {
      setState({
        wordIndex: state.wordIndex + 1,
      });

      if (state.wordIndex >= state.word.length - 1) {
        clearInterval(interval);
        setTimeout(restartPractice, state.speed);
      }
    }, state.speed);
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
              onSubmit={handleOnSubmitGuess}
              onChange={handleOnChangeGuess}
              value={state.guess}
              disabled={!state.practiceRunning || state.signalRunning}
            />
            <CorrectStreak />
          </Stack>
        </Grid>
        <Grid item lg={2} flexGrow={1}>
          <Stack spacing={3} height="100%">
            <Paper>
              <Show when={!state.practiceRunning}>
                <GuessWordForm onSubmit={startPractice} />
              </Show>
              <Show when={state.practiceRunning}>
                <GuessInformation
                  countDown={state.countDown}
                  onReset={handleOnResetPractice}
                />
              </Show>
            </Paper>
            <PersonalBest />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default GuessWord;

const GuessInformation: Component<{
  countDown: number;
  onReset: VoidFunction;
}> = (props) => {
  return (
    <Stack spacing={3} p={4} alignItems="center">
      <H1>{props.countDown.toString()}</H1>
      <Button variant="contained" onClick={props.onReset} fullWidth>
        Reset
      </Button>
    </Stack>
  );
};

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
