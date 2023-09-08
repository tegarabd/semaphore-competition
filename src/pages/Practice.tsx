import { Box } from "@suid/material";
import { Component } from "solid-js";
import GuessWord from "../components/semaphore/GuessWord";
import H1 from "../components/typography/H1";

const Practice: Component = () => {
  return (
    <>
      <Box position="relative" height="max(calc(100dvh - 7rem), 100%)">
        <H1>Practice</H1>
        <GuessWord />
      </Box>
    </>
  );
};

export default Practice;
