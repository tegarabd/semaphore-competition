import { onMount, type Component } from "solid-js";
import H1 from "../components/typography/H1";
import { io } from "socket.io-client";

const Competition: Component = () => {



  onMount(() => {
    const socket = io("http://localhost:3001")

    socket.on("connect", () => {
      console.log("Connect")
    })
  })

  return <H1>Competition</H1>;
};

export default Competition;
