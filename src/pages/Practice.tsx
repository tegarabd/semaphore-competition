import { Component } from "solid-js";
import GuessPerWord from "../components/semaphore/GuessPerWord";

const Practice: Component = () => {
  return (
    <>
      <h1 class="mb-2 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Practice
      </h1>
      <GuessPerWord />
    </>
  );
};

export default Practice;
