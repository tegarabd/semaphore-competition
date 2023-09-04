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
              class="placeholder-gray-200 block w-10/12 text-center py-2.5 px-0 text-5xl md:text-6xl lg:text-8xl font-medium text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </form>
        </div>
      </div>
    </GuessWrapper>
  );
};

export default GuessPerWord;
