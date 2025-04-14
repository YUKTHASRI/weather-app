#  Responsive Weather App

This is a simple and responsive weather app built using **HTML**, **CSS**, and **JavaScript**. It allows users to enter a city name and get the current weather data, including temperature, weather condition, and an icon.

## Features

- User input for city name
- Weather data fetched from **OpenWeatherMap API**
- Displays temperature (in Celsius), weather condition, and weather icon
- Error handling for invalid cities or API issues
- Fully responsive design for mobile, tablet, and desktop

##  Technologies Used

- HTML5
- CSS3 (with media queries for responsiveness)
- JavaScript (ES6+)
- [OpenWeatherMap API](https://openweathermap.org/)

## How to Run the App

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app

2. Get a free API key from OpenWeatherMap
   Visit: https://openweathermap.org/appid
   Sign up and generate a free API key

3.Open script.js and replace YOUR_API_KEY_HERE with your actual API key
  const apiKey = "YOUR_API_KEY_HERE";

4.Run the app
  Open the index.html file in any web browser
  Enter a city name and click Submit to get weather data.

5.Troubleshooting
  Make sure you have a valid internet connection.
  Ensure the API key is correct and hasn’t expired.
  Some browsers may block API requests due to CORS. Use Live Server extension in VS Code for local testing.
