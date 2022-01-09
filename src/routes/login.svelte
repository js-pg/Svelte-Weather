<script>
  import { classToAll } from "./functions.svelte";
  import { getLocalStorage, setLocalStorage } from "./localStorage.svelte";
  import { darkToggle } from "./functions.svelte";
  import { onMount } from "svelte";
  import { message } from "./functions.svelte";

  document.title = "Summit Notes | Home";
  let url = window.location.href
    .replace(/\/$/, "")
    .replace("http://", "")
    .replace("https://", "");
  //get the url without the domain name

  let darkContainer;
  let ready = false;

  onMount(() => {
    classToAll("dark:text-white");
    classToAll("transition-all");
    classToAll("monospace");
    if (getLocalStorage("dark") == null) {
      setLocalStorage("dark", false);
    }
    if (getLocalStorage("dark") == "true") {
      darkContainer.classList.add("dark");
    } else {
      darkContainer.classList.remove("dark");
    }
    ready = true;
    message();
    document.title = "Summit Notes | Login";
  });
</script>

<div id="darkContainer" bind:this={darkContainer} class="dark">
  <div
    class="h-screen w-screen center flex-col relative dark:bg-gray-950 max-w-screen overflow-hidden"
  >
    {#if ready == true}
      <button
        on:click={() => {
          darkToggle(darkContainer);
        }}
        type="button"
        class="monospace text-sm absolute top-0 left-0 m-3 font-bold px-3 py-2 rounded-xl transition-colors dark:bg-gray-950 dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:text-white hover:bg-black hover:text-white"
        >Toggle Dark</button
      >
      <div
        class="shadow-light p-6 rounded-lg bg-gray-100 border-1 border-gray-300 dark:bg-gray-950 center flex-col"
      >
        <h1 class="text-3xl monospace font-bold">
          Summit Notes | <span class="font-black">Login</span>
        </h1>
        <button
          type="button"
          class="monospace center font-bold text-sm mb-4 mt-6 px-5 py-3 rounded-xl transition-colors dark:bg-gray-950 dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:text-white hover:bg-black hover:text-white"
        >
          <svg
            class="mr-3 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            ><path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            /></svg
          >
          Sign in with Google</button
        >
        <p>Or:</p>
        <div class="w-full mb-6">
          <div class=" w-full my-4">
            <p class="monospace">Email:</p>
            <input
              class="w-full monospace dark:text-gray-950 rounded-md"
              placeholder="Email"
              type="text"
            />
          </div>
          <div class=" w-full my-4">
            <p class="monospace">Password:</p>
            <input
              class="w-full monospace dark:text-gray-950 rounded-md"
              placeholder="Password"
              type="text"
            />
          </div>
          <button
            on:click={() => {
              darkToggle(darkContainer);
            }}
            type="button"
            class="monospace text-sm top-0 left-0 m-3 font-bold px-3 py-2 rounded-xl transition-colors bg-gray-950 dark:bg-white text-white hover:bg-white hover:text-black hover:text-white dark:hover:bg-black dark:hover:text-white dark:bg-white dark:hover:text-black dark:text-gray-950 dark:hover:text-gray-100"
            >Log In</button
          >
        </div>
      </div>
    {:else}
      <h1 class="text-7xl font-bold monospace uppercase">
        There was an error loading. Try refreshing.
      </h1>
    {/if}
  </div>
</div>
