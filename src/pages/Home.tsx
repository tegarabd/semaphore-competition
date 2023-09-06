import { Typography } from "@suid/material";
import type { Component } from "solid-js";
import SemaphoreFlag from "../components/semaphore/SemaphoreFlag";

const Home: Component = () => {
  return (
    <>
      <Typography variant="h3" component="h1" fontWeight="bold">
        Home
      </Typography>
      <SemaphoreFlag size="xs" />
      <SemaphoreFlag size="sm" />
      <SemaphoreFlag size="md" />
      <SemaphoreFlag size="lg" />
    </>
  );
};

export default Home;
