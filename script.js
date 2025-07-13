const apiKey = "YOUR_API_KEY"; 

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");

  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getLocationWeather() {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    },
    () => {
      alert("Unable to retrieve your location.");
    }
  );
}

function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Weather data not found");
      return response.json();
    })
    .then(data => {
      document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").textContent = `🌡 Temperature: ${data.main.temp} °C`;
      document.getElementById("condition").textContent = `☁ Condition: ${data.weather[0].description}`;
      document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").textContent = `🌬 Wind: ${data.wind.speed} m/s`;
      document.getElementById("weatherInfo").classList.remove("hidden");
    })
    .catch(err => {
      alert(err.message);
    });
}
