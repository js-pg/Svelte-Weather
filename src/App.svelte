<script>
	var aLcUsamk6 = false;

	window.onresize = function () {
		if (!aLcUsamk6) {
			console.log("This site was built with Svelte and Tailwind CSS");
			aLcUsamk6 = true;
		}
	};

	document.addEventListener("DOMContentLoaded", function () {
		const resizable = function (resizer) {
			const direction =
				resizer.getAttribute("data-direction") || "horizontal";
			const prevSibling = resizer.previousElementSibling;
			const nextSibling = resizer.nextElementSibling;

			// The current position of mouse
			let x = 0;
			let y = 0;
			let prevSiblingHeight = 0;
			let prevSiblingWidth = 0;

			// Handle the mousedown event
			// that's triggered when user drags the resizer
			const mouseDownHandler = function (e) {
				// Get the current mouse position
				x = e.clientX;
				y = e.clientY;
				const rect = prevSibling.getBoundingClientRect();
				prevSiblingHeight = rect.height;
				prevSiblingWidth = rect.width;

				// Attach the listeners to `document`
				document.addEventListener("mousemove", mouseMoveHandler);
				document.addEventListener("mouseup", mouseUpHandler);
			};

			const mouseMoveHandler = function (e) {
				// How far the mouse has been moved
				const dx = e.clientX - x;
				const dy = e.clientY - y;

				switch (direction) {
					case "vertical":
						const h =
							((prevSiblingHeight + dy) * 100) /
							resizer.parentNode.getBoundingClientRect().height;
						prevSibling.style.height = `${h}%`;
						break;
					case "horizontal":
					default:
						const w =
							((prevSiblingWidth + dx) * 100) /
							resizer.parentNode.getBoundingClientRect().width;
						prevSibling.style.width = `${w}%`;
						break;
				}

				const cursor =
					direction === "horizontal" ? "col-resize" : "row-resize";
				resizer.style.cursor = cursor;
				document.body.style.cursor = cursor;

				prevSibling.style.userSelect = "none";
				prevSibling.style.pointerEvents = "none";

				nextSibling.style.userSelect = "none";
				nextSibling.style.pointerEvents = "none";
			};

			const mouseUpHandler = function () {
				resizer.style.removeProperty("cursor");
				document.body.style.removeProperty("cursor");

				prevSibling.style.removeProperty("user-select");
				prevSibling.style.removeProperty("pointer-events");

				nextSibling.style.removeProperty("user-select");
				nextSibling.style.removeProperty("pointer-events");

				// Remove the handlers of `mousemove` and `mouseup`
				document.removeEventListener("mousemove", mouseMoveHandler);
				document.removeEventListener("mouseup", mouseUpHandler);
			};

			// Attach the handler
			resizer.addEventListener("mousedown", mouseDownHandler);
		};

		// Query all resizers
		document.querySelectorAll(".resizer").forEach(function (ele) {
			resizable(ele);
		});
	});

	let iscalled;

	async function getWeather(city, unit) {
		var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=7af0645f81d36888c9fca585b6611eb4`;

		iscalled = true;
		let response = await fetch(url);
		let data = await response.json();
		return data;
	}

	let city = "";
	let unit = {
		full: "imperial",
		short: "F",
	};
	let temp = "";

	const promise = getWeather("London", unit.full);

	getWeather("London", unit.full)
		.then(function (data) {
			console.log(data);
			city = data.name;
			temp = data.main.temp;
		})
		.catch(function (error) {
			console.log(error);
		});

	//function to get the time in a certain city
		
</script>

<main class="m-0 p-0">
	<div class="resize-contain h-screen w-full">
		<div
			class="container__left"
			style="background-image: linear-gradient(rgb(56, 189, 248), rgb(186, 230, 253))"
		>
			{#if iscalled}
				<div class=" p-4">
					<h3 class="py-4 text-2xl font-light">
						Stats for <span class="font-semibold">{city}</span>:
					</h3>

					<div class=" flex flex-col justify-start items-start">
						<h1 class="font-normal text-4xl py-2">
							Temperature: <span class="font-bold">{temp}°</span
							>{unit.short}
						</h1>

						<h1 class="font-normal text-4xl py-2">
							Temperature: <span class="font-bold">{temp}°</span
							>{unit.short}
						</h1>
					</div>
				</div>
			{/if}
		</div>
		<div class="resizer" data-direction="horizontal" />
		<div class="container__right">
			<div class="container__top">Top</div>
			<div class="resizer" data-direction="vertical" />
			<div class="container__bottom" />
		</div>
	</div>
</main>

<style>
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: "Inter", sans-serif;
	}

	.resize-contain {
		display: flex;

		/* Misc */
		border: 1px solid #cbd5e0;
	}

	.resizer[data-direction="horizontal"] {
		background-color: #cbd5e0;
		cursor: ew-resize;
		height: 100%;
		width: 4px;
	}
	.resizer[data-direction="vertical"] {
		background-color: #cbd5e0;
		cursor: ns-resize;
		height: 4px;
		width: 100%;
	}
	.container__left {
		/* Initially, the left takes 1/4 width */
		width: 35%;

		/* Misc */
		align-items: center;
		display: flex;
		justify-content: center;
		min-width: fit-content;
	}
	.container__right {
		/* Take the remaining width */
		flex: 1;

		/* Misc */
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.container__top {
		/* Initial height */
		height: 12rem;

		/* Misc */
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.container__bottom {
		/* Take the remaining height */
		flex: 1;

		/* Misc */
		align-items: center;
		display: flex;
		justify-content: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
