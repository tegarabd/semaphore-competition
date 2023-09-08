import { Typography } from "@suid/material";
import { Component } from "solid-js";

const H1: Component<{ children: string }> = (props) => (
  <Typography
    variant="h3"
    component="h1"
    fontWeight="600"
    letterSpacing={-1.5}
    mb={2}
  >
    {props.children}
  </Typography>
);

export default H1;
