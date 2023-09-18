import { Paper, Stack } from "@suid/material";
import { Component } from "solid-js";
import { useGuessWord } from "../../../context/GuessWordContext";
import H1 from "../../typography/H1";
import H2 from "../../typography/H2";

const CorrectStreak: Component = () => {
  const { correctStreak } = useGuessWord();

  return (
    <Paper>
      <Stack alignItems="center" p={4} spacing={3}>
        <H2>Correct Streak</H2>
        <H1>{correctStreak()}</H1>
      </Stack>
    </Paper>
  );
};

export default CorrectStreak;
