import { Component, createEffect, on } from "solid-js";
import SemaphoreFlag from "./SemaphoreFlag";
import { SEMAPHORE_SIGNAL } from "../../lib/semaphore";

const STICKMAN_SIZE = {
  xs: {
    outerSpace: "h-[7.1rem] w-[8rem]",
    headSize: "w-4 h-4",
    headSpace: "mb-[1px]",
    bodyWidth: "w-6",
    bodyHeight: "h-8",
    handAndLegSize: "w-2 h-8",
    flagOffset: "translate-y-4",
    bodyOffset: "translate-y-[2rem]",
  },
  sm: {
    outerSpace: "h-[14.3rem] w-[16rem]",
    headSize: "w-8 h-8",
    headSpace: "mb-0.5",
    bodyWidth: "w-12",
    bodyHeight: "h-16",
    handAndLegSize: "w-4 h-16",
    flagOffset: "translate-y-8",
    bodyOffset: "translate-y-[4.1rem]",
  },
  md: {
    outerSpace: "h-[28.5rem] w-[31.8rem]",
    headSize: "w-16 h-16",
    headSpace: "mb-1",
    bodyWidth: "w-24",
    bodyHeight: "h-32",
    handAndLegSize: "w-8 h-32",
    flagOffset: "translate-y-16",
    bodyOffset: "translate-y-[8.2rem]",
  },
  lg: {
    outerSpace: "h-[42.8rem] w-[47.5rem]",
    headSize: "w-24 h-24",
    headSpace: "mb-1.5",
    bodyWidth: "w-36",
    bodyHeight: "h-48",
    handAndLegSize: "w-12 h-48",
    flagOffset: "translate-y-24",
    bodyOffset: "translate-y-[12.3rem]",
  },
};

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

  const handRotationLeft = () => SEMAPHORE_SIGNAL[props.symbol].left.rotation;
  const flagFlipLeft = () => SEMAPHORE_SIGNAL[props.symbol].left.flip;
  const handRotationRight = () => SEMAPHORE_SIGNAL[props.symbol].right.rotation;
  const flagFlipRight = () => SEMAPHORE_SIGNAL[props.symbol].right.flip;

  return (
    <div class={`${outerSpace()}`}>
      <div class={`flex flex-col items-center ${bodyOffset()}`}>
        <div
          class={`${headSize()} rounded-full bg-gray-900 ${headSpace()}`}
        ></div>
        <div
          class={`relative ${bodyWidth()} ${bodyHeight()} bg-gray-900 rounded-t-[25%]`}
        >
          <div
            class={`absolute ${handAndLegSize()} transition-all duration-500 bg-gray-900 rounded-[100vw] left-0 origin-[50%_10%] ${handRotationLeft()} flex justify-center`}
          >
            <div
              class={`absolute -scale-y-100 transition-all duration-500 ${flagOffset()} ${flagFlipLeft()}`}
            >
              <SemaphoreFlag size={props.size} />
            </div>
          </div>
          <div
            class={`absolute ${handAndLegSize()} transition-all duration-500 bg-gray-900 rounded-[100vw] right-0 origin-[50%_10%] ${handRotationRight()} flex justify-center`}
          >
            <div
              class={`absolute rotate-180 transition-all duration-500 ${flagOffset()} ${flagFlipRight()}`}
            >
              <SemaphoreFlag size={props.size} />
            </div>
          </div>
        </div>
        <div class={`${bodyWidth()} flex justify-between`}>
          <div
            class={`${handAndLegSize()} bg-gray-900 rounded-b-[100vw]`}
          ></div>
          <div
            class={`${handAndLegSize()} bg-gray-900 rounded-b-[100vw]`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StickMan;
