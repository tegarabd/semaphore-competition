import { Typography } from "@suid/material";
import { Component } from "solid-js";
import CheatSheet from "../components/semaphore/CheatSheet";
import GuessPerSymbol from "../components/semaphore/GuessPerSymbol";

const Learn: Component = () => {
  return (
    <>
      <Typography variant="h3" component="h1" fontWeight="bold">
        Learn
      </Typography>
      <GuessPerSymbol />
      <CheatSheet />
    </>
  );
};

export default Learn;
