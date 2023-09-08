import CancelIcon from "@suid/icons-material/Cancel";
import CheckCircleIcon from "@suid/icons-material/CheckCircle";
import KeyboardDoubleArrowRightIcon from "@suid/icons-material/KeyboardDoubleArrowRight";
import { Button, Paper, Stack, TextField, Typography } from "@suid/material";
import { Component, Show } from "solid-js";

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
    };

const GuessInput: Component<GuessInputType> = (props) => {
  const blank = () => props.value === "";
  const symbolType = () => props.type === "symbol";

  const inputSize = () => ({
    xl: "7rem",
    md: "6rem",
    xs: "5rem",
  });

  const fontSize = () => ({
    xs: "2rem",
    md: "2.8rem",
    xl: "3.5rem",
  });

  return (
    <>
      <Stack
        component={Paper}
        variant="outlined"
        spacing={2}
        alignItems="center"
        sx={{
          flexGrow: 1,
          p: 4,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="lighter"
          letterSpacing={-1}
          align="center"
        >
          {props.title}
        </Typography>
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
              width: symbolType() ? inputSize() : "calc(100% - 8rem)",
              textAlign: "center",
              ".MuiInputBase-input": {
                fontSize: fontSize(),
                textAlign: "center",
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
            disabled={blank() || (symbolType() && !props.correct)}
            sx={{
              width: inputSize(),
              height: inputSize(),
              borderRadius: "50%",
            }}
          >
            <KeyboardDoubleArrowRightIcon
              sx={{
                width: "6rem",
                height: "6rem",
              }}
            />
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default GuessInput;
