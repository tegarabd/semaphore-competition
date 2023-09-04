import { Component } from "solid-js";

const SEMAPHORE_SIZE = {
  xs: {
    stick: "w-0.5 h-[2.5rem]",
    redFlag: "border-t-[1.5rem] border-r-[1.5rem]",
    yellowFlag: "border-b-[1.5rem] border-l-[1.5rem]",
  },
  sm: {
    stick: "w-1 h-[5rem]",
    redFlag: "border-t-[3rem] border-r-[3rem]",
    yellowFlag: "border-b-[3rem] border-l-[3rem]",
  },
  md: {
    stick: "w-2 h-[10rem]",
    redFlag: "border-t-[6rem] border-r-[6rem]",
    yellowFlag: "border-b-[6rem] border-l-[6rem]",
  },
  lg: {
    stick: "w-3 h-[15rem]",
    redFlag: "border-t-[9rem] border-r-[9rem]",
    yellowFlag: "border-b-[9rem] border-l-[9rem]",
  },
};

const SemaphoreFlag: Component<{ size: "sm" | "md" | "lg" | "xs" }> = (
  props
) => {
  const stick = () => SEMAPHORE_SIZE[props.size].stick;
  const redFlag = () => SEMAPHORE_SIZE[props.size].redFlag;
  const yellowFlag = () => SEMAPHORE_SIZE[props.size].yellowFlag;

  return (
    <div class="flex">
      <div class={`${stick()} bg-amber-900`}></div>
      <div class="relative">
        <div
          class={`absolute w-0 h-0 border-solid ${redFlag()} border-b-0 border-l-0 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent`}
        ></div>
        <div
          class={`absolute w-0 h-0 border-solid border-t-0 border-r-0 ${yellowFlag()} border-t-transparent border-r-transparent border-b-yellow-300 border-l-transparent`}
        ></div>
      </div>
    </div>
  );
};

export default SemaphoreFlag;
