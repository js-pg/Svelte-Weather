<script>
  import { classToAll } from "./functions.svelte";
  import { getLocalStorage, setLocalStorage } from "./localStorage.svelte";
  import { darkToggle } from "./functions.svelte";
  import { onMount } from "svelte";

  document.title = "Page not found";
  let url = window.location.href
    .replace(/\/$/, "")
    .replace("http://", "")
    .replace("https://", "");
  //get the url without the domain name
  let url_array = url.split("/");
  url = "/" + url_array[url_array.length - 1];

  let darkContainer;

  onMount(() => {
    classToAll("dark:text-white");
    classToAll("transition-all");
    if (getLocalStorage("dark") == null) {
      setLocalStorage("dark", false);
    }
    if (getLocalStorage("dark") == "true") {
      darkContainer.classList.add("dark");
      console.log("dark");
    } else {
      darkContainer.classList.remove("dark");
      console.log("light");
    }
  });
</script>

<div id="darkContainer" bind:this={darkContainer} class="dark">
  <div class="h-screen w-screen center relative dark:bg-gray-950">
    <button
      on:click={darkToggle(darkContainer)}
      type="button"
      class="monospace dark:shadow-white-sh shadow-md text-center absolute top-0 left-0 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 m-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
      >Toggle Dark
      <span class="material-icons relative align-middle max-h-full text-base text-blue-700 dark:text-blue-700 hover:">
        light_mode
      </span>
    </button>

    <div class="max-w-screen m-16 selection:bg-gray-600 selection:text-white dark:shadow-white-sh shadow-xl p-8 rounded-2xl">
      <a class="text-xl dark:text-blue-500 monospace" href="/"
        >Back to Home<span
          class="material-icons mx-1 align-middle text-inherit font-thin select-none -rotate-45 dark:text-blue-500"
          >link</span
        >
      </a>
      <p class="text-sm monospace mt-4 text-gray-600 dark:text-gray-500">
        Error 404:
      </p>
      <h1 class="text-2xl monospace text-gray-700 dark:text-gray-300">
        The URL <span class="italic text-black dark:text-white">...{url}</span> was
        not found.
      </h1>
    </div>
  </div>
</div>

<style>
</style>
