import CancelIcon from "@suid/icons-material/Cancel";
import CheckCircleIcon from "@suid/icons-material/CheckCircle";
import ErrorIcon from "@suid/icons-material/Error";
import { Box, Button, Grid, Paper, Stack, Typography } from "@suid/material";
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
import { useCounter, useLocalStorage } from "solidjs-hooks";

type GuessIndicator = "Get Ready" | "Read The Signal" | "Time to Guess";

interface State {
  word: string;
  wordIndex: number;
  guess: string;
  practiceRunning: boolean;
  signalRunning: boolean;
  guessAllowed: boolean;
  guessIndicator: GuessIndicator;
  showResult: boolean;
  countDown: number;
  language: Language;
  speed: number;
}

interface PersonalBestProps {
  correctStreakCount: number;
  speed?: number;
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
    guessIndicator: "Get Ready",
    countDown: 3,
    language: "id",
    speed: 0,
    showResult: false,
  });

  const [randomWord, { refetch }] = createResource(
    () => state.language,
    getRandomWord
  );

  const correctCounter = useCounter();

  const [personalBest, setPersonalBest] = useLocalStorage<PersonalBestProps>(
    "personalBest",
    {
      correctStreakCount: 0,
      speed: undefined,
    }
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

  const correct = () => state.guess.toUpperCase() === state.word.toUpperCase();

  const updateCorrectCounter = () => {
    if (!correct()) {
      correctCounter.reset();
      return;
    }

    correctCounter.increment();

    if (correctCounter.count() > personalBest().correctStreakCount) {
      setPersonalBest({
        correctStreakCount: correctCounter.count(),
        speed: Math.round(1000 / state.speed),
      });
    }
  };

  const handleOnSubmitGuess = (event: Event) => {
    event.preventDefault();

    if (!state.showResult) {
      clearAllInterval();
      updateCorrectCounter();
      setState({
        showResult: true,
        guessIndicator: "Get Ready",
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
      guessIndicator: "Get Ready",
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
      guessIndicator: "Read The Signal",
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
            guessIndicator: "Time to Guess",
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
          <Show
            when={state.practiceRunning && state.guessIndicator === "Get Ready"}
          >
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
                  guessIndicator={state.guessIndicator}
                  showResult={state.showResult}
                  word={state.word}
                  correct={correct()}
                  onReset={handleOnResetPractice}
                />
              </Show>
            </Paper>
          </Stack>
        </Grid>
        <Grid item lg={2} flexGrow={1}>
          <Stack spacing={3} height="100%">
            <CorrectStreak correctStreakCount={correctCounter.count()} />
            <PersonalBest {...personalBest()} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default GuessWord;

const GuessInformation: Component<
  Pick<State, "word" | "showResult" | "guessIndicator"> & {
    onReset: VoidFunction;
    correct: boolean;
  }
> = (props) => {
  const iconSize = () => ({
    width: "6rem",
    height: "6rem",
  });

  return (
    <Stack spacing={3} p={4} alignItems="center">
      <H2>Guess Information</H2>

      <Show when={props.showResult}>
        <Typography>
          <Show when={props.correct}>
            <CheckCircleIcon color="success" sx={iconSize()} />
          </Show>
          <Show when={!props.correct}>
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
          {props.word.toUpperCase()}
        </H1>
      </Show>

      <Show when={!props.showResult}>
        <ErrorIcon color="disabled" sx={iconSize()} />
        <H1 sx={{ opacity: 0.6 }}>{props.guessIndicator}</H1>
      </Show>

      <Button variant="contained" onClick={props.onReset} fullWidth>
        Reset
      </Button>
    </Stack>
  );
};

const PersonalBest: Component<PersonalBestProps> = (props) => {
  return (
    <Paper>
      <Stack alignItems="center" p={4} spacing={3}>
        <H2>Personal Best</H2>
        <H1>{props.correctStreakCount.toString()}</H1>
        <Typography>{props.speed} Signal/Seconds</Typography>
      </Stack>
    </Paper>
  );
};

const CorrectStreak: Component<{ correctStreakCount: number }> = (props) => {
  return (
    <Paper>
      <Stack alignItems="center" p={4} spacing={3}>
        <H2>Correct Streak</H2>
        <H1>{props.correctStreakCount.toString()}</H1>
      </Stack>
    </Paper>
  );
};
