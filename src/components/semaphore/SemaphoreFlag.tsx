import { Component } from "solid-js";
import { Box } from "@suid/material";
import { brown, red, yellow } from "@suid/material/colors";
import { SEMAPHORE_SIZE } from "../../lib/semaphore";

const SemaphoreFlag: Component<{ size: "sm" | "md" | "lg" | "xs" }> = (
  props
) => {
  const stick = () => SEMAPHORE_SIZE[props.size].stick;
  const redFlag = () => SEMAPHORE_SIZE[props.size].redFlag;
  const yellowFlag = () => SEMAPHORE_SIZE[props.size].yellowFlag;

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          backgroundColor: brown[700],
          borderRadius: "100vw",
          ...stick(),
        }}
      ></Box>
      <Box sx={{ position: "relative", transform: "translateY(2.5%)" }}>
        <Box
          sx={{
            position: "absolute",
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderTopColor: red[700],
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
            ...redFlag(),
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderRightWidth: 0,
            borderTopWidth: 0,
            borderTopColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: yellow[600],
            borderLeftColor: "transparent",
            ...yellowFlag(),
          }}
          class={`absolute w-0 h-0 border-solid border-t-0 border-r-0 ${yellowFlag()} border-t-transparent border-r-transparent border-b-yellow-300 border-l-transparent`}
        ></Box>
      </Box>
    </Box>
  );
};

export default SemaphoreFlag;
