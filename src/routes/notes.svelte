<script>
  import { getLocalStorage, setLocalStorage } from "./localStorage.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { notes } from "./noteContent.svelte";
  import NoteDisplay from "./components/NoteDisplay.svelte";
  import { message, darkToggle, classToAll } from "./functions.svelte";
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
      <NoteDisplay />
    {:else}
      <h1 class="text-7xl font-bold monospace uppercase">
        There was an error loading. Try refreshing.
      </h1>
    {/if}
  </div>
</div>
