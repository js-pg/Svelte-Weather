<svelte:head>
    <link rel="stylesheet" href=".../src/home.css">

</svelte:head>

<script>
  import { getLocalStorage, setLocalStorage } from "./localStorage.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { message, darkToggle, classToAll } from "./functions.svelte";

  document.title = "Summit Notes | Home";
  let url = window.location.href
    .replace(/\/$/, "")
    .replace("http://", "")
    .replace("https://", "");
  //get the url without the domain name
  let url_array = url.split("/");
  url = "/" + url_array[url_array.length - 1];

  let darkContainer;
  let ready = false;

  onMount(() => {
    classToAll("dark:text-white");
    classToAll("transition-all");
    classToAll("max-w-screen");
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
  });
</script>

<div id="darkContainer" bind:this={darkContainer} class="dark">
  <div class="h-screen w-screen center flex-col relative dark:bg-gray-950 max-w-screen overflow-hidden">
    {#if ready == true}
      <button
        on:click={() => {
          darkToggle(darkContainer);
        }}
        type="button"
        class="monospace text-sm absolute top-0 left-0 m-3 font-bold px-3 py-2 rounded-xl transition-colors dark:bg-gray-950 dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:text-white hover:bg-black hover:text-white"
        >Toggle Dark</button
      >
      <div class="center flex-col">
        <h1
          transition:fade={{ delay: 200, duration: 700 }}
          class="text-7xl font-bold monospace uppercase text-center"
        >
          Summit Notes
        </h1>
        <p
          transition:fade={{ delay: 600, duration: 500 }}
          class="monospace my-2 mx-2 text-center text-xl"
        >
          Create and keep complex notes.
        </p>
      </div>

      <div
        class="my-16 center flex-col"
        transition:fade={{ delay: 800, duration: 800 }}
      >
        <button
          on:click={() => {
            window.location.href = "/notes";
          }}
          type="button"
          class="monospace text-xl font-bold px-5 py-3 rounded-xl transition-colors dark:bg-gray-950 dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:text-white hover:bg-black hover:text-white"
          >Create a new note</button
        >
        <p class="text-gray-600 monospace text-base my-3 dark:text-gray-400">
          Or:
        </p>

        <button
          type="button"
          class="monospace center text-xl font-bold px-5 py-3 rounded-xl transition-colors dark:bg-gray-950 dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:text-white hover:bg-black hover:text-white"
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

        <span
          class="material-icons absolute bottom-0 right-52 text-8xl footer-mt select-none"
        >
          terrain
        </span>
        <span
          class="material-icons absolute bottom-0 left-52 text-8xl footer-mt-2 select-none"
        >
          terrain
        </span>
      </div>
    {:else}
      <h1 class="text-7xl font-bold monospace uppercase">
        There was an error loading. Try refreshing.
      </h1>
    {/if}
  </div>
</div>

<style>

</style>
