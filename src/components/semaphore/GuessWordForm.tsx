import { Component, createSignal } from "solid-js";
import { Modal, Stack, Typography } from "@suid/material";

const GuessWordForm: Component<{ open: boolean; onClose: VoidFunction }> = (
  props
) => {
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.onClose}
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
