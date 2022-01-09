<script context="module">
  import { getLocalStorage } from "./localStorage.svelte";
  import { setLocalStorage } from "./localStorage.svelte";

  export function classToAll(className) {
    var everyElement = document.getElementsByTagName("*");
    for (var i = 0; i < everyElement.length; i++) {
      everyElement[i].classList.add(className);
    }
  }

  export function attrToAll(attrName, attrValue) {
    var everyElement = document.getElementsByTagName("*");
    for (var i = 0; i < everyElement.length; i++) {
      everyElement[i].setAttribute(attrName, attrValue);
    }
  }

  export function darkToggle(container) {
    container.classList.toggle("dark");
    if (getLocalStorage("dark") == "true") {
      setLocalStorage("dark", "false");
    } else {
      setLocalStorage("dark", "true");
    }
  }

  export function message() {
      console.log("Summit Notes was made with Svelte and TailwindCSS \n Made with ❤️ by https://github.com/js-pg");
  }
</script>
