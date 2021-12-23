<script>
	import { weatherKey } from "./Keys.svelte";
	import { router } from "page";
	import { timeZoneKey } from "./Keys.svelte";
	import { fade } from "svelte/transition";
	import { each } from "svelte/internal";
	import { onMount } from "svelte";

	let forecasts = [
		{
			index: 1,
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		{
			index: 2,
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		{
			index: 3,
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		{
			index: 4,
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		{
			index: 5,
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		{
			index: 6,
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		{
			index: 7,
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		{
			index: 8,
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
	];

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

	async function getForecast(city) {
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
		status = data.weather[0].description;
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
			status = data.weather[0].description;

			//do something every second

			time.time = unixToTime(data.dt);
		});
	}, 360000);

	getForecast("Dallas").then(function (data) {
		console.log(data);
		let forecast = data.list;

		for (let i = 0; i < forecast.length; i++) {
			forecasts[i].temp = data.list[i].main.temp;
			forecasts[i].wind = data.list[i].wind.speed;
			forecasts[i].humidity = data.list[i].main.humidity;
			forecasts[i].pressure = data.list[i].main.pressure;
			forecasts[i].cloud = data.list[i].clouds.all;
			forecasts[i].rain = data.list[i].rain;
			forecasts[i].visibility = data.list[i].visibility;
			forecasts[i].time = unixToTime(data.list[i].dt);
		}
	});
</script>

<div
	class="resize-container h-screen w-screen max-w-100vw m-0 p-0 gradient-morning flex flex-row relative"
>
	<div
		style="width: 400px;"
		id="resizable"
		class="max-h-screen w-5/12 min-h-full m-0 p-0 flex justify-center items-center fixed"
	>
		{#if iscalled}
			<div
				class="p-5 py-8 bg-white rounded-lg min-w-content w-7/12 h-fit-content max-w-100vw shadow-md"
			>
				<h3 class="text-xl font-semibold">
					Weather for {city}, {country}:
				</h3>
				<p class=" text-gray-600">
					Updated {time.time} ({time.timeZoneCode})
				</p>
				<hr class="my-2 text-gray-400" />
				<h1 class="mt-2 text-4xl font-bold">
					{temp.current}°{unit.short}
				</h1>
				<h3 class=" font-light text-gray-700" title="high / low">
					{temp.min} / {temp.max}
				</h3>
				<p class="p-0 m-0 text-lg capitalize">{status}</p>
			</div>
		{/if}
	</div>

	{#if window.innerWidth > 1000}
		<div class="resize-right max-h-full min-h-full flex flex-col">
			<div class="grid grid-rows-5 grid-rows-4 h-full w-full m-6 gap-2">
				<div class=" bg-white flex justify-center items-center">
					{#each forecasts as forecast}
						<div class=" mx-3">
							<h1>{forecast.temp}</h1><p>{forecast.time}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	* {
		font-family: "JetBrains Mono", monospace;
	}
</style>
