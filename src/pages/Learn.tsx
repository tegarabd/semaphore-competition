import VisibilityIcon from "@suid/icons-material/Visibility";
import { Box, Fab, Typography } from "@suid/material";
import { Component, createSignal } from "solid-js";
import CheatSheet from "../components/semaphore/CheatSheet";
import GuessSymbol from "../components/semaphore/GuessSymbol";
import H1 from "../components/typography/H1";

const Learn: Component = () => {
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
        <H1>Learn</H1>
        <GuessSymbol />
        <CheatSheet open={open()} onClose={handleOnClose} />
        <Fab
          onClick={handleOnOpen}
          variant="extended"
          color="secondary"
          sx={{
            position: "absolute",
            right: "1rem",
            bottom: "1rem",
          }}
        >
          <VisibilityIcon sx={{ mr: 1 }} />
          <Typography
            variant="body1"
            textTransform="capitalize"
            fontWeight="600"
            letterSpacing={0.5}
          >
            Cheat Sheet
          </Typography>
        </Fab>
      </Box>
    </>
  );
};

export default Learn;
