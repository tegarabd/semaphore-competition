import { Typography } from "@suid/material";
import type { Component } from "solid-js";
import StickMan from "../components/semaphore/StickMan";

const Home: Component = () => {
  return (
    <>
      <Typography variant="h3" component="h1" fontWeight="bold">
        Home
      </Typography>
      <StickMan symbol="r" size="xs" />
      <StickMan symbol="r" size="sm" />
      <StickMan symbol="r" size="md" />
      <StickMan symbol="r" size="lg" />
    </>
  );
};

export default Home;
