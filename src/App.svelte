<script>
	import router from "page";

	import note from "./routes/notes.svelte";
	import home from "./routes/home.svelte";
	import notFound from "./routes/notFound.svelte";
	import login from "./routes/login.svelte";


	// set default component
	let page;

	// Map routes to page. If a route is hit the current
	// reference is set to the route's component

	router("/", () => page = home);
	router("/note", () => page = note);
	router("/notes", () => page = note);
	router("/new", () => page = note);
	router("/login", () => page = login);
	router("*", () => page = notFound);


	router.start();

</script>

<svelte:component this={page}></svelte:component>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	nav a {
		padding-right: 3rem;
	}
</style>
