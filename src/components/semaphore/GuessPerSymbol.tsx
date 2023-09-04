import { Component, Show, createSignal } from "solid-js";
import { getRandomAlphabet } from "../../lib/utils";
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
              <svg
                class="w-10 h-10 lg:w-12 lg:h-12 text-green-600 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
              </svg>
            </Show>
            <Show
              when={
                guess() !== "" &&
                guess().toUpperCase() !== symbol().toUpperCase()
              }
            >
              <svg
                class="w-10 h-10 lg:w-12 lg:h-12 text-red-600 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M11.955 2.117h-.114C9.732 1.535 6.941.5 4.356.5c-1.4 0-1.592.526-1.879 1.316l-2.355 7A2 2 0 0 0 2 11.5h3.956L4.4 16a1.779 1.779 0 0 0 3.332 1.061 24.8 24.8 0 0 1 4.226-5.36l-.003-9.584ZM15 11h2a1 1 0 0 0 1-1V2a2 2 0 1 0-4 0v8a1 1 0 0 0 1 1Z" />
              </svg>
            </Show>
          </div>
        </div>
      </div>
    </GuessWrapper>
  );
};

export default GuessPerSymbol;
