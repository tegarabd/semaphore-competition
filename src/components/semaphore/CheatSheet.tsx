import { Component, For, createSignal } from "solid-js";
import StickMan from "./StickMan";
import { ALPHABET } from "../../lib/constant";

const CheatSheet: Component = () => {
  const [open, setOpen] = createSignal(true);

  return (
    <div class="flex flex-wrap justify-center gap-x-1 gap-y-2">
      <For each={ALPHABET.split("")}>
        {(symbol) => (
          <div class="flex flex-col gap-1 items-center">
            <StickMan size="xs" symbol={symbol} />
            <p class="text-2xl font-medium">{symbol.toUpperCase()}</p>
          </div>
        )}
      </For>
    </div>
  );
};

export default CheatSheet;
