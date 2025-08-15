// The Old Way: Using useEffect and useState for Data Fetching

/* import React, { useState, useEffect } from 'react';

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.weather.com/today');
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (isLoading) return <p>Loading weather data...</p>;
  if (hasError) return <p>Error fetching weather data</p>;

  return (
    <div>
      <h1>Today's Weather</h1>
      <p>Temperature: {weather.temperature}°C</p>
    </div>
  );
};

export default WeatherComponent; */

//? The use() Hook: Simplifying Data Fetching

import React, { use } from 'react';

// Async function to fetch weather data
const fetchWeather = async () => {
  const response = await fetch('https://api.weather.com/today');
  if (!response.ok) {
    throw new Error('Failed to fetch weather');
  }
  return response.json();
};

const WeatherComponent = () => {
  const weather = use(fetchWeather());

  return (
    <div>
      <h1>Today's Weather</h1>
      <p>Temperature: {weather.temperature}°C</p>
    </div>
  );
};

export default WeatherComponent;
