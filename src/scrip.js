//serch form
let form = document.querySelector("#location-search-bar");

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#unit").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "98c239163a7116dec4092fb1cdd1e807";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "98c239163a7116dec4092fb1cdd1e807";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?
lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
//current loction

function showCurrentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//C to F
function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#unit");
  tempElement.innerHTML = 48;
}
function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#unit");
  tempElement.innerHTML = 9;
}

let fahrenheitValue = document.querySelector("#fahrenheit-value");
fahrenheitValue.addEventListener("click", convertToFahrenheit);

let celsiusValue = document.querySelector("#celsius-value");
celsiusValue.addEventListener("click", convertToCelsius);

form.addEventListener("submit", handleSubmit);

//date
let now = new Date();
let h3 = document.querySelector("h3");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h3.innerHTML = `${day}, ${hour}:${minutes}`;

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", showCurrentTemp);

searchCity("New York");
