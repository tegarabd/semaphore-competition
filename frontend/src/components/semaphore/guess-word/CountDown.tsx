import { Component } from "solid-js";
import { useGuessWord } from "../../../context/GuessWordContext";
import { Box, Typography } from "@suid/material";

const CountDown: Component = () => {
  const { state } = useGuessWord();

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(250,250,250,0.7)",
        }}
      ></Box>
      <Typography
        sx={{
          fontSize: {
            xs: "6.4rem",
            md: "9.6rem",
            lg: "12.8rem",
            xl: "16rem",
          },
          fontWeight: "900",
          position: "absolute",
          inset: "auto",
        }}
      >
        {state().countDown}
      </Typography>
    </>
  );
};

export default CountDown;
