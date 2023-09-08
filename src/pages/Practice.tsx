import { Typography, Box } from "@suid/material";
import { Component } from "solid-js";
import GuessWord from "../components/semaphore/GuessWord";

const Practice: Component = () => {
  return (
    <>
      <Box position="relative" height="max(calc(100dvh - 7rem), 100%)">
        <Typography variant="h3" component="h1" fontWeight="bold" mb={2}>
          Practice
        </Typography>
        <GuessWord />
      </Box>
    </>
  );
};

export default Practice;
