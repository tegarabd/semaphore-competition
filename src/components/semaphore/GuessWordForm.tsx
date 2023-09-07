import { Component, createSignal } from "solid-js";
import { Modal, Stack, Typography } from "@suid/material";

const GuessWordForm: Component = () => {
  const [open, setOpen] = createSignal(true);

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleOnOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Modal
        open={open()}
        onClose={handleOnClose}
        sx={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Stack
          sx={{
            backgroundColor: "background.default",
            p: 2,
          }}
        >
          <Typography variant="h2">Start Practice</Typography>
        </Stack>
      </Modal>
    </>
  );
};

export default GuessWordForm;
