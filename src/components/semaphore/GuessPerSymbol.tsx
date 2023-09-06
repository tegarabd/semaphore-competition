import { Component, Show, createSignal } from "solid-js";
import { getRandomAlphabet } from "../../lib/utils";
import { FaSolidCircleCheck, FaSolidCircleXmark } from "solid-icons/fa";
import GuessWrapper from "./GuessWrapper";

const GuessPerSymbol: Component = () => {
  const [guess, setGuess] = createSignal("");
  const [symbol, setSymbol] = createSignal(getRandomAlphabet());

  return (
    <GuessWrapper symbol={symbol()}>
      <div class="flex flex-col items-center gap-4">
        <h2 class="text-center mb-2 text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-none text-gray-900  dark:text-white">
          Guess the letter
        </h2>
        <div class="flex md:w-44 lg:w-52 gap-4 items-center">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setGuess("");
              setSymbol(getRandomAlphabet());
            }}
          >
            <input
              value={guess()}
              onInput={(event) =>
                setGuess(event.currentTarget.value.toUpperCase())
              }
              maxLength={1}
              placeholder="A"
              class="placeholder-gray-200 block w-20 lg:w-24 text-center py-2.5 px-0 text-5xl md:text-6xl lg:text-8xl font-medium text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </form>
          <div class="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-8 translate-y-2 border-gray-400 flex justify-center items-center">
            <Show when={guess().toUpperCase() === symbol().toUpperCase()}>
              <FaSolidCircleCheck class="w-10 h-10 lg:w-12 lg:h-12 text-green-600 fill-green-600 dark:text-white" />
            </Show>
            <Show
              when={
                guess() !== "" &&
                guess().toUpperCase() !== symbol().toUpperCase()
              }
            >
              <FaSolidCircleXmark class="w-10 h-10 lg:w-12 lg:h-12 text-red-600 fill-red-600 dark:text-white" />
            </Show>
          </div>
        </div>
      </div>
    </GuessWrapper>
  );
};

export default GuessPerSymbol;
