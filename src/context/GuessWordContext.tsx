import {
  Component,
  createContext,
  useContext,
  JSX,
  createResource,
} from "solid-js";
import { Language } from "../schema/word";
import { useWord } from "../hooks/words";
import { useCounter, useLocalStorage } from "solidjs-hooks";
import { createStore } from "solid-js/store";
import { GuessWordData } from "../schema/semaphore";

type GuessIndicator = "Get Ready" | "Read The Signal" | "Time to Guess";

interface State {
  word: string;
  wordIndex: number;
  guess: string;
  practiceRunning: boolean;
  signalRunning: boolean;
  guessAllowed: boolean;
  guessIndicator: GuessIndicator;
  resultShow: boolean;
  countDown: number;
  language: Language;
  speed: number;
  actualSpeed: number;
}

export interface PersonalBestData {
  bestCorrectStreak: number;
  bestSpeed: number;
}

const useValue = () => {
  let interval: number;

  const { getRandomWord } = useWord();

  const defaultState: () => State = () => ({
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
    actualSpeed: 0,
    resultShow: false,
  });

  const [state, setState] = createStore<State>(defaultState());

  const [randomWord, { refetch }] = createResource(
    () => state.language,
    getRandomWord
  );

  const [personalBest, setPersonalBest] = useLocalStorage<PersonalBestData>(
    "personalBest",
    {
      bestCorrectStreak: 0,
      bestSpeed: 0,
    }
  );

  const changeGuess = (event: { currentTarget: HTMLInputElement }) => {
    if (!state.guessAllowed || state.resultShow) {
      return;
    }

    setState({
      guess: event.currentTarget.value.toUpperCase(),
    });
  };

  const correct = () => state.guess.toUpperCase() === state.word.toUpperCase();

  const correctCounter = useCounter();
  const updateCorrectCounter = () => {
    if (!correct()) {
      correctCounter.reset();
      return;
    }

    correctCounter.increment();
    const personalBestData = personalBest();

    if (
      personalBestData == undefined ||
      correctCounter.count() > personalBestData.bestCorrectStreak
    ) {
      setPersonalBest({
        bestCorrectStreak: correctCounter.count(),
        bestSpeed: state.actualSpeed,
      });
    }
  };

  const submitGuess = (event: Event) => {
    event.preventDefault();

    if (!state.resultShow) {
      clearAllInterval();
      updateCorrectCounter();
      setState({
        resultShow: true,
        signalRunning: false,
        countDown: 3,
        wordIndex: 0,
      });

      return;
    }

    setState({
      resultShow: false,
      guess: "",
      guessAllowed: false,
      guessIndicator: "Get Ready",
    });
    restartSignal();
  };

  const clearAllInterval = () => {
    const highestId = setTimeout(() => {
      for (let i = 0; i <= highestId; i++) {
        clearInterval(i);
      }
    }, 0);
  };

  const resetPractice = () => {
    clearAllInterval();
    setState(defaultState());
  };

  const startPractice = async (guessWordData: GuessWordData) => {
    setState({
      language: guessWordData.language,
      speed: 1000 / guessWordData.speed,
      actualSpeed: guessWordData.speed,
      practiceRunning: true,
    });

    restartSignal();
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

  const restartSignal = () => {
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

  const helperText = () => {
    if (state.guessAllowed && state.resultShow) {
      return "Enter again for the next guess";
    }

    if (!state.practiceRunning) {
      return "Start the practice first";
    }

    if (state.guessIndicator !== "Get Ready") {
      return "You may start guessing";
    }

    return state.guessIndicator;
  };

  return {
    state: () => state,
    correctStreak: () => correctCounter.count(),
    symbol: () => (state.signalRunning ? state.word[state.wordIndex] : "!"),
    countDownShow: () =>
      state.practiceRunning && state.guessIndicator === "Get Ready",
    helperText,
    personalBest,
    correct,
    changeGuess,
    submitGuess,
    startPractice,
    resetPractice,
  };
};

const GuessWordContext = createContext({} as ReturnType<typeof useValue>);

export const GuessWordProvider: Component<{ children: JSX.Element }> = (
  props
) => {
  return (
    <GuessWordContext.Provider value={useValue()}>
      {props.children}
    </GuessWordContext.Provider>
  );
};

export const useGuessWord = () => useContext(GuessWordContext);
