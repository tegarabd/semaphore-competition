import { Component } from "solid-js";
import CheatSheet from "../components/semaphore/CheatSheet";
import GuessPerSymbol from "../components/semaphore/GuessPerSymbol";

const Learn: Component = () => {
  return (
    <>
      <h1 class="mb-2 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Learn
      </h1>
      <GuessPerSymbol />
      <CheatSheet />
    </>
  );
};

export default Learn;
