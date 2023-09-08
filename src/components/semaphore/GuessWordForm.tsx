import { Component } from "solid-js";
import { Paper, Stack, Typography } from "@suid/material";
import { TextInput } from "../input/TextInput";

const GuessWordForm: Component = () => {
  return (
    <>
      <Stack
        component={Paper}
        variant="outlined"
        sx={{
          p: 4,
        }}
        spacing={2}
      >
        <Typography variant="h3">Start Practice</Typography>
        <TextInput label="Speed" type="numeric" pattern="[0-9]*" />
      </Stack>
    </>
  );
};

export default GuessWordForm;
