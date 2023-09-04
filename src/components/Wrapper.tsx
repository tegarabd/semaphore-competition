import type { Component } from "solid-js";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

const Wrapper: Component = () => {
  return (
    <>
      <NavBar />
      <SideBar />
    </>
  );
};

export default Wrapper;
