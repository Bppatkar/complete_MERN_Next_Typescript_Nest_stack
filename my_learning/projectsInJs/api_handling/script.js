document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "34600e70ba76b8770541cd735ef15480";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (err) {
      showError();
    }
  });
  cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      getWeatherBtn.click();
    }
  });

  async function fetchWeatherData(city) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    if (!res) throw new Error(`Response status: ${response.status}`);

    const data = await res.json();
    // console.log(data);
    return data;
  }
  function displayWeatherData(data) {
    // console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature :${main.temp}`;
    descriptionDisplay.textContent = `Weather :${weather[0].description}`;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});
