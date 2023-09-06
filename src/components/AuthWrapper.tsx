import { A } from "@solidjs/router";
import { Paper, Stack, Typography } from "@suid/material";
import type { Component, JSX } from "solid-js";

const AuthWrapper: Component<{ title: string; children: JSX.Element }> = (
  props
) => {
  return (
    <>
      <Stack
        component="main"
        spacing={4}
        sx={{
          height: "100vh",
          alignItems: "center",
          justifyContent: {
            xs: "start",
            sm: "center",
          },
        }}
      >
        <Stack alignItems="center">
          <A href="/">
            <img
              src="/src/assets/semaphore.png"
              style={{
                width: "10rem",
                height: "10rem",
              }}
            />
          </A>
          <Typography component="h1" variant="h5" align="center">
            {props.title}
          </Typography>
        </Stack>
        <Paper
          sx={{
            padding: "2rem",
            borderRadius: 2,
            width: {
              xs: "100%",
              sm: "24rem",
            },
          }}
        >
          <Stack alignItems="stretch" spacing={2}>
            {props.children}
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default AuthWrapper;
