import { Component, createSignal } from "solid-js";
import GuessWrapper from "./GuessWrapper";
import { useWord } from "../../hooks/words";

const GuessPerWord: Component = () => {
  const { getRandomWord } = useWord();
  const [guess, setGuess] = createSignal("");
  const [word, setWord] = createSignal("");
  const [symbol, setSymbol] = createSignal("u");

  const setRandomWord = async () => {
    const word = await getRandomWord();
    setWord(word.word);
  };

  setRandomWord();

  return (
    <GuessWrapper symbol={symbol()}>
      <div class="flex flex-col items-center gap-4">
        <h2 class="text-center mb-2 text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-none text-gray-900  dark:text-white">
          Guess the word
        </h2>
        <div class="flex gap-4 items-center">
          <form
            class="grid place-items-center"
            onSubmit={(event) => {
              event.preventDefault();
              setGuess("");
              setSymbol("u");
            }}
          >
            <input
              value={guess()}
              onInput={(event) =>
                setGuess(event.currentTarget.value.toUpperCase())
              }
              placeholder="WORD"
              class="placeholder-gray-200 block w-10/12 text-center py-2.5 px-0 text-5xl md:text-6xl lg:text-8xl font-medium text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer"
            />
          </form>
        </div>
        <button
          type="button"
          class="px-6 py-3.5 text-lg font-medium text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Start
        </button>
      </div>
    </GuessWrapper>
  );
};

export default GuessPerWord;
