import { Component, For, onMount } from "solid-js";

import StickMan from "./StickMan";
import { initFlowbite } from "flowbite";
import { ALPHABET } from "../../lib/constant";

const CheatSheet: Component = () => {
  onMount(() => {
    initFlowbite();
  });

  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
      <h2 id="accordion-flush-heading-1">
        <button
          type="button"
          class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
        >
          <span>Cheat Sheet</span>
          <svg
            data-accordion-icon
            class="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        class="hidden"
        aria-labelledby="accordion-flush-heading-1"
      >
        <div class="py-5 border-b border-gray-200 dark:border-gray-700">
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
        </div>
      </div>
    </div>
  );
};

export default CheatSheet;
