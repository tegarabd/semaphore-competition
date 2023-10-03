import VisibilityIcon from "@suid/icons-material/Visibility";
import { Button, Grid, Paper, Stack } from "@suid/material";
import { Component, createSignal } from "solid-js";
import { getRandomAlphabet } from "../../lib/utils";
import H2 from "../typography/H2";
import CheatSheet from "./CheatSheet";
import GuessInput from "./GuessInput";
import ResponsiveStickMan from "./ResponsiveStickMan";

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

  const handleOnChange = (event: { currentTarget: HTMLInputElement }) => {
    setGuess(event.currentTarget.value.toUpperCase());
  };

  const handleOnSubmit = (event: Event) => {
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
        minHeight="calc(100vh - 10rem)"
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
          <ResponsiveStickMan speed={500} symbol={symbol()} />
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
