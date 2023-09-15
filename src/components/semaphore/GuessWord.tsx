import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@suid/material";
import { Component, Show, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { useWord } from "../../hooks/words";
import { GuessWordData } from "../../schema/semaphore";
import { Language } from "../../schema/word";
import H1 from "../typography/H1";
import H2 from "../typography/H2";
import GuessInput from "./GuessInput";
import GuessWordForm from "./GuessWordForm";
import ResponsiveStickMan from "./ResponsiveStickMan";
import CancelIcon from "@suid/icons-material/Cancel";
import CheckCircleIcon from "@suid/icons-material/CheckCircle";

interface State {
  word: string;
  wordIndex: number;
  guess: string;
  practiceRunning: boolean;
  signalRunning: boolean;
  guessAllowed: boolean;
  guessIndicator: string;
  showResult: boolean;
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
    guessAllowed: false,
    guessIndicator: "",
    countDown: 3,
    language: "id",
    speed: 0,
    showResult: false,
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
    if (!state.guessAllowed || state.showResult) {
      return;
    }

    setState({
      guess: event.currentTarget.value.toUpperCase(),
    });
  };

  const handleOnSubmitGuess = (event: Event) => {
    event.preventDefault();

    if (!state.showResult) {
      clearAllInterval();
      setState({
        showResult: true,
        guessIndicator: "",
        signalRunning: false,
        countDown: 3,
        wordIndex: 0,
      });
      return;
    }

    setState({ showResult: false, guess: "", guessAllowed: false });
    restartPractice();
  };

  const clearAllInterval = () => {
    const highestId = setTimeout(() => {
      for (let i = 0; i <= highestId; i++) {
        clearInterval(i);
      }
    }, 0);
  };

  const handleOnResetPractice = () => {
    clearAllInterval();

    setState({
      word: "!",
      wordIndex: 0,
      guess: "",
      practiceRunning: false,
      signalRunning: false,
      guessAllowed: false,
      guessIndicator: "",
      countDown: 3,
      speed: 0,
      showResult: false,
    });
  };

  const startPractice = async (guessWordData: GuessWordData) => {
    setState({
      language: guessWordData.language,
      speed: 1000 / guessWordData.speed,
      practiceRunning: true,
    });

    restartPractice();
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
    console.log(state.word);
  };

  const restartPractice = () => {
    startCountDown(async () => {
      await resetWord();
      startSignal();
    });
  };

  const startSignal = () => {
    setState({
      signalRunning: true,
      guessAllowed: true,
      guessIndicator: "Read the signal",
    });

    interval = setInterval(() => {
      setState({
        wordIndex: state.wordIndex + 1,
      });

      if (state.wordIndex >= state.word.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setState({
            signalRunning: false,
            wordIndex: 0,
            countDown: 3,
            guessIndicator: "Time to guess",
          });
        }, state.speed);
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
        sx={{
          minHeight: "calc(100vh - 10rem)",
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
            position: "relative",
          }}
        >
          <ResponsiveStickMan
            speed={state.speed}
            symbol={state.signalRunning ? state.word[state.wordIndex] : "!"}
          />
          <Show when={state.guessIndicator === ""}>
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
              {state.countDown.toString()}
            </Typography>
          </Show>
          <Show when={state.guessIndicator !== ""}>
            <Chip
              label={state.guessIndicator}
              color="primary"
              size="medium"
              sx={{
                position: "absolute",
                inset: "auto",
                top: "10%",
              }}
            />
          </Show>
        </Grid>
        <Grid item lg={2} flexGrow={1}>
          <Stack spacing={3} height="100%">
            <GuessInput
              title="Guess The Word"
              type="word"
              helperText={
                state.guessAllowed && state.showResult
                  ? "Enter again for the next signal"
                  : undefined
              }
              onSubmit={handleOnSubmitGuess}
              onChange={handleOnChangeGuess}
              value={state.guess}
            />

            <Paper>
              <Show when={!state.practiceRunning}>
                <GuessWordForm onSubmit={startPractice} />
              </Show>
              <Show when={state.practiceRunning}>
                <GuessInformation
                  showResult={state.showResult}
                  guess={state.guess}
                  word={state.word}
                  onReset={handleOnResetPractice}
                />
              </Show>
            </Paper>
          </Stack>
        </Grid>
        <Grid item lg={2} flexGrow={1}>
          <Stack spacing={3} height="100%">
            <CorrectStreak />
            <PersonalBest />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default GuessWord;

const GuessInformation: Component<
  Pick<State, "guess" | "word" | "showResult"> & {
    onReset: VoidFunction;
  }
> = (props) => {
  const correct = () => props.guess.toUpperCase() === props.word.toUpperCase();
  const iconSize = () => ({
    width: "6rem",
    height: "6rem",
  });

  return (
    <Stack spacing={3} p={4} alignItems="center">
      <H2>Guess Information</H2>

      <Show when={props.showResult}>
        <Typography>
          <Show when={correct()}>
            <CheckCircleIcon color="success" sx={iconSize()} />
          </Show>
          <Show when={!correct()}>
            <CancelIcon color="error" sx={iconSize()} />
          </Show>
        </Typography>
        <H1>{props.word.toUpperCase()}</H1>
      </Show>

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
