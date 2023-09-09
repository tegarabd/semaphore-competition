import { Box } from "@suid/material";
import { Component } from "solid-js";
import GuessSymbol from "../components/semaphore/GuessSymbol";
import H1 from "../components/typography/H1";

const Learn: Component = () => {
  return (
    <>
      <Box position="relative" height="max(calc(100dvh - 7rem), 100%)">
        <H1>Learn</H1>
        <GuessSymbol />
      </Box>
    </>
  );
};

export default Learn;
