import { Typography } from "@suid/material";
import { Component } from "solid-js";

const H2: Component<{ children: string }> = (props) => {
  return (
    <Typography
      variant="h4"
      component="h2"
      fontWeight="lighter"
      letterSpacing={-1}
      align="center"
    >
      {props.children}
    </Typography>
  );
};

export default H2;
