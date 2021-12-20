<script>
	import { weatherKey } from "./Keys.svelte";
	import { timeZoneKey } from "./Keys.svelte";
	import { fade } from "svelte/transition";

	var aLcUsamk6 = false;

	window.onresize = function () {
		if (!aLcUsamk6) {
			console.log("This site was built with Svelte and Tailwind CSS");
			aLcUsamk6 = true;
		}
	};

	let iscalled;

	function unixToTime(unix) {
		var date = new Date(unix * 1000);
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();
		var formattedTime =
			hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

		formattedTime = moment(formattedTime, "HH:mm:ss").format("h:mm A");

		return formattedTime;
	}

	console.log(unixToTime(1639893600));

	async function getForecast() {
		var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit.full}&appid=${weatherKey}`;

		let response = await fetch(url);
		let data = await response.json();
		return data;
	}

	async function getWeather(city, unit, key) {
		var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${key}`;

		iscalled = true;
		let response = await fetch(url);
		let data = await response.json();
		return data;
	}

	let city = "City";
	let country = "";
	let unit = {
		full: "imperial",
		short: "F",
	};
	let temp = {
		current: "",
		min: "",
		max: "",
	};
	let time = {
		time: "",
		timeZoneCode: new Date()
			.toLocaleDateString(undefined, {
				day: "2-digit",
				timeZoneName: "short",
			})
			.substring(4),
	};
	let status = "";

	getWeather("Dallas", unit.full, weatherKey).then(function (data) {
		console.log(data);
		city = data.name;
		temp.current = data.main.temp;
		temp.min = data.main.temp_min;
		temp.max = data.main.temp_max;
		status = data.weather[0].main;
		country = data.sys.country;


		//do something every second

		time.time = unixToTime(data.dt);
	});

	window.setInterval(() => {
		getWeather("Dallas", unit.full, weatherKey).then(function (data) {
			console.log(data);
			city = data.name;
			temp.current = data.main.temp;
			country = data.sys.country;
			status = data.weather[0].main;

			//do something every second

			time.time = unixToTime(data.dt);
		});
	}, 360000);
</script>

<div class="resize-container h-screen w-screen m-0 p-0 gradient-morning">
	<div
		style="width: 400px;"
		id="resizable"
		class="max-h-full w-5/12 min-h-full m-0 p-0 flex justify-center items-center"
	>
		{#if iscalled}
		
			<div class="p-5 py-8 bg-white rounded-lg min-w-content w-7/12 h-fit-content shadow-md">
				<h3 class="text-xl font-semibold">Weather for {city}, {country}:</h3>
				<p class=" text-gray-600">Last updated {time.time} ({time.timeZoneCode})</p>
				<hr class="my-2 text-gray-400">
				<h1 class="mt-2 text-3xl font-bold">{temp.current}°{unit.short}</h1>
				<h3 class=" font-light text-gray-700" title="high / low">{temp.min} / {temp.max}</h3>
				<p class="p-0 m-0 text-lg">{status}</p>
			</div>

		{/if}
	</div>
</div>

<style>
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: "Inter", sans-serif;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
