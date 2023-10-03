import { Breakpoint, Theme, Typography } from "@suid/material";
import { SxProps } from "@suid/system";
import { Component } from "solid-js";
import { JSX } from "solid-js";

const H1: Component<{
  children: JSX.Element;
  sx?: SxProps<Theme<Breakpoint>>;
}> = (props) => (
  <Typography
    variant="h3"
    component="h1"
    fontWeight="600"
    letterSpacing={-1.5}
    mb={2}
    sx={props.sx}
  >
    {props.children}
  </Typography>
);

export default H1;
