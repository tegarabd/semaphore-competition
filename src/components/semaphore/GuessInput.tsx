import CancelIcon from "@suid/icons-material/Cancel";
import CheckCircleIcon from "@suid/icons-material/CheckCircle";
import KeyboardDoubleArrowRightIcon from "@suid/icons-material/KeyboardDoubleArrowRight";
import { Button, Paper, Stack, TextField, Typography } from "@suid/material";
import { Component, Show } from "solid-js";
import H2 from "../typography/H2";

type GuessInputType =
  | {
      title: string;
      onSubmit: (
        event: Event & {
          submitter: HTMLElement;
        } & {
          currentTarget: HTMLFormElement;
          target: Element;
        }
      ) => void;
      onChange: (
        event: Event & {
          currentTarget: HTMLInputElement;
          target: HTMLInputElement;
        }
      ) => void;
      value: string;
      type: "word";
      correct?: boolean;
      disabled?: boolean;
    }
  | {
      title: string;
      onSubmit: (
        event: Event & {
          submitter: HTMLElement;
        } & {
          currentTarget: HTMLFormElement;
          target: Element;
        }
      ) => void;
      onChange: (
        event: Event & {
          currentTarget: HTMLInputElement;
          target: HTMLInputElement;
        }
      ) => void;
      value: string;
      type: "symbol";
      correct: boolean;
      disabled?: boolean;
    };

const GuessInput: Component<GuessInputType> = (props) => {
  const blank = () => props.value === "";
  const symbolType = () => props.type === "symbol";

  const inputSize = () => ({
    xl: "3.5rem",
    md: "3rem",
    xs: "2.5rem",
  });

  const fontSize = () => ({
    xs: "1rem",
    md: "1.4rem",
    xl: "1.75rem",
  });

  return (
    <>
      <Stack
        component={Paper}
        spacing={2}
        alignItems="center"
        sx={{
          p: 4,
        }}
      >
        <H2>{props.title}</H2>
        <Stack
          component="form"
          onSubmit={props.onSubmit}
          direction="row"
          justifyContent="center"
          spacing={2}
        >
          <TextField
            variant="outlined"
            inputProps={{
              maxLength: symbolType() ? 1 : undefined,
              value: props.value,
              onChange: props.onChange,
            }}
            sx={{
              width: symbolType()
                ? inputSize()
                : `calc(100% - ${inputSize().xl})`,
              textAlign: "center",
              ".MuiInputBase-input": {
                fontSize: fontSize(),
                textAlign: symbolType() ? "center" : "left",
                py: 1,
              },
            }}
          />
          <Show when={symbolType()}>
            <Paper
              sx={{
                width: inputSize(),
                height: inputSize(),
                display: "grid",
                placeItems: "center",
              }}
              variant="outlined"
            >
              <Show when={!blank()}>
                <Show when={props.correct}>
                  <CheckCircleIcon
                    color="success"
                    sx={{
                      width: inputSize(),
                      height: inputSize(),
                    }}
                  />
                </Show>
                <Show when={!props.correct}>
                  <CancelIcon
                    color="error"
                    sx={{
                      width: inputSize(),
                      height: inputSize(),
                    }}
                  />
                </Show>
              </Show>
            </Paper>
          </Show>
          <Button
            type="submit"
            variant="contained"
            disabled={
              props.disabled || blank() || (symbolType() && !props.correct)
            }
            sx={{
              width: inputSize(),
              height: inputSize(),
              minWidth: 0,
            }}
          >
            <KeyboardDoubleArrowRightIcon
              sx={{
                width: "80%",
                height: "80%",
              }}
            />
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default GuessInput;
