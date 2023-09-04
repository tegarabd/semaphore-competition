import { A, useNavigate } from "@solidjs/router";
import { onMount, type Component, Show } from "solid-js";
import { useUser } from "../context/UserContext";
import { initFlowbite } from "flowbite";

const NavBar: Component = () => {
  const { getCurrentUser, getUserAvatarUrl, logout } = useUser();
  const navigate = useNavigate();
  const signout = () => {
    logout();
    navigate("/auth/login");
  };

  onMount(() => {
    initFlowbite();
  });

  return (
    <>
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <A href="/" class="flex ml-2 md:mr-24">
                <img
                  class="w-8 h-8 mr-2"
                  src="/src/assets/semaphore.png"
                  alt="logo"
                />
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Semaphore
                </span>
              </A>
            </div>
            <div class="flex items-center">
              <Show when={getCurrentUser()}>
                <div class="flex items-center ml-3">
                  <div>
                    <button
                      type="button"
                      class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                    >
                      <span class="sr-only">Open user menu</span>
                      <img
                        class="w-8 h-8 rounded-full object-cover"
                        src={getUserAvatarUrl()}
                        alt="user photo"
                      />
                    </button>
                  </div>
                  <div
                    class="min-w-[16rem] z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div class="px-4 py-3" role="none">
                      <p
                        class="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        {getCurrentUser()?.username}
                      </p>
                      <p
                        class="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        {getCurrentUser()?.name}
                      </p>
                      <p
                        class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        {getCurrentUser()?.email}
                      </p>
                    </div>
                    <ul class="py-1" role="none">
                      <li>
                        <button
                          onClick={signout}
                          class="block w-full px-4 py-2 text-sm text-start text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </Show>

              <Show when={!getCurrentUser()}>
                <A
                  href="/auth/login"
                  type="button"
                  class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign In
                </A>
              </Show>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
