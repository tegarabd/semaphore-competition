import { Button, Fab, Grid, Paper, Stack } from "@suid/material";
import { Component, createSignal } from "solid-js";
import { getRandomAlphabet } from "../../lib/utils";
import GuessInput from "./GuessInput";
import ResponsiveStickMan from "./ResponsiveStickMan";
import CheatSheet from "./CheatSheet";
import VisibilityIcon from "@suid/icons-material/Visibility";
import H2 from "../typography/H2";

const GuessSymbol: Component = () => {
  const [open, setOpen] = createSignal(false);
  const [guess, setGuess] = createSignal("");
  const [symbol, setSymbol] = createSignal(getRandomAlphabet());

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleOnOpen = () => {
    setOpen(true);
  };

  const handleOnChange = (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    setGuess(event.currentTarget.value.toUpperCase());
  };

  const handleOnSubmit = (
    event: Event & {
      submitter: HTMLElement;
    } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => {
    event.preventDefault();
    setSymbol(getRandomAlphabet());
    setGuess("");
  };

  const correct = () => guess().toUpperCase() === symbol().toUpperCase();

  return (
    <>
      <CheatSheet open={open()} onClose={handleOnClose} />
      <Grid
        spacing={3}
        container
        columns={{
          lg: 7,
        }}
      >
        <Grid
          item
          lg={3}
          flexGrow={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ResponsiveStickMan symbol={symbol()} />
        </Grid>
        <Grid item lg={2} flexGrow={1}>
          <GuessInput
            title="Guess The Letter"
            type="symbol"
            correct={correct()}
            onSubmit={handleOnSubmit}
            onChange={handleOnChange}
            value={guess()}
          />
        </Grid>
        <Grid item lg={2} flexGrow={1}>
          <Stack component={Paper} spacing={2} p={4}>
            <H2>View Cheat Sheet</H2>
            <Button
              onClick={handleOnOpen}
              variant="contained"
              endIcon={<VisibilityIcon />}
            >
              Cheat Sheet
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default GuessSymbol;
