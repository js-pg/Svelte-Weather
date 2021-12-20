<script>
	import { weatherKey } from "./Keys.svelte";
	import { timeZoneKey } from "./Keys.svelte";
	import { fade } from "svelte/transition";

	let forecasts = {
		fc1: {
			time: "hy",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc2: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc3: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc4: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc5: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc6: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc7: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc8: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc9: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc10: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc11: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc12: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc13: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc14: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc15: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc16: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc17: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc18: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc19: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc20: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc21: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc22: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc23: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
		fc24: {
			time: "",
			temp: "",
			wind: "",
			humidity: "",
			pressure: "",
			cloud: "",
			rain: "",
			visibility: "",
		},
	};

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
			if (i == 0) {
				forecasts.fc1.time = unixToTime(forecast[i].dt);
				forecasts.fc1.temp = forecast[i].main.temp;
				forecasts.fc1.wind = forecast[i].wind.speed;
				forecasts.fc1.humidity = forecast[i].main.humidity;
				forecasts.fc1.pressure = forecast[i].main.pressure;
				forecasts.fc1.cloud = forecast[i].clouds.all;
				forecasts.fc1.rain = forecast[i].rain;
				forecasts.fc1.visibility = forecast[i].visibility;
			} else if (i == 1) {
				forecasts.fc2.time = unixToTime(forecast[i].dt);
				forecasts.fc2.temp = forecast[i].main.temp;
				forecasts.fc2.wind = forecast[i].wind.speed;
				forecasts.fc2.humidity = forecast[i].main.humidity;
				forecasts.fc2.pressure = forecast[i].main.pressure;
				forecasts.fc2.cloud = forecast[i].clouds.all;
				forecasts.fc2.rain = forecast[i].rain;
				forecasts.fc2.visibility = forecast[i].visibility;
			} else if (i == 2) {
				forecasts.fc3.time = unixToTime(forecast[i].dt);
				forecasts.fc3.temp = forecast[i].main.temp;
				forecasts.fc3.wind = forecast[i].wind.speed;
				forecasts.fc3.humidity = forecast[i].main.humidity;
				forecasts.fc3.pressure = forecast[i].main.pressure;
				forecasts.fc3.cloud = forecast[i].clouds.all;
				forecasts.fc3.rain = forecast[i].rain;
				forecasts.fc3.visibility = forecast[i].visibility;
			} else if (i == 3) {
				forecasts.fc4.time = unixToTime(forecast[i].dt);
				forecasts.fc4.temp = forecast[i].main.temp;
				forecasts.fc4.wind = forecast[i].wind.speed;
				forecasts.fc4.humidity = forecast[i].main.humidity;
				forecasts.fc4.pressure = forecast[i].main.pressure;
				forecasts.fc4.cloud = forecast[i].clouds.all;
				forecasts.fc4.rain = forecast[i].rain;
				forecasts.fc4.visibility = forecast[i].visibility;
			} else if (i == 4) {
				forecasts.fc5.time = unixToTime(forecast[i].dt);
				forecasts.fc5.temp = forecast[i].main.temp;
				forecasts.fc5.wind = forecast[i].wind.speed;
				forecasts.fc5.humidity = forecast[i].main.humidity;
				forecasts.fc5.pressure = forecast[i].main.pressure;
				forecasts.fc5.cloud = forecast[i].clouds.all;
				forecasts.fc5.rain = forecast[i].rain;
				forecasts.fc5.visibility = forecast[i].visibility;
			} else if (i == 5) {
				forecasts.fc6.time = unixToTime(forecast[i].dt);
				forecasts.fc6.temp = forecast[i].main.temp;
				forecasts.fc6.wind = forecast[i].wind.speed;
				forecasts.fc6.humidity = forecast[i].main.humidity;
				forecasts.fc6.pressure = forecast[i].main.pressure;
				forecasts.fc6.cloud = forecast[i].clouds.all;
				forecasts.fc6.rain = forecast[i].rain;
				forecasts.fc6.visibility = forecast[i].visibility;
			} else if (i == 6) {
				forecasts.fc7.time = unixToTime(forecast[i].dt);
				forecasts.fc7.temp = forecast[i].main.temp;
				forecasts.fc7.wind = forecast[i].wind.speed;
				forecasts.fc7.humidity = forecast[i].main.humidity;
				forecasts.fc7.pressure = forecast[i].main.pressure;
				forecasts.fc7.cloud = forecast[i].clouds.all;
				forecasts.fc7.rain = forecast[i].rain;
				forecasts.fc7.visibility = forecast[i].visibility;
			} else if (i == 7) {
				forecasts.fc8.time = unixToTime(forecast[i].dt);
				forecasts.fc8.temp = forecast[i].main.temp;
				forecasts.fc8.wind = forecast[i].wind.speed;
				forecasts.fc8.humidity = forecast[i].main.humidity;
				forecasts.fc8.pressure = forecast[i].main.pressure;
				forecasts.fc8.cloud = forecast[i].clouds.all;
				forecasts.fc8.rain = forecast[i].rain;
				forecasts.fc8.visibility = forecast[i].visibility;
			} else if (i == 8) {
				forecasts.fc9.time = unixToTime(forecast[i].dt);
				forecasts.fc9.temp = forecast[i].main.temp;
				forecasts.fc9.wind = forecast[i].wind.speed;
				forecasts.fc9.humidity = forecast[i].main.humidity;
				forecasts.fc9.pressure = forecast[i].main.pressure;
				forecasts.fc9.cloud = forecast[i].clouds.all;
				forecasts.fc9.rain = forecast[i].rain;
				forecasts.fc9.visibility = forecast[i].visibility;
			} else if (i == 9) {
				forecasts.fc10.time = unixToTime(forecast[i].dt);
				forecasts.fc10.temp = forecast[i].main.temp;
				forecasts.fc10.wind = forecast[i].wind.speed;
				forecasts.fc10.humidity = forecast[i].main.humidity;
				forecasts.fc10.pressure = forecast[i].main.pressure;
				forecasts.fc10.cloud = forecast[i].clouds.all;
				forecasts.fc10.rain = forecast[i].rain;
				forecasts.fc10.visibility = forecast[i].visibility;
			} else if (i == 10) {
				forecasts.fc11.time = unixToTime(forecast[i].dt);
				forecasts.fc11.temp = forecast[i].main.temp;
				forecasts.fc11.wind = forecast[i].wind.speed;
				forecasts.fc11.humidity = forecast[i].main.humidity;
				forecasts.fc11.pressure = forecast[i].main.pressure;
				forecasts.fc11.cloud = forecast[i].clouds.all;
				forecasts.fc11.rain = forecast[i].rain;
				forecasts.fc11.visibility = forecast[i].visibility;
			} else if (i == 11) {
				forecasts.fc12.time = unixToTime(forecast[i].dt);
				forecasts.fc12.temp = forecast[i].main.temp;
				forecasts.fc12.wind = forecast[i].wind.speed;
				forecasts.fc12.humidity = forecast[i].main.humidity;
				forecasts.fc12.pressure = forecast[i].main.pressure;
				forecasts.fc12.cloud = forecast[i].clouds.all;
				forecasts.fc12.rain = forecast[i].rain;
				forecasts.fc12.visibility = forecast[i].visibility;
			} else if (i == 12) {
				forecasts.fc13.time = unixToTime(forecast[i].dt);
				forecasts.fc13.temp = forecast[i].main.temp;
				forecasts.fc13.wind = forecast[i].wind.speed;
				forecasts.fc13.humidity = forecast[i].main.humidity;
				forecasts.fc13.pressure = forecast[i].main.pressure;
				forecasts.fc13.cloud = forecast[i].clouds.all;
				forecasts.fc13.rain = forecast[i].rain;
				forecasts.fc13.visibility = forecast[i].visibility;
			} else if (i == 13) {
				forecasts.fc14.time = unixToTime(forecast[i].dt);
				forecasts.fc14.temp = forecast[i].main.temp;
				forecasts.fc14.wind = forecast[i].wind.speed;
				forecasts.fc14.humidity = forecast[i].main.humidity;
				forecasts.fc14.pressure = forecast[i].main.pressure;
				forecasts.fc14.cloud = forecast[i].clouds.all;
				forecasts.fc14.rain = forecast[i].rain;
				forecasts.fc14.visibility = forecast[i].visibility;
			} else if (i == 14) {
				forecasts.fc15.time = unixToTime(forecast[i].dt);
				forecasts.fc15.temp = forecast[i].main.temp;
				forecasts.fc15.wind = forecast[i].wind.speed;
				forecasts.fc15.humidity = forecast[i].main.humidity;
				forecasts.fc15.pressure = forecast[i].main.pressure;
				forecasts.fc15.cloud = forecast[i].clouds.all;
				forecasts.fc15.rain = forecast[i].rain;
				forecasts.fc15.visibility = forecast[i].visibility;
			} else if (i == 15) {
				forecasts.fc16.time = unixToTime(forecast[i].dt);
				forecasts.fc16.temp = forecast[i].main.temp;
				forecasts.fc16.wind = forecast[i].wind.speed;
				forecasts.fc16.humidity = forecast[i].main.humidity;
				forecasts.fc16.pressure = forecast[i].main.pressure;
				forecasts.fc16.cloud = forecast[i].clouds.all;
				forecasts.fc16.rain = forecast[i].rain;
				forecasts.fc16.visibility = forecast[i].visibility;
			} else if (i == 16) {
				forecasts.fc17.time = unixToTime(forecast[i].dt);
				forecasts.fc17.temp = forecast[i].main.temp;
				forecasts.fc17.wind = forecast[i].wind.speed;
				forecasts.fc17.humidity = forecast[i].main.humidity;
				forecasts.fc17.pressure = forecast[i].main.pressure;
				forecasts.fc17.cloud = forecast[i].clouds.all;
				forecasts.fc17.rain = forecast[i].rain;
				forecasts.fc17.visibility = forecast[i].visibility;
			} else if (i == 17) {
				forecasts.fc18.time = unixToTime(forecast[i].dt);
				forecasts.fc18.temp = forecast[i].main.temp;
				forecasts.fc18.wind = forecast[i].wind.speed;
				forecasts.fc18.humidity = forecast[i].main.humidity;
				forecasts.fc18.pressure = forecast[i].main.pressure;
				forecasts.fc18.cloud = forecast[i].clouds.all;
				forecasts.fc18.rain = forecast[i].rain;
				forecasts.fc18.visibility = forecast[i].visibility;
			} else if (i == 18) {
				forecasts.fc19.time = unixToTime(forecast[i].dt);
				forecasts.fc19.temp = forecast[i].main.temp;
				forecasts.fc19.wind = forecast[i].wind.speed;
				forecasts.fc19.humidity = forecast[i].main.humidity;
				forecasts.fc19.pressure = forecast[i].main.pressure;
				forecasts.fc19.cloud = forecast[i].clouds.all;
				forecasts.fc19.rain = forecast[i].rain;
				forecasts.fc19.visibility = forecast[i].visibility;
			} else if (i == 19) {
				forecasts.fc20.time = unixToTime(forecast[i].dt);
				forecasts.fc20.temp = forecast[i].main.temp;
				forecasts.fc20.wind = forecast[i].wind.speed;
				forecasts.fc20.humidity = forecast[i].main.humidity;
				forecasts.fc20.pressure = forecast[i].main.pressure;
				forecasts.fc20.cloud = forecast[i].clouds.all;
				forecasts.fc20.rain = forecast[i].rain;
				forecasts.fc20.visibility = forecast[i].visibility;
			} else if (i == 20) {
				forecasts.fc21.time = unixToTime(forecast[i].dt);
				forecasts.fc21.temp = forecast[i].main.temp;
				forecasts.fc21.wind = forecast[i].wind.speed;
				forecasts.fc21.humidity = forecast[i].main.humidity;
				forecasts.fc21.pressure = forecast[i].main.pressure;
				forecasts.fc21.cloud = forecast[i].clouds.all;
				forecasts.fc21.rain = forecast[i].rain;
				forecasts.fc21.visibility = forecast[i].visibility;
			} else if (i == 21) {
				forecasts.fc22.time = unixToTime(forecast[i].dt);
				forecasts.fc22.temp = forecast[i].main.temp;
				forecasts.fc22.wind = forecast[i].wind.speed;
				forecasts.fc22.humidity = forecast[i].main.humidity;
				forecasts.fc22.pressure = forecast[i].main.pressure;
				forecasts.fc22.cloud = forecast[i].clouds.all;
				forecasts.fc22.rain = forecast[i].rain;
				forecasts.fc22.visibility = forecast[i].visibility;
			} else if (i == 22) {
				forecasts.fc23.time = unixToTime(forecast[i].dt);
				forecasts.fc23.temp = forecast[i].main.temp;
				forecasts.fc23.wind = forecast[i].wind.speed;
				forecasts.fc23.humidity = forecast[i].main.humidity;
				forecasts.fc23.pressure = forecast[i].main.pressure;
				forecasts.fc23.cloud = forecast[i].clouds.all;
				forecasts.fc23.rain = forecast[i].rain;
				forecasts.fc23.visibility = forecast[i].visibility;
			} else if (i == 23) {
				forecasts.fc24.time = unixToTime(forecast[i].dt);
				forecasts.fc24.temp = forecast[i].main.temp;
				forecasts.fc24.wind = forecast[i].wind.speed;
				forecasts.fc24.humidity = forecast[i].main.humidity;
				forecasts.fc24.pressure = forecast[i].main.pressure;
				forecasts.fc24.cloud = forecast[i].clouds.all;
				forecasts.fc24.rain = forecast[i].rain;
				forecasts.fc24.visibility = forecast[i].visibility;
			}
		}
		console.log(forecasts);
	});
