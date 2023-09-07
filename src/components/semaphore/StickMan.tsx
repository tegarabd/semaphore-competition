import { Box } from "@suid/material";
import { Component } from "solid-js";
import SemaphoreFlag from "./SemaphoreFlag";
import { blueGrey } from "@suid/material/colors";
import { SEMAPHORE_SIGNAL, STICKMAN_SIZE } from "../../lib/semaphore";

const StickMan: Component<{
  size: "sm" | "md" | "lg" | "xs";
  symbol: string;
}> = (props) => {
  const outerSpace = () => STICKMAN_SIZE[props.size].outerSpace;
  const headSize = () => STICKMAN_SIZE[props.size].headSize;
  const headSpace = () => STICKMAN_SIZE[props.size].headSpace;
  const bodyWidth = () => STICKMAN_SIZE[props.size].bodyWidth;
  const bodyHeight = () => STICKMAN_SIZE[props.size].bodyHeight;
  const handAndLegSize = () => STICKMAN_SIZE[props.size].handAndLegSize;
  const flagOffset = () => STICKMAN_SIZE[props.size].flagOffset;
  const bodyOffset = () => STICKMAN_SIZE[props.size].bodyOffset;

  const leftHandRotation = () => SEMAPHORE_SIGNAL[props.symbol].left.rotation;
  const leftFlagFlip = () => SEMAPHORE_SIGNAL[props.symbol].left.flip;
  const rightHandRotation = () => SEMAPHORE_SIGNAL[props.symbol].right.rotation;
  const rightFlagFlip = () => SEMAPHORE_SIGNAL[props.symbol].right.flip;

  return (
    <Box
      sx={{
        ...outerSpace(),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...bodyOffset(),
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            backgroundColor: blueGrey[900],
            ...headSize(),
            ...headSpace(),
          }}
        ></Box>
        <Box
          sx={{
            position: "relative",
            backgroundColor: blueGrey[900],
            borderTopLeftRadius: "25%",
            borderTopRightRadius: "25%",
            ...bodyWidth(),
            ...bodyHeight(),
          }}
        >
          <Box
            sx={{
              position: "absolute",
              transition: "all 500ms",
              backgroundColor: blueGrey[900],
              borderRadius: "100vw",
              left: 0,
              transformOrigin: "50% 10%",
              display: "flex",
              justifyContent: "center",
              transform: leftHandRotation(),
              ...handAndLegSize(),
            }}
          >
            <Box
              sx={{
                position: "absolute",
                transform: `scaleY(-100%) ${flagOffset()} ${leftFlagFlip()}`,
                transition: "all 500ms",
              }}
            >
              <SemaphoreFlag size={props.size} />
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              transition: "all 500ms",
              backgroundColor: blueGrey[900],
              borderRadius: "100vw",
              right: 0,
              transformOrigin: "50% 10%",
              display: "flex",
              justifyContent: "center",
              transform: rightHandRotation(),
              ...handAndLegSize(),
            }}
          >
            <Box
              sx={{
                position: "absolute",
                transform: `scaleY(-100%) ${flagOffset()} ${rightFlagFlip()}`,
                transition: "all 500ms",
              }}
            >
              <SemaphoreFlag size={props.size} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            ...bodyWidth(),
          }}
        >
          <Box
            sx={{
              backgroundColor: blueGrey[900],
              borderBottomLeftRadius: "100vw",
              borderBottomRightRadius: "100vw",
              ...handAndLegSize(),
            }}
          ></Box>
          <Box
            sx={{
              backgroundColor: blueGrey[900],
              borderBottomLeftRadius: "100vw",
              borderBottomRightRadius: "100vw",
              ...handAndLegSize(),
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StickMan;
