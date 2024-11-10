// script.js
document.getElementById("weatherForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = document.getElementById("cityInput").value;
  const weatherInfoDiv = document.getElementById("weatherInfo");
  const errorMessage = document.getElementById("errorMessage");

  // Clear previous results
  weatherInfoDiv.innerHTML = "";
  errorMessage.textContent = "";

  try {
    // Mock function to get coordinates for simplicity (replace with geocoding API if needed)
    const coordinates = await getCoordinates(city);
    const { latitude, longitude } = coordinates;

    // Fetch weather data
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    const weather = data.current_weather;

    // Display weather info
    weatherInfoDiv.innerHTML = `
      <p>Temperature: ${weather.temperature}°C</p>
      <p>Wind Speed: ${weather.windspeed} km/h</p>
      <p>Weather Code: ${weather.weathercode}</p>
    `;
  } catch (error) {
    errorMessage.textContent = "Could not retrieve weather data. Please try again.";
    console.error(error);
  }
});

// Mock function to get coordinates (latitude and longitude)
async function getCoordinates(city) {
  // Sample coordinates for demonstration (can be replaced by a geocoding API)
  const cityCoordinates = {
    "New York": { latitude: 40.7128, longitude: -74.006 },
    London: { latitude: 51.5074, longitude: -0.1278 },
    Sydney: { latitude: -33.8688, longitude: 151.2093 },
  };

  return cityCoordinates[city] || { latitude: 0, longitude: 0 }; // Default coordinates if city not found
}