</script>

<div
	class="resize-container h-screen w-screen max-w-100vh m-0 p-0 gradient-morning flex flex-row"
>
	<div
		style="width: 400px;"
		id="resizable"
		class="max-h-full w-5/12 min-h-full m-0 p-0 flex justify-center items-center"
	>
		{#if iscalled}
			<div
				class="p-5 py-8 bg-white rounded-lg min-w-content w-7/12 h-fit-content shadow-md"
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
	<div class="resize-right max-h-full min-h-full m-0 p-5">
		<div
			class="forecast-card rounded-md bg-white hover:bg-gray-200 transition-colors shadow-md"
		/>
		<div
			class="forecast-card rounded-md bg-white hover:bg-gray-200 transition-colors shadow-md"
		/>
		<div
			class="forecast-card rounded-md bg-white hover:bg-gray-200 transition-colors shadow-md"
		/>
		<div
			class="forecast-card rounded-md bg-white hover:bg-gray-200 transition-colors shadow-md"
		/>
		<div
			class="forecast-card rounded-md bg-white hover:bg-gray-200 transition-colors shadow-md"
		/>
		<div
			class="forecast-card rounded-md bg-white hover:bg-gray-200 transition-colors shadow-md"
		/>
		<div
			class="forecast-card rounded-md bg-white hover:bg-gray-200 transition-colors shadow-md"
		/>
		<div
			class="forecast-card rounded-md bg-white hover:bg-gray-200 transition-colors shadow-md"
		/>
		<div
			class="forecast-card rounded-md bg-white hover:bg-gray-200 transition-colors shadow-md"
		/>
	</div>
</div>

<style>
	* {
		font-family: "JetBrains Mono", monospace;
	}
</style>
