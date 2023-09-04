import { Component, JSX, createSignal } from "solid-js";
import StickMan from "./StickMan";
import { WINDOW_SIZE } from "../../lib/constant";
import { useWindowSize } from "solidjs-hooks";

const GuessWrapper: Component<{ children: JSX.Element; symbol: string }> = (
  props
) => {
  const { width } = useWindowSize();

  const stickManSize = () => {
    if (width() >= WINDOW_SIZE["2xl"]) {
      return "lg";
    }

    if (width() >= WINDOW_SIZE["md"]) {
      return "md";
    }

    return "sm";
  };

  return (
    <div class="grid grid-cols-1 min-[1370px]:grid-cols-2 gap-4 place-items-center">
      <StickMan size={stickManSize()} symbol={props.symbol} />
      {props.children}
    </div>
  );
};

export default GuessWrapper;
