import { Typography } from "@suid/material";
import { Component } from "solid-js";
import GuessPerWord from "../components/semaphore/GuessPerWord";

const Practice: Component = () => {
  return (
    <>
      <Typography variant="h3" component="h1" fontWeight="bold">
        Practice
      </Typography>
      <GuessPerWord />
    </>
  );
};

export default Practice;
