const apiKey = "82aa65422483ff9a11270e49cc8cdc61"; 
let unit = "metric"; // default Celsius

function toggleUnit() {
  unit = document.getElementById("unitToggle").checked ? "imperial" : "metric";
  getWeather();
}

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weatherResult");
  const forecastDiv = document.getElementById("forecastResult");

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    forecastDiv.innerHTML = "";
    return;
  }

  const unitSymbol = unit === "metric" ? "°C" : "°F";

  // Current Weather API
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${unit}`;

  // 3-day Forecast API
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${unit}`;

  // Fetch current weather
  fetch(weatherUrl)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) throw new Error(data.message);

      const { temp, humidity, pressure } = data.main;
      const windSpeed = data.wind.speed;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;

      weatherDiv.innerHTML = `
        <p><strong>${data.name}</strong></p>
        <p>Temperature: ${temp} ${unitSymbol}</p>
        <p>Condition: ${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        <p>Humidity: ${humidity}% | Wind: ${windSpeed} ${unit === "metric" ? "m/s" : "mph"} | Pressure: ${pressure} hPa</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
      `;
    })
    .catch(err => {
      weatherDiv.innerHTML = `<p>Error: ${err.message}</p>`;
      forecastDiv.innerHTML = "";
    });

  // Fetch 3-day forecast
  fetch(forecastUrl)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== "200") throw new Error(data.message);

      const dailyForecasts = {};

      data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyForecasts[date]) {
          dailyForecasts[date] = item;
        }
      });

      const forecastHTML = Object.entries(dailyForecasts)
        .slice(1, 4)
        .map(([date, info]) => {
          const temp = info.main.temp;
          const icon = info.weather[0].icon;
          const desc = info.weather[0].description;
          return `
            <div class="forecast-day">
              <strong>${date}</strong>
              <p>${temp} ${unitSymbol} - ${desc}</p>
              <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" />
            </div>
          `;
        }).join("");

      forecastDiv.innerHTML = `<h3>3-Day Forecast</h3>${forecastHTML}`;
    })
    .catch(err => {
      forecastDiv.innerHTML = `<p>Error loading forecast: ${err.message}</p>`;
    });
}
