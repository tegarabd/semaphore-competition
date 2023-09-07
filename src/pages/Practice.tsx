import { Typography, Fab, Box } from "@suid/material";
import { Component, createSignal } from "solid-js";
import GuessWord from "../components/semaphore/GuessWord";
import VisibilityIcon from "@suid/icons-material/Visibility";
import GuessWordForm from "../components/semaphore/GuessWordForm";

const Practice: Component = () => {
  const [open, setOpen] = createSignal(false);

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleOnOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Box position="relative" height="max(calc(100dvh - 7rem), 100%)">
        <Typography variant="h3" component="h1" fontWeight="bold" mb={2}>
          Learn
        </Typography>
        <GuessWord />
        <GuessWordForm open={open()} onClose={handleOnClose} />
        <Fab
          onClick={handleOnOpen}
          variant="extended"
          color="secondary"
          sx={{
            fontWeight: "bold",
            position: "absolute",
            right: "1rem",
            bottom: "1rem",
          }}
        >
          <VisibilityIcon sx={{ mr: 1 }} />
          Cheat Sheet
        </Fab>
      </Box>
    </>
  );
};

export default Practice;
