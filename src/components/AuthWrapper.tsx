import { A } from "@solidjs/router";
import type { Component, JSX } from "solid-js";

const AuthWrapper: Component<{ title: string; children: JSX.Element }> = ({
  title,
  children,
}) => {
  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900 relative isolate overflow-hidden h-[100dvh] h-[100vh]">
        <div class="absolute -z-10 bg-[url('/src/assets/semaphore.png')] bg-[length:150px_150px] -top-1/2 -left-1/2 rotate-12 w-[200%] h-[200%] opacity-20"></div>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <A
            href="/"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              class="w-8 h-8 mr-2"
              src="/src/assets/semaphore.png"
              alt="logo"
            />
            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              Semaphore
            </span>
          </A>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {title}
              </h1>
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthWrapper;
