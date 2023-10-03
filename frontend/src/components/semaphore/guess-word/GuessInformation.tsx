import { Component, Show } from "solid-js";
import { useGuessWord } from "../../../context/GuessWordContext";
import { Button, Stack, Typography } from "@suid/material";
import H1 from "../../typography/H1";
import H2 from "../../typography/H2";
import CancelIcon from "@suid/icons-material/Cancel";
import CheckCircleIcon from "@suid/icons-material/CheckCircle";
import ErrorIcon from "@suid/icons-material/Error";

const GuessInformation: Component = () => {
  const { correct, state, resetPractice } = useGuessWord();

  const iconSize = () => ({
    width: "6rem",
    height: "6rem",
  });

  return (
    <Stack spacing={3} p={4} alignItems="center">
      <H2>Guess Information</H2>

      <Show when={state().resultShow}>
        <Typography>
          <Show when={correct()}>
            <CheckCircleIcon color="success" sx={iconSize()} />
          </Show>
          <Show when={!correct()}>
            <CancelIcon color="error" sx={iconSize()} />
          </Show>
        </Typography>
        <H1
          sx={{
            wordWrap: "break-word",
            textAlign: "center",
            width: "100%",
          }}
        >
          {state().word.toUpperCase()}
        </H1>
      </Show>

      <Show when={!state().resultShow}>
        <ErrorIcon color="disabled" sx={iconSize()} />
        <H1 sx={{ opacity: 0.6 }}>{state().guessIndicator}</H1>
      </Show>

      <Button variant="outlined" onClick={resetPractice} fullWidth>
        Finish
      </Button>
    </Stack>
  );
};

export default GuessInformation;
