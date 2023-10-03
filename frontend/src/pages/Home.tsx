import type { Component } from "solid-js";
import StickMan from "../components/semaphore/StickMan";
import H1 from "../components/typography/H1";

const Home: Component = () => {
  return (
    <>
      <H1>Home</H1>
      <StickMan symbol="r" size="xs" />
      <StickMan symbol="r" size="sm" />
      <StickMan symbol="r" size="md" />
      <StickMan symbol="r" size="lg" />
    </>
  );
};

export default Home;
