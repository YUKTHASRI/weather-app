const apiKey = "82aa65422483ff9a11270e49cc8cdc61"; // Replace with your API key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        throw new Error(data.message || "City not found");
      }

      const temp = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      resultDiv.innerHTML = `
        <p><strong>${data.name}</strong></p>
        <p>Temperature: ${temp.toFixed(1)} °C</p>
        <p>Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        <img src="${iconUrl}" alt="${description}" />
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
