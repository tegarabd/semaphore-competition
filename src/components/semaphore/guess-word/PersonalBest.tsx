import { Paper, Stack, Typography } from "@suid/material";
import { Component, Show } from "solid-js";
import { useGuessWord } from "../../../context/GuessWordContext";
import H1 from "../../typography/H1";
import H2 from "../../typography/H2";

const PersonalBest: Component = () => {
  const { personalBest } = useGuessWord();

  return (
    <Paper>
      <Stack alignItems="center" p={4} spacing={3}>
        <H2>Personal Best</H2>
        <Show
          when={personalBest().bestCorrectStreak || personalBest().bestSpeed}
        >
          <H1>{personalBest()?.bestCorrectStreak}</H1>
          <Typography>{personalBest()?.bestSpeed} Signals/Second</Typography>
        </Show>
        <Show
          when={!personalBest().bestCorrectStreak && !personalBest().bestSpeed}
        >
          <Typography>No Personal Best yet</Typography>
        </Show>
      </Stack>
    </Paper>
  );
};

export default PersonalBest;
