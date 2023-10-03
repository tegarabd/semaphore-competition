import { Component } from "solid-js";
import StickMan from "./StickMan";
import { WINDOW_SIZE } from "../../lib/constant";
import { useWindowSize } from "solidjs-hooks";

const ResponsiveStickMan: Component<{ symbol: string; speed: number }> = (
  props
) => {
  const { width } = useWindowSize();

  const stickManSize = () => {
    if (width() >= WINDOW_SIZE["xl"]) {
      return "xl";
    }

    if (width() >= WINDOW_SIZE["lg"]) {
      return "lg";
    }

    if (width() >= WINDOW_SIZE["md"]) {
      return "md";
    }

    return "sm";
  };

  return (
    <StickMan speed={props.speed} size={stickManSize()} symbol={props.symbol} />
  );
};

export default ResponsiveStickMan;
