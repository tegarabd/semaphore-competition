import { Component, For } from "solid-js";
import StickMan from "./StickMan";
import { Grid, Typography, Card, Modal } from "@suid/material";
import { ALPHABET } from "../../lib/constant";

const CheatSheet: Component<{ open: boolean; onClose: VoidFunction }> = (
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
        <Grid
          container
          columns={{ xs: 2, sm: 3, md: 5, lg: 6, xl: 10 }}
          spacing={2}
          justifyContent="center"
          sx={{
            maxWidth: "80%",
            maxHeight: "80%",
            overflow: "auto",
            backgroundColor: "background.default",
            borderRadius: "1rem",
            pr: 2,
            pb: 2,
          }}
        >
          <For each={ALPHABET.split("")}>
            {(symbol) => (
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
                xs={1}
              >
                <Card>
                  <StickMan speed={500} size="xs" symbol={symbol} />
                  <Typography
                    sx={{
                      backgroundColor: "secondary.main",
                      py: 0.5,
                    }}
                    align="center"
                    variant="body1"
                    fontWeight="bold"
                  >
                    {symbol.toUpperCase()}
                  </Typography>
                </Card>
              </Grid>
            )}
          </For>
        </Grid>
      </Modal>
    </>
  );
};

export default CheatSheet;
